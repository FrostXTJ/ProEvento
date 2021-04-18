import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, Alert, ScrollView, Image} from "react-native";

import {Card, Button, Avatar, ListItem} from "react-native-elements";
import {
    registerEvent,
    unregisterEvent,
    getUserRegisteredEvents,
    getEventNotification,
    getFollowNotification,
    getGroupNotification
} from "../api/ProEventoAPI";

const EventCard = props => {
    const {content, senderName, eventName, userId, event} = props;
    const [registeredEvents, setRegisteredEvents] = useState([]);

    useEffect(() => {
        getUserRegisteredEvents(userId, events => {
            setRegisteredEvents(events);
        });
    }, []);

    const checkEventInList = (event, list) => {
        let result = false;
        list.forEach(item => {
            if (item.id === event.id) {
                result = true;
            }
        });
        return result;
    };

    const onRegisterEvent = (userId, eventId) => {
        registerEvent(
            {
                userId: userId,
                eventId: eventId,
            },
            () => {
                Alert.alert("You have registered this event!");
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
                Alert.alert("You have unregistered this event!");
            }
        );
    };

    return (
        <Card containerStyle={{width: 350, borderRadius: 20}}>
            <Card.Title>{eventName}</Card.Title>
            <Text style={{fontWeight: "bold"}}>From {senderName}</Text>
            <Card.Divider/>
            <Text style={{marginBottom: 10}}>{content}</Text>
            {checkEventInList(event, registeredEvents) ? (
                <Button
                    buttonStyle={{
                        borderRadius: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0,
                    }}
                    title="UNREGISTER"
                    onPress={() => {
                        onUnregisterEvent(userId, event.id);
                    }}
                />
            ) : (
                <Button
                    buttonStyle={{
                        borderRadius: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0,
                    }}
                    title="REGISTER"
                    onPress={() => {
                        onRegisterEvent(userId, event.id);
                    }}
                />
            )}
        </Card>
    );
};

const FollowCard = props => {
    const {content, senderName, senderId} = props;

    return (
        <Card containerStyle={{width: 350, borderRadius: 20}}>
            <View style={styles.followContainer}>
                <Avatar
                    size={"medium"}
                    rounded
                    source={{
                        uri: `https://picsum.photos/300/300?random=${senderId}`,
                    }}
                    onPress={() => {
                        alert("Direct to the profile!")
                    }}
                />
                <ListItem.Content style={{marginLeft: '3%'}}>
                    <ListItem.Title style={{fontWeight: 'bold'}}>{senderName}</ListItem.Title>
                    <ListItem.Subtitle>{content}</ListItem.Subtitle>
                </ListItem.Content>
                <View style={styles.buttonContainer}>
                    <Button
                        buttonStyle={{
                            width: "85%",
                            marginLeft: "10%",
                        }}
                        title="Accept"
                        onPress={() => {
                            alert("Will accept")
                        }}
                    />
                </View>
            </View>
        </Card>
    );
};

const GroupCard = props => {
    const {content, senderName, groupName} = props;
    return (
        <Card containerStyle={{width: 350, borderRadius: 20}}>
            <Card.Title>{groupName}</Card.Title>
            <Text style={{fontWeight: "bold"}}>From {senderName}</Text>
            <Card.Divider/>
            <Text style={{marginBottom: 10}}>{content}</Text>
            <View style={styles.buttonContainer}>
                <Button
                    buttonStyle={{
                        width: "80%",
                        marginTop: "10%",
                    }}
                    title="Approve"
                    // onPress={() => {
                    //     Approve the request
                    // }}
                />
                <Button
                    buttonStyle={{
                        width: "80%",
                        marginTop: "10%",
                        marginLeft: "auto"
                    }}
                    title="Decline"
                    // onPress={() => {
                    //     Decline the request
                    // }}
                />
            </View>
        </Card>
    );
};

const NotificationScreen = ({navigation, route}) => {
    const myUser = route.params.myAccount.user;
    const [eventCards, setEventCards] = useState([]);
    const [followCards, setFollowCards] = useState([]);
    const [groupCards, setGroupCards] = useState([]);
    const [refresh, setRefresh] = useState(false);


    useEffect(() => {
        let arr = [];
        getEventNotification(myUser.id,allEvents => {
            if (allEvents != null) {
                allEvents.forEach(i => {
                    const card = (
                        <EventCard
                            key={i.id}
                            content={i.content}
                            senderName={i.sender.username}
                            eventName={i.event.name}
                            userId={myUser.id}
                            event={i.event}
                        />
                    );
                    arr.push(card);
                })
                setEventCards(arr);
            }
        });
    }, [refresh]);

    useEffect(() => {
        getFollowNotification(myUser.id,allFollows => {
            let arr = [];
            if (allFollows != null) {
                allFollows.forEach(i => {
                    const card = (
                        <FollowCard
                            content={i.content}
                            senderName={i.sender.username}
                            senderId = {i.sender.id}
                        />
                    );
                    arr.push(card);
                })
                setFollowCards(arr);
            }
        });
    }, []);

    useEffect(() => {
        getGroupNotification(myUser.id,allGroups => {
            let arr = [];
            if (allGroups != null) {
                console.log(allGroups)
                allGroups.forEach(i => {
                    const card = (
                        <GroupCard
                            content={i.content}
                            senderName={i.sender.username}
                            groupName={i.userGroup.name}
                        />
                    );
                    arr.push(card);
                })
                setGroupCards(arr);
            }
        });
    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                <Button style={styles.refreshButton}
                        title="Refresh"
                        onPress={() => {
                            setRefresh(!refresh);
                        }}
                />
                {eventCards}
                {followCards}
                {groupCards}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    refreshButton: {
        marginTop: "10%"
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    followContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default NotificationScreen;
