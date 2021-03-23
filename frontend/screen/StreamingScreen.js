import React from "react";
import { StyleSheet, Text, View, Linking, Button } from "react-native";
import EventCreationOverlay from "../components/eventCreationOverlay"
import { TWILIO_SERVER_URL } from "../api/TwilioAPI";

const StreamingScreen = ({navigation, route}) => {
  // TODO ADD event creation.
  const { myAccount } = route.params;
  const [eventCreationOverlayVisible, setEventCreationOverlayVisible] = useState(false);

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
      <Button title="Start Streaming" onPress={linkTwilioServer} />
      {/* <EventCreationOverlay isVisible={eventCreationOverlayVisible} currentUser={myAccount.user} toggleOver /> */}
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
