import React from "react";
import { StyleSheet, Text, View, Linking, Button } from "react-native";
import { TWILIO_SERVER_URL } from "../api/TwilioAPI";

const StreamingScreen = () => {
  linkTwilioServer = () => {
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
