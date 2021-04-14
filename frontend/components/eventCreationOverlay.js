import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import {
  Overlay,
  Text,
  Button,
  Input,
  ButtonGroup,
} from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  searchEventById,
  getFollowers,
  getUserHostEvents,
  getAllTags,
  hostEvent,
  sendInvitation,
} from "../api/ProEventoAPI";

const getDifference = (oldEventList, newEventList) => {
  if (oldEventList.length >= newEventList.length) {
    return null;
  }
  for (const i in newEventList) {
    let found = false;
    for (const j in oldEventList) {
      if (oldEventList[j].id === newEventList[i].id) {
        found = true;
      }
    }
    if (!found) {
      return newEventList[i];
    }
  }
  return null;
};

const dateTimeToString = date => {
  const iso = date.toISOString();
  return iso.slice(0, 10) + " " + iso.slice(11, 19);
};

const EventCreationOverlay = props => {
  const { currentUser, isVisible, toggleOverlay } = props;
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDateTime, setEventDateTime] = useState(new Date(Date.now()));
  const [hostEvents, setHostEvents] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [selectedTagIndex, setSelectedTagIndex] = useState(0);

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
      // setSelectedTag(tags[0]);
    });
  }, []);

  // Get all followers.
  useEffect(() => {
    getFollowers(currentUser.id, users => {
      setFollowers(users);
    });
  });

  const onHostEvent = () => {
    toggleOverlay();
    const oldEvents = hostEvents;
    const event = {
      name: eventName,
      description: eventDescription,
      coverImageUrl: "",
      tag: allTags[selectedTagIndex],
      host: { id: currentUser.id },
      dateTime: dateTimeToString(eventDateTime),
    };

    hostEvent(event, response => {
      getUserHostEvents(currentUser.id, newHostEvents => {
        let newEvent = null;
        newEvent = getDifference(hostEvents, newHostEvents);

        if (newEvent != null) {
          sendInvitation(
            {
              content: `${currentUser.username} invites you to ${newEvent.name}. Let's check it out!`,
              dateTime: dateTimeToString(new Date(Date.now())),
              sender: { id: currentUser.id },
              event: { id: newEvent.id },
              receivers: followers,
            },
            () => {
              setHostEvents(newHostEvents);
            }
          );
        }
      });
    });
  };

  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={toggleOverlay}
      overlayStyle={styles.overlay}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Host a new Event</Text>
        <Input
          placeholder="Event Name"
          onChangeText={input => {
            setEventName(input);
          }}
        />
        <Input
          placeholder="Event Description"
          onChangeText={input => {
            setEventDescription(input);
          }}
        />
        <Picker
          style={{ height: 150, width: 150 }}
          selectedValue={selectedTagIndex}
          onValueChange={(tag, tagIndex) => setSelectedTagIndex(tagIndex)}
        >
          {allTags.map((tag, idx) => (
            <Picker.Item key={tag.id} label={tag.name} value={idx} />
          ))}
        </Picker>
        <DateTimePicker
          style={styles.datetimepicker}
          value={eventDateTime}
          mode={"date"}
          display="default"
          onChange={(e, selectedDate) => {
            const datetime = new Date(eventDateTime);
            datetime.setFullYear(selectedDate.getFullYear());
            datetime.setMonth(selectedDate.getMonth());
            datetime.setDate(selectedDate.getDate());
            setEventDateTime(datetime);
          }}
        />
        <DateTimePicker
          style={styles.datetimepicker}
          value={eventDateTime}
          mode={"time"}
          is24Hour={true}
          display="default"
          onChange={(e, selectedTime) => {
            const datetime = new Date(eventDateTime);
            datetime.setHours(selectedTime.getHours());
            datetime.setMinutes(selectedTime.getMinutes());
            datetime.setSeconds(selectedTime.getSeconds());
            setEventDateTime(datetime);
          }}
        />

        <Button title="host" onPress={onHostEvent} />
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 24,
  },
  overlay: {
    width: "80%",
    height: "60%",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "100%",
    height: "80%",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  datetimepicker: {
    width: "90%",
    backgroundColor: "white",
  },
});

export default EventCreationOverlay;
