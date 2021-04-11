import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, Icon, Divider, Button } from "react-native-elements";
import EventCard from "../components/EventCard";
import UserCard from "../components/UserCard";
import EventOverlay from "../components/EventOverlay";
import {
  getUserHostEvents,
  getUserRegisteredEvents,
  getFollowing,
  getFollowers,
  follow,
  unfollow,
  deactivate, //newly added
} from "../api/ProEventoAPI";


const ProfileScreen = ({ navigation, route }) => {
  const { myAccount, profileUser} = route.params; //probably addd set my account? --yifan zhuang
  const [refresh, setRefresh] = useState(false);
  const [hostEvents, setHostEvents] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [followed, setFollowed] = useState(false);
  const [eventOverlayVisible, setEventOverlayVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [shouldShowHosted, setShouldShowHosted] = useState(true);
  const [shouldShowRegistered, setShouldShowRegistered] = useState(false);
  const [shouldShowFollowing, setShouldShowFollowing] = useState(false);
  const [shouldShowFollower, setShouldShowFollower] = useState(false);

  //Get profileUsers's follower
    useEffect(() => {

        getFollowers(profileUser.id, follower => {
            setFollowers(follower);
        });
    }, [profileUser, refresh]);
  //Get profileUser's following
  useEffect(() => {

    getFollowing(profileUser.id, following => {
      setFollowings(following);
    });
  }, [profileUser, refresh]);

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
  }, [profileUser, refresh]);

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
    const followerCards = followers.map(follow => (
        <UserCard
            key = {follow.id}
            user = {follow}
            navigation={navigation}
        />
    ));
  const followingCards = followings.map(followee => (
      <UserCard
        key = {followee.id}
        user = {followee}
        navigation={navigation}
      />
  ));
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
              buttonStyle = {styles.buttons}
              titleStyle={styles.buttonsBody}
        onPress={() => navigation.navigate("ProfileSetting", {

        })} //newly added
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
      <Button
          title="Deactivate"
          buttonStyle = {styles.buttons}
          titleStyle={styles.buttonsBody}
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

    const hostedEvents = shouldShowHosted ? (
        <View>
            <Text h3>Hosted Events</Text>
            <View>{hostEventCards}</View>
        </View>
    ) : (null);

    const registered = shouldShowRegistered ? (
        <View>
            <Text h3>Registered Events</Text>
            <View>{registeredEventCards}</View>
        </View>
    ) : (null);

    const followL = shouldShowFollowing ? (

        <View>
            <Text h3>Following List</Text>
            <View>{followingCards}</View>
        </View>

    ) : (null);

    const follower = shouldShowFollower ? (
        <View>
            <Text h3>Follower List</Text>
            <View>{followerCards}</View>
        </View>
    ):(null);

    const button1 = (<Button
        buttonStyle = {styles.buttons1}
        titleStyle={styles.buttonsTitle}
        title="Hosted"
        onPress={() => {
            setShouldShowHosted(!shouldShowHosted);
            setShouldShowRegistered(false);
            setShouldShowFollowing(false);
            setShouldShowFollower(false);
        }}
    />);

    const button2 = (<Button
        title="Registered"
        buttonStyle = {styles.buttons1}
        titleStyle={styles.buttonsTitle}
        onPress={() => {
            setShouldShowRegistered(!shouldShowRegistered);
            setShouldShowHosted(false);
            setShouldShowFollowing(false);
            setShouldShowFollower(false);
        }}
    />);

    const button3 = (<Button
        title="Followings"
        buttonStyle = {styles.buttons1}
        titleStyle={styles.buttonsTitle}
        onPress={() => {
            setShouldShowRegistered(false);
            setShouldShowHosted(false);
            setShouldShowFollowing(!shouldShowFollowing);
            setShouldShowFollower(false);
        }}
    />);

    const button4 = (<Button
        title="Followers"
        buttonStyle = {styles.buttons1}
        titleStyle={styles.buttonsTitle}
        onPress={() => {
            setShouldShowRegistered(false);
            setShouldShowHosted(false);
            setShouldShowFollowing(false);
            setShouldShowFollower(!shouldShowFollower);
        }}
    />);




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
          <Text h1>{profileUser.username}</Text>
          <Text>{profileUser.biography}</Text>
          <View style = {styles.buttons1}>
              {button1}{button2}{button3}{button4}
          </View>
            {/* newly added */}
                <View style = {styles.buttons}>
                    {profileButton}
                    {deactivateButton}
                </View>
        </View>

        <Divider height={40} backgroundColor="white" />
        <ScrollView style={styles.events}>
          {hostedEvents}
          {registered}
          {followL}
          {follower}
        </ScrollView>
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
    marginHorizontal: 60,
    marginVertical: 10,


  },
  buttons1: {
    flex:1,
    flexDirection:'row',
    alignItems:'flex-end',
    marginHorizontal: 5,
    backgroundColor: "orange",
    borderRadius : 5,



  },
  buttonsTitle: {
    color: "black",
    fontSize: 14,
    fontWeight : 'bold',
  },
    buttonsBody: {
        color: "white",
        fontSize: 14,
    },

});

export default ProfileScreen;
