import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";

import { Card, Button } from 'react-native-elements';
import {registerEvent, unregisterEvent, getUserRegisteredEvents} from "../api/ProEventoAPI";

const NotificationCard = props => {
  const { content, senderName, eventName, userId, event} = props;
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    getUserRegisteredEvents(userId, events => {
      setRegisteredEvents(events);
    });
  });


  const checkEventInList = (event, list) => {
    let result = false;
    list.forEach(item => {
      if (item.id === event.id) {
        result = true;
      }
    });
    return result;
  };

  const onRegisterEvent = (userId, eventId) => {
    registerEvent(
      {
        userId: userId,
        eventId: eventId,
      },
      () => {
        Alert.alert('You have registered this event!');
      }
    );
  };

  const onUnregisterEvent = (userId, eventId) => {
    unregisterEvent(
      {
        userId: userId,
        eventId: eventId,
      },
      () => {
        Alert.alert('You have unregistered this event!');
      }
    );
  };


  return (
      <Card containerStyle={{width: 350}}>
        <Card.Title>{eventName}</Card.Title>
        <Text style={{fontWeight: "bold"}}>From {senderName}</Text>
        <Card.Divider/>
        <Text style={{marginBottom: 10}}>
          {content}
        </Text>
        {checkEventInList(event, registeredEvents)?
        <Button
        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        title='UNREGISTER'
        onPress={() => 
          {
            onUnregisterEvent(userId, event.id);
          }
        }
    />
        :
        <Button
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='REGISTER'
            onPress={() => 
              {
                onRegisterEvent(userId, event.id);
              }
            }
        />
        }
        
      </Card>
  );
}

const NotificationScreen = ({navigation, route}) => {
  const myUser = route.params.myAccount.user;
  const [ notificationCards, setNotificationCards ] = useState([]);
  useEffect(() => {
    fetch('http://3.15.22.198:8080/api/invitation/invitations_by_receiver?' +
        new URLSearchParams({
          userId: myUser.id,
        }))
        .then((response) => response.json())
        .then(invitationList => {
          let arr = [];
          invitationList.forEach(i => {
            const card = <NotificationCard
                key={i.id}
                content={i.content}
                senderName={i.sender.username}
                eventName={i.event.name}
                userId = {myUser.id}
                event = {i.event}
              />
            arr.push(card);
          });
          setNotificationCards(arr);
        })
        .catch(error => {
          console.log(error);
        });
  }, []);

  return (
          <View style={styles.container}>
            {notificationCards}
          </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NotificationScreen;
