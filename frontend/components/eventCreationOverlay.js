import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Overlay, Text, Button, Input } from "react-native-elements";
import {
  searchEventById,
  getUserHostEvents,
  getAllTags,
  hostEvent
} from "../api/ProEventoAPI";

const getDifference = (oldEventList, newEventList) => {
  if (oldEventList.length >= newEventList.length) {
    return null;
  }
  newEventList.forEach(newEvent => {
    let found = false;
    for (const oldEvent in oldEventList) {
      if (oldEvent.id === newEvent.id) {
        found = true;
      }
    }
    if (!found) {
      return newEvent;
    }
  });
  return null;
};

const EventCreationOverlay = props => {
  const { currentUser, isVisible, toggleOverlay } = props;

  const [hostEvents, setHostEvents] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  // Get user's host events.
  useEffect(() => {
    getUserHostEvents(currentUser.id, events => {
      setHostEvents(events);
    });
  }, []);

  // Get all tags.
  useEffect(() => {
    getAllTags(tags => {
      setAllTags(tags);
    })
  })


  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={toggleOverlay}
      overlayStyle={styles.overlay}
    >
      <View>
          <Input placeholder="Event Name" />
          <Input placeholder="Event Description" />
      </View>
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

export default EventCreationOverlay;
