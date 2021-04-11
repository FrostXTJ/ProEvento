import React, { useEffect, useState } from "react";
import {StyleSheet, Text, View, Alert, ScrollView, Image, TextInput} from "react-native";

import { Button, Avatar, ListItem, Divider, Overlay } from "react-native-elements";
import {getGroupsByFounder, getGroupsByMember} from "../api/ProEventoAPI";

const GroupScreen = ({ route, navigation, props }) => {
    const myUser = route.params.myAccount.user;
    const [groupList, setGroupList] = useState([]);

    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
    };

    useEffect(() => {
        getGroupsByFounder(myUser.id, founderGroups => {
            getGroupsByMember(myUser.id, memberGroups => {
                if (memberGroups != null) {
                    const temp = founderGroups.concat(memberGroups);
                    setGroupList(temp);
                }
            });
        });
    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Button
                        buttonStyle={{
                            width: "70%",
                        }}
                        title="Refresh"
                        // onPress={() => {
                        //     Approve the request
                        // }}
                    />
                    <Button
                        buttonStyle={{
                            width: "70%",
                            marginLeft: "auto",
                        }}
                        title="New Group"
                        onPress={toggleOverlay}
                    />
                    <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.overlay}>
                        <View>
                            <Text>Group Name:</Text>
                            <TextInput style={styles.title}/>
                        </View>
                    </Overlay>
                </View>
                <TextInput
                    style={styles.textInput}
                    placeholder="Search by Names or Categories"
                />
            </View>
            <View>
                {
                    groupList.map((l, i) => (
                        <ListItem key={i} bottomDivider>
                            <Avatar
                                source={{uri: `https://picsum.photos/300/300?random=${l.id}`}}
                                size={"medium"}
                                rounded
                                onPress={() => {
                                    alert("Navigate to chat screen");
                                    // this.props.navigation.navigate('Chat')
                                }}
                            />
                            <ListItem.Content>
                                <ListItem.Title style={{ fontWeight: 'bold' }}>{l.name}</ListItem.Title>
                                <ListItem.Subtitle>{l.description}</ListItem.Subtitle>
                                <ListItem.Subtitle style={{ marginTop: 15}}>
                                    <Button
                                        buttonStyle={{
                                            width: 'auto',
                                            borderRadius: '10',
                                            backgroundColor: 'orangered',
                                        }}
                                        title={l.tag.name}
                                    />
                                </ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 100,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0,
        marginBottom: 50,
    },
    textInput: {
        justifyContent: "center",
        borderRadius: 15,
        height: 50,
        marginBottom: 20,
        fontSize: 17
    },
    overlay: {
        width: "75%",
        height: "45%",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default GroupScreen;
