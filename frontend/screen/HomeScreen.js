import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from "react-native";
import EventCard from "../components/EventCard";
import EventOverlay from "../components/EventOverlay";
import UserCard from "../components/UserCard";
import { getAllEvents, searchUsersByUsername } from "../api/ProEventoAPI";

export default function HomeScreen({ route, navigation }) {
  const { myAccount } = route.params;
  const [refresh, setRefresh] = useState(false);
  const [eventList, setEventList] = useState([]);
  const [shownEventList, setShownEventList] = useState([]);
  const [shownUserList, setShownUserList] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventOverlayVisible, setEventOverlayVisible] = useState(false);

  const toggleEventOverlay = event => {
    if (eventOverlayVisible) {
      setSelectedEvent(null);
    } else {
      setSelectedEvent(event);
    }
    setEventOverlayVisible(!eventOverlayVisible);
  };

  // Get all events.
  useEffect(() => {
    getAllEvents(events => {
      events.sort(function (a, b) {
        if (a.dateTime < b.dateTime) {
          return 1;
        } else {
          return -1;
        }
      });
      setEventList(events);
      setShownEventList(events);
    });
  }, [refresh]);

  // Handle search events.
  useEffect(() => {
    let regex = /\d\d\d\d-\d\d-\d\d/;
    let newEventList = eventList;
    if (regex.test(search))
    {
      //check if search is in date format
      newEventList = eventList.filter(event => {
        return (event.dateTime.substring(0, 10) == search);
      });
    }
    else
    {
      let newEventListByName = eventList.filter(event => {
        return event.name.includes(search);
      });
      let newEventListByDescription = eventList.filter(event => {
        return event.description.includes(search);
      });
      let newEventListByHashtags = eventList.filter(event => {
        return event.hashtags.includes(search);
      });
      newEventList = Array.from(new Set(newEventListByName.concat(newEventListByDescription).concat(newEventListByHashtags)));
    }
    newEventList.sort(function (a, b) {
      if (a.dateTime < b.dateTime) {
        return -1;
      } else {
        return 1;
      }
    });
    if (search == "") {
      setShownEventList(eventList);
    }
    setShownEventList(newEventList);
  }, [search, refresh]);

  // Handle search users.
  useEffect(() => {
    searchUsersByUsername(search, users => {
      if (search == "" || search[0] === '#') {
        users = [];
      }
      users.sort(function (a, b) {
        if (a.username < b.username) {
          return -1;
        } else {
          return 1;
        }
      });
      setShownUserList(users);
    });
  }, [search, refresh]);

  const handleSearch = search => {
    setSearch(search, refresh);
  };

  const renderEventCards = event => {
    return (
      <EventCard
        event={event}
        navigation={navigation}
        currentUser={myAccount.user}
        toggleOverlay={toggleEventOverlay}
      />
    );
  };

  const renderUserCards = user => {
    return (
      <UserCard user={user} navigation={navigation}>
{/*         <Button */}
{/*           title={`Check ${user.username}'s profile`} */}
{/*           onPress={() => */}
{/*             navigation.navigate("Profile", { */}
{/*               myAccount: myAccount, */}
{/*               profileUser: user, */}
{/*             }) */}
{/*           } */}
{/*         ></Button> */}
      </UserCard>
    );
  };

  if (eventList == []) {
    return (
      <View>
        <Text>Loading ....</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Button
          title="Refresh"
          onPress={() => {
            setRefresh(!refresh);
          }}
        />
        <Text style={styles.title}>Current Events</Text>
        <TextInput
          style={{ height: 40, width: 200 }}
          placeholder="Search by Events or Users or Dates"
          onChangeText={search => handleSearch(search)}
          defaultValue={search}
        />
        <FlatList
          data={shownEventList}
          renderItem={item => renderEventCards(item.item)}
          keyExtractor={item => item.id.toString()}
        />
        {shownUserList !== [] ? (
          <FlatList
            data={shownUserList}
            renderItem={item => renderUserCards(item.item)}
            keyExtractor={item => item.id.toString()}
            ListHeaderComponent={() => (
              <Text>{shownUserList.length != 0 ? "Found users" : ""}</Text>
            )}
          />
        ) : null}
        <EventOverlay
          isVisible={eventOverlayVisible}
          currentUser={myAccount.user}
          event={selectedEvent}
          toggleOverlay={toggleEventOverlay}
          setEvent={setSelectedEvent}
          navigation={navigation}
          imageNum = {Math.floor(Math.random() * 100 + 1)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  item: {
    flex: 1,
    fontSize: 15,
    justifyContent: "center",
  },
});
