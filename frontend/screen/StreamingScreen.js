import React, { useState } from "react";
import { StyleSheet, Text, View, Linking, Button } from "react-native";
import EventCreationOverlay from "../components/eventCreationOverlay";
import { leaveEvent, addBadge } from "../api/ProEventoAPI"
import { TWILIO_SERVER_URL } from "../api/TwilioAPI";

const StreamingScreen = ({ navigation, route }) => {
  const { myAccount, currentEvent } = route.params;
  const [canAddBadge, setCanAddBadge] = useState(true);
  const [
    eventCreationOverlayVisible,
    setEventCreationOverlayVisible,
  ] = useState(false);

  const toggleEventCreationOverlay = () => {
    setEventCreationOverlayVisible(!eventCreationOverlayVisible);
  };

  const linkTwilioServer = () => {
    Linking.canOpenURL(TWILIO_SERVER_URL).then(supported => {
      if (supported) {
        Linking.openURL(TWILIO_SERVER_URL);
      } else {
        console.log("Cannot open the Twilio Server URL");
      }
    });
  };

  const onLeaveEvent = () => {
    leaveEvent({
      userId: myAccount.user.id,
      eventId: currentEvent.id
    })
  }

  const onAddBadge = badge => {
    addBadge({
      userId: currentEvent.host.id,
      badge: badge
    }, () => {
      setCanAddBadge(false);
    })
  }

  let streamingView;
  if (currentEvent == null) {
    streamingView = (<Button title="Host a new Event" onPress={toggleEventCreationOverlay} />);
  } else {
    streamingView = (<View>
      <Button title="Join the streaming room" onPress={linkTwilioServer} />
      <Button title="Leave the event" onPress={onLeaveEvent} />
      <Button title="Fun 🤣" onPress={() => {onAddBadge("Fun");}} disabled={!canAddBadge}/>
      <Button title="Cool 😎" onPress={() => {onAddBadge("Cool");}} disabled={!canAddBadge}/>
      <Button title="Helpful 😇" onPress={() => {onAddBadge("Helpful");}} disabled={!canAddBadge}/>
      <Button title="Lovely 🥰" onPress={() => {onAddBadge("Lovely");}} disabled={!canAddBadge}/>
      <Button title="Charming 🤠" onPress={() => {onAddBadge("Charming");}} disabled={!canAddBadge}/>
      <Button title="Awesome 🔥" onPress={() => {onAddBadge("Awesome");}} disabled={!canAddBadge}/>
      <Button title="Energetic ⚡" onPress={() => {onAddBadge("Energetic");}} disabled={!canAddBadge}/>
      <Button title="Smart 📚" onPress={() => {onAddBadge("Smart");}} disabled={!canAddBadge}/>
      <Button title="Dull 🥱" onPress={() => {onAddBadge("Dull");}} disabled={!canAddBadge}/>
      <Button title="Rude 🤬" onPress={() => {onAddBadge("Rude");}} disabled={!canAddBadge}/>
    </View>)
  }

  return (
    <View style={styles.container}>
      {streamingView}
      <EventCreationOverlay
        isVisible={eventCreationOverlayVisible}
        currentUser={myAccount.user}
        toggleOverlay={toggleEventCreationOverlay}
      />
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
});

export default StreamingScreen;
