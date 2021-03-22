import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Icon, Card } from "react-native-elements";

const EventCard = props => {
  const { event } = props;
  return (
    <Card styles={styles.card}>
      <Card.Title>{event.name}</Card.Title>
      <View>
        <Text>{event.description}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: 2000,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EventCard;