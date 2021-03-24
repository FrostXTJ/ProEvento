import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, Icon, Divider, Button, Card } from "react-native-elements";
import EventCard from "../components/EventCard";
import EventOverlay from "../components/EventOverlay";
import {
  getUserHostEvents,
  getUserRegisteredEvents,
  getFollowing,
  follow,
  unfollow,
} from "../api/ProEventoAPI";

const ProfileScreen = ({ navigation, route }) => {
  const { myAccount, profileUser } = route.params;
  const [refresh, setRefresh] = useState(false);
  const [hostEvents, setHostEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [followed, setFollowed] = useState(false);
  const [eventOverlayVisible, setEventOverlayVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Get profileUser's host events.
  useEffect(() => {
    getUserHostEvents(profileUser.id, eventList => {
      setHostEvents(eventList);
    });
  }, [profileUser, refresh]);

  // Get profileUser's registered events.
  useEffect(() => {
    getUserRegisteredEvents(profileUser.id, eventList => {
      setRegisteredEvents(eventList);
    });
  });

  // Check if current user follows the profile user.
  useEffect(() => {
    getFollowing(myAccount.user.id, following => {
      const followedProfileUser = false;
      following.forEach(user => {
        if (user.id === profileUser.id) {
          followedProfileUser = true;
        }
      });
      setFollowed(followedProfileUser);
    });
  }, [profileUser, refresh]);

  const toggleEventOverlay = event => {
    if (eventOverlayVisible) {
      setSelectedEvent(null);
    } else {
      setSelectedEvent(event);
    }
    setEventOverlayVisible(!eventOverlayVisible);
  };

  const hostEventCards = hostEvents.map(event => (
    <EventCard
      key={event.id}
      event={event}
      navigation={navigation}
      toggleOverlay={toggleEventOverlay}
    />
  ));

  const registeredEventCards = registeredEvents.map(event => (
    <EventCard
      key={event.id}
      event={event}
      navigation={navigation}
      toggleOverlay={toggleEventOverlay}
    />
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
      <Button
        title="Unfollow"
        onPress={() => {
          unfollow(
            {
              followerId: myAccount.user.id,
              followeeId: profileUser.id,
            },
            response => {
              if (response === "success") {
                setFollowed(false);
              }
            }
          );
        }}
      />
    ) : (
      <Button
        title="Follow"
        onPress={() => {
          follow(
            {
              followerId: myAccount.user.id,
              followeeId: profileUser.id,
            },
            response => {
              if (response === "success") {
                setFollowed(true);
              }
            }
          );
        }}
      />
    );

  return (
    <View>
      <Divider height={80} backgroundColor="white" />
      {goBackToMyProfileButton}
      <ScrollView>
        <View style={styles.userInfo}>
          <Button
            title="Refresh"
            type="clear"
            onPress={() => setRefresh(!refresh)}
          />
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
        <Divider height={40} />
      </ScrollView>
      <EventOverlay
        event={selectedEvent}
        currentUser={myAccount.user}
        isVisible={eventOverlayVisible}
        toggleOverlay={toggleEventOverlay}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  events: {
    paddingStart: "5%",
    paddingEnd: "5%",
  },
});

export default ProfileScreen;
