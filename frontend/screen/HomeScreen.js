import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from "react-native";
import {
  getAllEvents,
  searchUsersByUsername,
  getUserRegisteredEvents,
  unregisterEvent,
  registerEvent,
} from "../api/ProEventoAPI";
import { Card, Overlay } from "react-native-elements";

const Item = props => {
  const { event, navigation, myAccount, toggleOverlay } = props;
  return (
    <Card>
      <Card.Title>{event.name}</Card.Title>
      <Text>{event.description}</Text>
      <Button
        title={`Host: ${event.host.username}`}
        onPress={() =>
          navigation.navigate("Profile", {
            myAccount: myAccount,
            profileUser: event.host,
          })
        }
      ></Button>
      <Text>Likes: {event.likeCount}</Text>
      <Text>Date: {event.dateTime}</Text>
      <Text>Tag: {event.tag.name}</Text>
      <Button title="More Info" onPress={() => toggleOverlay(event)} />
    </Card>
  );
};

const UserCard = props => {
  const { user, navigation, myAccount } = props;
  return (
    <Card>
      <Card.Title>{user.username}</Card.Title>
      <Text>{user.biography}</Text>
      <Button
        title={`Check ${user.username}'s profile`}
        onPress={() =>
          navigation.navigate("Profile", {
            myAccount: myAccount,
            profileUser: user,
          })
        }
      ></Button>
      <Text>Tags: </Text>
      {user.tags.map(tag => (
        <Text key={tag.id}>{tag.name}</Text>
      ))}
    </Card>
  );
};

const renderItem = (item, navigation, myAccount, toggleOverlay) => {
  return (
    <Item
      event={item}
      navigation={navigation}
      myAccount={myAccount}
      toggleOverlay={toggleOverlay}
    />
  );
};

const renderUser = (item, navigation, myAccount) => {
  return <UserCard user={item} navigation={navigation} myAccount={myAccount} />;
};

export default function HomeScreen({ route, navigation }) {
  const { myAccount } = route.params;
  const [eventList, setEventList] = useState([]);
  const [shownList, setShownList] = useState([]);
  const [shownUserList, setShownUserList] = useState([]);
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectEvent, setSelectEvent] = useState({});
  const [currentUserRegister, setCurrentUserRegister] = useState([]);

  const toggleOverlay = event => {
    //setSelectEvent(event);
    setSelectEvent(event);
    setVisible(!visible);
  };

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
      setShownList(events);
    });
  }, []);

  useEffect(() => {
    getUserRegisteredEvents(myAccount.user.id, events => {
      setCurrentUserRegister(events);
    });
  }, []);

  const handleSearch = search => {
    setSearch(search);
  };

  const checkEventInList = (event, list) => {
    let result = false;
    list.forEach(item => {
      if (item.id === event.id) {
        result = true;
      }
    });
    return result;
  };

  const onUnregisterEvent = (event, user) => {
    unregisterEvent(
      {
        userId: user.id,
        eventId: event.id,
      },
      () => {
        // let newRegisterList = currentUserRegister.map((item)=>{
        //    if (item.id !== event.id)
        //    {
        //     return item;
        //    }
        // });
        setCurrentUserRegister(
          currentUserRegister.filter(item => {
            return item.id !== event.id;
          })
        );
      }
    );
  };

  const onRegisterEvent = (event, user) => {
    registerEvent(
      {
        userId: user.id,
        eventId: event.id,
      },
      () => {
        setCurrentUserRegister([...currentUserRegister, event]);
      }
    );
  };

  useEffect(() => {
    let newEventList = eventList.filter(event => {
      return event.name.includes(search);
    });
    newEventList.sort(function (a, b) {
      if (a.dateTime < b.dateTime) {
        return -1;
      } else {
        return 1;
      }
    });
    if (search == "") {
      setShownList(eventList);
    }
    setShownList(newEventList);
  }, [search]);

  useEffect(() => {
    searchUsersByUsername(search, users => {
      if (search == "") {
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
  }, [search]);

  if (eventList == []) {
    return (
      <View>
        <Text>Loading ....</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {/* The screen content are put here */}
        <Text style={styles.title}>Current Events</Text>
        <TextInput
          style={{ height: 40 }}
          placeholder="Search for Events or Users"
          onChangeText={search => handleSearch(search)}
          defaultValue={search}
        />
        <FlatList
          data={shownList}
          renderItem={item =>
            renderItem(item.item, navigation, myAccount, toggleOverlay)
          }
          keyExtractor={item => item.id.toString()}
        />
        {shownUserList !== [] ? (
          <FlatList
            data={shownUserList}
            renderItem={item => renderUser(item.item, navigation, myAccount)}
            keyExtractor={item => item.id.toString()}
            ListHeaderComponent={() => (
              <Text>{shownUserList.length != 0 ? "Found users" : ""}</Text>
            )}
          />
        ) : null}
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <Text style={styles.title}>{selectEvent.name}</Text>
          <Text>{selectEvent.description}</Text>
          {checkEventInList(selectEvent, currentUserRegister) ? (
            <Button
              title="Unregister"
              onPress={() => {
                onUnregisterEvent(selectEvent, myAccount.user);
              }}
            ></Button>
          ) : (
            <Button
              title="Register"
              onPress={() => {
                onRegisterEvent(selectEvent, myAccount.user);
              }}
            ></Button>
          )}
        </Overlay>
        {/* <Button title="Log out" onPress={() => navigation.goBack()} /> */}
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
