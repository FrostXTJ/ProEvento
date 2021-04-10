import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, Icon, Divider, Button } from "react-native-elements";
import EventCard from "../components/EventCard";
import EventOverlay from "../components/EventOverlay";
import {
  getUserHostEvents,
  getUserRegisteredEvents,
  getFollowing,
  follow,
  unfollow,
  deactivate, //newly added
} from "../api/ProEventoAPI";

const ProfileScreen = ({ navigation, route }) => {
  const { myAccount, profileUser} = route.params; //probably addd set my account? --yifan zhuang
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
      let followedProfileUser = false;
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
      <Button title="Setting" 
        onPress={() => navigation.navigate("ProfileSetting")} //newly added
      />
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

    //newly added
    const deactivateButton =
    myAccount.user.id === profileUser.id ? (
      <Button title="Deactivate"
        style = {{marginHorizontal: 10}}
          onPress = {() => {
            deactivate(
              {
                //yuming
                //传入myAccount.user.id
              },
              response => {
                if (response === "success") {
                  //yuming
                  //if deactivate, should return to login page?
                }
              }
            );
          }}
      />
    ) : (
      null
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
          <Icon name="user" type="font-awesome" size={75} />
          {/* newly added */}
            <View style = {styles.buttons}>
              {profileButton}
              {deactivateButton}
            </View>
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
        setEvent={setSelectedEvent}
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

  buttons: {
    flex:1, 
    flexDirection:'row', 
    alignItems:'flex-end',
    marginHorizontal: 10,
  },
});

export default ProfileScreen;
