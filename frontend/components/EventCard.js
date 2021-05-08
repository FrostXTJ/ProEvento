import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Card, Button } from "react-native-elements";

const EventCard = props => {
    const { event, navigation, toggleOverlay } = props;
    return (
        <Card styles={styles.card}>
            <Card.Title>{event.name}</Card.Title>
            <View>
                <Text>{event.description}</Text>
                <Text>Likes: {event.likeCount}</Text>
                <Text>Date: {event.dateTime}</Text>
                <Text>Tag: {event.tag.name}</Text>
                <Text>Hashtags: {event.hashtags}</Text>
            </View>
            <Button
                title={`Host: ${event.host.username}`}
                type="clear"
                onPress={() =>
                    navigation.navigate("Profile", {
                        profileUser: event.host,
                    })
                }
            ></Button>
            <Button
                title="More Info"
                type="clear"
                onPress={() => toggleOverlay(event)}
            />
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        width: "80%",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default EventCard;
