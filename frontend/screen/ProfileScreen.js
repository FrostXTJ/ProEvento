import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Image,Text, Icon, Divider, Button } from "react-native-elements";
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

  //badge counter
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
        buttonStyle = {styles.buttons}
        titleStyle={styles.buttonsBody}
        onPress={() => {
          navigation.setParams({
            profileUser: myAccount.user,
          });
        }}
      />
    );

  const settingButton =
    myAccount.user.id == profileUser.id ? (
      <Button title="Setting"
              buttonStyle = {styles.buttons}
              titleStyle={styles.buttonsBody}
        onPress={() => navigation.navigate("ProfileSetting", {

        })} //newly added
      />
    ) : (null);

  const followButton = myAccount.user.id != profileUser.id ?

      (followed ? (
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
    )) : (null);

    //newly added
    // const deactivateButton =
    // myAccount.user.id === profileUser.id ? (
    //   <Button
    //       title="Deactivate"
    //       buttonStyle = {styles.buttons}
    //       titleStyle={styles.buttonsBody}
    //       onPress = {() => {
    //         deactivate(
    //           {
    //             //yuming
    //             //传入myAccount.user.id
    //           },
    //           response => {
    //             if (response === "success") {
    //               //yuming
    //               //if deactivate, should return to login page?
    //             }
    //           }
    //         );
    //       }}
    //   />
    // ) : (
    //   null
    // );

    const hostedEvents = shouldShowHosted ? (
        <View >
            <View style = {styles.title}>
                <Text h3>Hosted Events</Text>
                <Icon  name="archive" type="font-awesome" size={30} />
            </View>
            {hostEvents.length != 0 ? <View>{hostEventCards}</View> : <Text h6>- No Hosted Events</Text>}
        </View>
    ) : (null);

    const registered = shouldShowRegistered ? (
        <View>
            <View style = {styles.title}>
                <Text h3>Registered Events</Text>
                <Icon  name="archive" type="font-awesome" size={30} />
            </View>
            {registeredEvents.length != 0 ? <View>{registeredEventCards}</View> : <Text h6>- No Registered Events</Text> }
        </View>
    ) : (null);

    const followL = shouldShowFollowing ? (

        <View>
            <View style = {styles.title}>
                <Text h3>Following List</Text>
                <Icon  name="male" type="font-awesome" size={35} />
            </View>
            {followings.length != 0 ? <View>{followingCards}</View> : <Text h6>- No Following List</Text>}
        </View>

    ) : (null);

    const follower = shouldShowFollower ? (
        <View>
            <View style = {styles.title}>
            <Text h3>Follower List</Text>
            <Icon  name="male" type="font-awesome" size={40} />
        </View>
            {followers.length != 0 ? <View>{followerCards}</View> : <Text h6>- No Followers</Text>}
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
      <Divider height={30} backgroundColor="white" />

      <ScrollView>
          <View style = {styles.buttons}>
              {goBackToMyProfileButton}
              <Button
                  buttonStyle = {styles.buttons}
                  titleStyle={styles.buttonsBody}
                  title="Refresh"
                  type="clear"
                  onPress={() => setRefresh(!refresh)}
              />

              {settingButton}



          </View>
        <View style={styles.userInfo}>


            {/*<Image*/}
            {/*    style={styles.avatar}*/}
            {/*    source={require("../assets/user.jpeg")} />*/}
            <Icon  name="android" color="red" type="font-awesome" size={100} />
          <Text h4>{profileUser.username}</Text>
          <Text>{profileUser.biography}</Text>
            {followButton}
          <View style = {styles.buttons1}>
              {button1}{button2}{button3}{button4}
          </View>
            {/* newly added */}
            <View style = {styles.badges}>
                <ScrollView horizontal={true}>
                <View style = {styles.singleBadge}>
                    <Icon style = {styles.badgesBody} name="archive" type="font-awesome" size={20} />
                    <Text>{profileUser.badgeFunCount}</Text>
                </View>
                <View style = {styles.singleBadge}>
                    <Icon style = {styles.badgesBody} name="ban" type="font-awesome" size={20} />
                    <Text>{profileUser.badgeCoolCount}</Text>
                </View>
                <View style = {styles.singleBadge}>
                    <Icon style = {styles.badgesBody} name="bath" type="font-awesome" size={20} />
                    <Text>{profileUser.badgeHelpfulCount}</Text>
                </View>
                <View style = {styles.singleBadge}>
                    <Icon style = {styles.badgesBody} name="bell" type="font-awesome" size={20} />
                    <Text>{profileUser.badgeLovelyCount}</Text>
                </View>
                <View style = {styles.singleBadge}>
                    <Icon style = {styles.badgesBody} name="battery-full" type="font-awesome" size={20} />
                    <Text>{profileUser.badgeCharmingCount}</Text>
                </View>
                <View style = {styles.singleBadge}>
                    <Icon style = {styles.badgesBody} name="apple" type="font-awesome" size={20} />
                    <Text>{profileUser.badgeAwesomeCount}</Text>
                </View>
                <View style = {styles.singleBadge}>
                    <Icon style = {styles.badgesBody} name="bomb" type="font-awesome" size={20} />
                    <Text>{profileUser.badgeEnergeticCount}</Text>
                </View>
                <View style = {styles.singleBadge}>
                    <Icon style = {styles.badgesBody} name="bolt" type="font-awesome" size={20} />
                    <Text>{profileUser.badgeDullCount}</Text>
                </View>
                <View style = {styles.singleBadge}>
                    <Icon style = {styles.badgesBody} name="car" type="font-awesome" size={20} />
                    <Text>{profileUser.badgeRudeCount}</Text>
                </View>
                <View style = {styles.singleBadge}>
                    <Icon style = {styles.badgesBody} name="anchor" type="font-awesome" size={20} />
                    <Text>1</Text>
                </View>
                </ScrollView>
            </View>
        </View>

        <Divider height={40} backgroundColor="white" />
        <ScrollView style={styles.events}>
          {hostedEvents}
          {registered}
          {followL}
          {follower}
        </ScrollView>

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
        padding:20,
  },
  events: {
    paddingStart: "5%",
    paddingEnd: "5%",
  },

  buttons: {
    flex:1,
    flexDirection:'row',
    alignItems:'flex-end',
      justifyContent: 'flex-end',
    backgroundColor: "white",

  },
  buttons1: {
    flex:1,
    flexDirection:'row',
    alignItems:'flex-end',
    marginHorizontal: 1,
      marginTop: 15,
    backgroundColor: "white",
    borderRadius : 5,
  },
  buttonsTitle: {
    color: "black",
    fontSize: 14,

    borderWidth : 1,
    padding : 10,
    borderColor : 'orange',
    borderRadius: 5,

  },
    buttonsBody: {
        color: "black",
        fontSize: 14,
    },
    title : {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent : "space-between",
    },
    avatar:{
        width:180,
        height:180,
        borderRadius: 90,
        alignSelf: 'auto',
    },
    badges :{
        flex:1,
        flexDirection:'row',
        alignItems: 'flex-end',
        paddingLeft : 10,
    },
    badgesBody : {
        margin:20,
        alignSelf : 'center',
    },
    singleBadge : {
        alignItems : 'center',
    },

});

export default ProfileScreen;
