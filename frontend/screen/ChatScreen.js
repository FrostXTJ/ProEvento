import React, { useEffect, useState } from "react";
import {StyleSheet, Text, View, Alert, ScrollView, Image, TextInput} from "react-native";

import { Card, Button, Avatar, ListItem, Divider } from "react-native-elements";
import {
    registerEvent,
    unregisterEvent,
    getUserRegisteredEvents,
} from "../api/ProEventoAPI";

const ChatScreen = ({ route, navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Hello World</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 100,
    },
});

export default ChatScreen;
