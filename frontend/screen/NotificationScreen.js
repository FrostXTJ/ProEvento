import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert, ScrollView, Image} from "react-native";

import { Card, Button, Avatar, ListItem } from "react-native-elements";
import {
  registerEvent,
  unregisterEvent,
  getUserRegisteredEvents,
} from "../api/ProEventoAPI";

const NotificationCard = props => {
  const { content, senderName, eventName, userId, event } = props;
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    getUserRegisteredEvents(userId, events => {
      setRegisteredEvents(events);
    });
  }, []);

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
        Alert.alert("You have registered this event!");
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
        Alert.alert("You have unregistered this event!");
      }
    );
  };

  return (
    <Card containerStyle={{ width: 350, borderRadius: 20 }}>
      <Card.Title>{eventName}</Card.Title>
      <Text style={{ fontWeight: "bold" }}>From {senderName}</Text>
      <Card.Divider />
      <Text style={{ marginBottom: 10 }}>{content}</Text>
      {checkEventInList(event, registeredEvents) ? (
        <Button
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="UNREGISTER"
          onPress={() => {
            onUnregisterEvent(userId, event.id);
          }}
        />
      ) : (
        <Button
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="REGISTER"
          onPress={() => {
            onRegisterEvent(userId, event.id);
          }}
        />
      )}
    </Card>
  );
};

const NotificationScreen = ({ navigation, route }) => {
  const myUser = route.params.myAccount.user;
  const [notificationCards, setNotificationCards] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    fetch(
      "http://3.15.22.198:8080/api/invitation/invitations_by_receiver?" +
        new URLSearchParams({
          userId: myUser.id,
        })
    )
      .then(response => response.json())
      .then(invitationList => {
        let arr = [];
        invitationList.forEach(i => {
          const card = (
            <NotificationCard
              key={i.id}
              content={i.content}
              senderName={i.sender.username}
              eventName={i.event.name}
              userId={myUser.id}
              event={i.event}
            />
          );
          arr.push(card);
        });
        setNotificationCards(arr);
      })
      .catch(error => {
        console.log(error);
      });
  }, [refresh]);


    const users = [
        {
            name: 'Tommy Trojan',
            avatar: 'https://d3jycsk0m72ya7.cloudfront.net/images/2018/2/8/usc_day_in_troy_mcgillen_012917_3907.jpg',
            message: 'Lets be friends!',
        },
    ]
  return (
      <ScrollView>
          <View style={styles.container}>
              <Button style={styles.refreshButton}
                  title="Refresh"
                  onPress={() => {
                      setRefresh(!refresh);
                  }}
              />
              {/*Temp format for follow request and group request*/}
              <Card containerStyle={{ width: 350, borderRadius: 20}}>
                  <Card.Title>Group Name</Card.Title>
                  <Text style={{ fontWeight: "bold" }}>{"From senderName"}</Text>
                  <Card.Divider />
                  <Text style={{ marginBottom: 10 }}>{"Some request messages go in here"}</Text>
                  <View style={styles.buttonContainer}>
                      <Button
                          buttonStyle={{
                              width: "80%",
                              marginTop: "10%",
                          }}
                          title="Approve"
                          // onPress={() => {
                          //     Approve the request
                          // }}
                      />
                      <Button
                          buttonStyle={{
                              width: "80%",
                              marginTop: "10%",
                              marginLeft: "auto"
                          }}
                          title="Decline"
                          // onPress={() => {
                          //     Decline the request
                          // }}
                      />
                  </View>
              </Card>
              <Card containerStyle={{ width: 350, borderRadius: 20}}>
                  <View>
                      {
                          users.map((u, i) => {
                              return (
                                  <View key={i} style={styles.followContainer}>
                                      <Avatar
                                          size={"medium"}
                                          rounded
                                          source={{
                                              uri:
                                              u.avatar,
                                          }}
                                          onPress={() => {
                                              alert("Direct to the profile!")
                                          }}
                                      />
                                      <ListItem.Content style={{ marginLeft: '3%'}}>
                                          <ListItem.Title style={{ fontWeight: 'bold' }}>{u.name}</ListItem.Title>
                                          <ListItem.Subtitle>{u.message}</ListItem.Subtitle>
                                      </ListItem.Content>
                                      <View style={styles.buttonContainer}>
                                          <Button
                                              buttonStyle={{
                                                  width: "85%",
                                                  marginLeft: "10%",
                                              }}
                                              title="Follow"
                                              onPress={() => {
                                                  alert("Will follow this person")
                                              }}
                                          />
                                      </View>
                                  </View>
                              );
                          })
                      }
                  </View>
              </Card>
              {notificationCards}
          </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    refreshButton: {
        marginTop: "10%"
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    followContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default NotificationScreen;
