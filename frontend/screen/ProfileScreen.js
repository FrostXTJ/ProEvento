import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, Icon, Divider, Button, Card } from "react-native-elements";
import EventCard from "../components/EventCard";
import {
  getUserHostEvents,
  getUserRegisteredEvents,
  getFollowing,
} from "../api/ProEventoAPI";

const ProfileScreen = ({ navigation, route }) => {
  const { myAccount, profileUser } = route.params;
  const [hostEvents, setHostEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    getUserHostEvents(profileUser.id, eventList => {
      setHostEvents(eventList);
    });
  }, [profileUser]);

  useEffect(() => {
    getUserRegisteredEvents(profileUser.id, eventList => {
      setRegisteredEvents(eventList);
    });
  }, [profileUser]);

  useEffect(() => {
    getFollowing(myAccount.user.id, following => {
      following.forEach(user => {
        if (user.id === profileUser.id) {
          setFollowed(true);
        }
      });
    });
  }, [myAccount.user]);

  const hostEventCards = hostEvents.map(event => (
    <EventCard key={event.id} event={event} />
  ));

  const registeredEventCards = registeredEvents.map(event => (
    <EventCard key={event.id} event={event} />
  ));

  const goBackToMyProfileButton =
    myAccount.user.id === profileUser.id ? null : (
      <Button
        title="Go Back to My Profile"
        onPress={() => {
          navigation.setParams({
            profileUser: myAccount.user,
          });
        }}
      />
    );

  const profileButton =
    myAccount.user.id == profileUser.id ? (
      <Button title="Setting" />
    ) : followed ? (
      <Button title="Unfollow" />
    ) : (
      <Button title="Follow" />
    );

  console.log(profileUser.username);

  return (
    <View style={styles.container}>
      <Divider height={80} backgroundColor="white" />
      {goBackToMyProfileButton}
      <ScrollView>
        <View style={styles.container}>
          <Icon name="user" type="font-awesome" size="75" />
          {profileButton}
          <Text h1>{profileUser.username}</Text>
          <Text>{profileUser.biography}</Text>
        </View>

        <Divider height={40} backgroundColor="white" />
        <View style={styles.events}>
          <Text h3>Host Events</Text>
          <View>{hostEventCards}</View>
          <Text h3>Registered Events</Text>
          <View>{registeredEventCards}</View>
        </View>
      </ScrollView>
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
  events: {
    flex: 0,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});

export default ProfileScreen;
