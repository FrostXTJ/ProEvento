import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";

import { Card, ListItem, Button, Icon } from 'react-native-elements'

const NotificationCard = props => {
  const { content, senderName, eventName } = props;
  return (
      <Card containerStyle={{width: 350}}>
        <Card.Title>{eventName}</Card.Title>
        <Text style={{fontWeight: "bold"}}>From {senderName}</Text>
        <Card.Divider/>
        <Text style={{marginBottom: 10}}>
          {content}
        </Text>
        <Button
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='REGISTER'
            onPress={() => Alert.alert('You have registered this event!')}
        />
      </Card>
  );
}

const NotificationScreen = (props) => {
  const { myUser } = props;
  const [ notificationCards, setNotificationCards ] = useState([]);

  useEffect(() => {
    fetch('http://3.15.22.198:8080/api/invitation/invitations_by_receiver?' +
        new URLSearchParams({
          userId: 2,
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
              />
            arr.push(card);
          });
          setNotificationCards(arr);
        })
        .catch(error => {
          console.log(error);
        });
  });

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
