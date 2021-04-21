import React, {useEffect, useState} from "react";
import {RefreshControl, StyleSheet, Text, View, Alert, ScrollView, Image} from "react-native";

import {Card, Button, Avatar, ListItem} from "react-native-elements";
import {
    registerEvent,
    unregisterEvent,
    getUserRegisteredEvents,
    getEventNotification,
    getFollowNotification,
    getGroupNotification,
    follow,
    addUserToGroup,
    removeFollowNotification,
    removeGroupNotification,

} from "../api/ProEventoAPI";

const EventCard = props => {
    const {content, senderName, eventName, userId, event, type, eventId} = props;
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

    let button = <Button title="Loading"></Button>
    if (type == "cancel") {
        button =
            <Button
                buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                }}
                title="Cancelled"
                onPress={() => {
                    alert("this event has been cancelled");
                }}
            />
    } else {
        if (checkEventInList(event, registeredEvents)) {
            button =
                <Button
                    buttonStyle={{
                        borderRadius: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0,
                    }}
                    title="Register"
                    onPress={() => {
                        onRegisterEvent(userId, eventId);
                    }}
                />
        } else {
            button =
                <Button
                    buttonStyle={{
                        borderRadius: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0,
                    }}
                    title="Unregister"
                    onPress={() => {
                        onUnregisterEvent(userId, eventId);
                    }}
                />
        }
    }

    return (
        <Card containerStyle={{width: 350, borderRadius: 20}}>
            <Card.Title>{eventName}</Card.Title>
            <Text style={{fontWeight: "bold"}}>From {senderName}</Text>
            <Card.Divider/>
            <Text style={{marginBottom: 10}}>{content}</Text>
            {button}
        </Card>
    );
};

const FollowCard = props => {
    const {content, senderName, senderId, myUserId, notificationId} = props;

    const onRemoveFollow = (myUserId, notificationId) => {
        removeFollowNotification(
            {
                userId: myUserId,
                notificationId: notificationId,
            }
        );
    };

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
                            follow(
                                {
                                    followerId: senderId,
                                    followeeId: myUserId,
                                },
                                response => {
                                    if (response == "success") {
                                        alert("You have accepted this follow request!");
                                        onRemoveFollow(myUserId, notificationId);
                                    }
                                }
                            );
                        }}
                    />
                </View>
            </View>
        </Card>
    );
};

const GroupCard = props => {
    const {content, senderName, groupName, senderId, groupId, myUserId, notificationId} = props;

    const onRemoveGroup = (myUserId, notificationId) => {
        removeGroupNotification(
            {
                userId: myUserId,
                notificationId: notificationId,
            },
            response => {
                if (response == success) {
                    console.log("succesfully deleted");
                }
            }

        );
    };

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
                    onPress={() => {
                        addUserToGroup(
                            {
                                userId: senderId,
                                groupId: groupId,
                            },
                            response => {
                                if (response == "success") {
                                    alert("You have approved the group request");
                                    onRemoveGroup(myUserId, notificationId);
                                }
                            }
                        );
                    }}
                />
                <Button
                    buttonStyle={{
                        width: "80%",
                        marginTop: "10%",
                        marginLeft: "auto"
                    }}
                    title="Decline"
                    onPress={() => {
                        alert("You have declined the group request");
                        onRemoveGroup(myUserId, notificationId);
                    }}
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
    const [refreshing, setRefreshing] = useState(false);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);


    useEffect(() => {
        let arr = [];
        getEventNotification(myUser.id,allEvents => {
            if (allEvents != null) {
                allEvents.forEach(i => {
                    const card = (
                        <EventCard
                            content={i.content}
                            senderName={i.sender.username}
                            eventName={i.event.name}
                            userId={myUser.id}
                            event={i.event}
                            eventId={i.event.id}
                            type={i.type}
                            myUserId = {myUser.id}
                            notificationId={i.id}
                        />
                    );
                    arr.push(card);
                })
                setEventCards(arr);
            }
        });
    }, []);

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
                            myUserId = {myUser.id}
                            notificationId= {i.id}
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
                allGroups.forEach(i => {
                    const card = (
                        <GroupCard
                            content={i.content}
                            senderName={i.sender.username}
                            senderId={i.sender.id}
                            groupName={i.userGroup.name}
                            groupId={i.userGroup.id}
                            myUserId = {myUser.id}
                            notificationId= {i.id}
                        />
                    );
                    arr.push(card);
                })
                setGroupCards(arr);
            }
        });
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.scrollView}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />}>
            <View style={styles.container}>
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
