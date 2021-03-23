import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Overlay, Text, Button } from "react-native-elements";
import {
  searchEventById,
  getUserRegisteredEvents,
  getUserHostEvents,
  registerEvent,
  unregisterEvent,
  startEvent,
  endEvent,
  searchUserById,
} from "../api/ProEventoAPI";

const checkEventInList = (event, list) => {
  let result = false;
  list.forEach(item => {
    if (item.id === event.id) {
      result = true;
    }
  });
  return result;
};

const EventOverlay = props => {
  const { event, setEvent, currentUser, isVisible, toggleOverlay } = props;

  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [hostEvents, setHostEvents] = useState([]);

  // Get user's registered events.
  useEffect(() => {
    getUserRegisteredEvents(currentUser.id, events => {
      setRegisteredEvents(events);
    });
  }, []);

  // Get user's host events.
  useEffect(() => {
    getUserHostEvents(currentUser.id, events => {
      setHostEvents(events);
    });
  }, []);

  const onRegisterEvent = (userId, eventId) => {
    registerEvent(
      {
        userId: userId,
        eventId: eventId,
      },
      () => {
        setRegisteredEvents([...registeredEvents, event]);
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
        setRegisteredEvents(
          registeredEvents.filter(item => {
            return item.id !== event.id;
          })
        );
      }
    );
  };

  const onStartEvent = eventId => {
    startEvent(
      {
        eventId: eventId,
      },
      () => {
        setEvent({ ...event, status: "streaming" });
      }
    );
  };

  const onEndEvent = eventId => {
    endEvent(
      {
        eventId: eventId,
      },
      () => {
        setEvent({ ...event, status: "ended" });
      }
    );
  };

  let eventButton = <Button title="Loading..." disabled />;
  if (event) {
    if (event.host.id === currentUser.id) {
      if (event.status === "streaming") {
        eventButton = (
          <Button
            title="End Event"
            buttonStyle={styles.endButton}
            onPress={() => {
              onEndEvent(event.id);
            }}
          />
        );
      } else {
        eventButton = (
          <Button
            title="Start Event"
            buttonStyle={styles.startButton}
            onPress={() => {
              onStartEvent(event.id);
            }}
          />
        );
      }
    } else {
      if (event.status === "open for registration") {
        if (checkEventInList(event, registeredEvents)) {
          eventButton = (
            <Button
              title="Unregister"
              onPress={() => {
                onUnregisterEvent(currentUser.id, event.id);
              }}
            />
          );
        } else {
          eventButton = (
            <Button
              title="Register"
              onPress={() => {
                onRegisterEvent(currentUser.id, event.id);
              }}
            />
          );
        }
      }
    }
  }

  const randomImageIdentifier = Math.floor(Math.random() * 100 + 1);

  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={toggleOverlay}
      overlayStyle={styles.overlay}
    >
      {event === null ? (
        <Text>Empty</Text>
      ) : (
        <View>
          <Text style={styles.title}>{event.name}</Text>
          <Text>{event.description}</Text>
          <Image
            source={{
              uri: `https://picsum.photos/300/300?random=${randomImageIdentifier}`,
            }}
            style={styles.image}
          />
          {eventButton}
        </View>
      )}
    </Overlay>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  overlay: {
    width: "80%",
    height: "60%",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  endButton: {
    backgroundColor: "red",
  },
  startButton: {
    backgroundColor: "green",
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default EventOverlay;
