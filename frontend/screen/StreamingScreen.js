import React, { useState } from "react";
import { StyleSheet, Text, View, Linking, Button } from "react-native";
import EventCreationOverlay from "../components/eventCreationOverlay";
import { TWILIO_SERVER_URL } from "../api/TwilioAPI";

const StreamingScreen = ({ navigation, route }) => {
  const { myAccount } = route.params;
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

  return (
    <View style={styles.container}>
      <Text>Streaming</Text>
      <Button title="Host a new Event" onPress={toggleEventCreationOverlay} />
      <Button title="Join an event" onPress={linkTwilioServer} />
      <Button title="🤣" onPress={() => {console.log("Fun")}}/>
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
