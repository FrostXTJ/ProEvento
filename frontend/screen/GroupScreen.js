import React, { useEffect, useState } from "react";
import {StyleSheet, Text, View, Alert, ScrollView, Image, TextInput} from "react-native";
import {Button, Avatar, ListItem, Divider, Overlay, Input, Icon} from "react-native-elements";
import {getAllGroups, getGroupsByMember, sendGroupRequest, getGroupsByName} from "../api/ProEventoAPI";
import { showMessage } from 'react-native-flash-message';

const GroupScreen = ({ route, navigation, props }) => {
    const userId = route.params.myAccount.user.id;
    const userName = route.params.myAccount.user.username;
    const [groupList, setGroupList] = useState([]);
    const [shownGroupList, setShownGroupList] = useState([]);
    const [joinedGroupList, setJoinedGroupList] = useState([]);
    const [refresh, setRefresh] = useState(false);

    //const [groupName, setGroupName] = useState("");
    //const [description, setDescription] = useState("");
    const [search, setSearch] = useState("");

    // const [visible, setVisible] = useState(false);
    // const toggleOverlay = () => {
    //     setVisible(!visible);
    // };

    // Get all groups.
    useEffect(() => {
        getAllGroups(allGroups => {
            if (allGroups != null) {
                setGroupList(allGroups);
                setShownGroupList(allGroups);
            }
        });
    }, []);

    //get all groups that the user already joined 
    useEffect(()=>{
        getGroupsByMember(userId, groups=>{
            const joinedGroups = groups.map(group=>{
                return group.name;
            });
            setJoinedGroupList(joinedGroups);
        })
    }, [refresh]);

    // Handle search groups.
    useEffect(() => {
        const newGroupList = groupList.filter(group => {
            return (group.name.includes(search)||group.tag.name == search);
        });
        if (search != "") {
            setShownGroupList(newGroupList);
        }
        else
        {
            setShownGroupList(groupList);
        }
    }, [search, refresh]);

    const onSendRequest = (groupName) =>{
        //send request to group owner 
        const request = {};
        getGroupsByName (groupName, (groups)=> {
          const userGroup = {id: groups[0].id};
          request.userGroup = userGroup;
          const receivers = [{id: groups[0].founder.id}]
          request.receivers = receivers;
    
          Number.prototype.padLeft = function(base,chr){
            var  len = (String(base || 10).length - String(this).length)+1;
            return len > 0? new Array(len).join(chr || '0')+this : this;
          }
          var d = new Date,
          dformat = [d.getFullYear(),
                     (d.getMonth()+1).padLeft(),
                     d.getDate().padLeft()
                     ].join('-') +' ' +
                    [d.getHours().padLeft(),
                     d.getMinutes().padLeft(),
                     d.getSeconds().padLeft()].join(':');
          request.dateTime = dformat;
          const content = `${userName} wants to join ${groupName}`;
          request.content = content;
          const sender = {id: userId};
          request.sender = sender;
          sendGroupRequest(request, ()=>{
            showMessage({ message: 'You have requested to join the group' });
          });
        });
      };


    return (
        <ScrollView>
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Search by Names or Tags"
                    onChangeText={search => setSearch(search)}
                    defaultValue={search}
                />
            </View>
            <View>
                {
                    shownGroupList.map((l, i) => (
                        <ListItem key={i} bottomDivider>
                            <Avatar
                                source={{uri: `https://picsum.photos/300/300?random=${l.id}`}}
                                size={"medium"}
                                rounded
                                onPress={() => {
                                    alert("Navigate to chat screen");
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
                                {!joinedGroupList.includes(l.name)?
                                    <Button
                                    buttonStyle={{
                                        width: 'auto',
                                        borderRadius: '10',
                                        backgroundColor: 'green',
                                    }}
                                    title={`Request to Join`}
                                    onPress={()=>{
                                        onSendRequest(l.name);
                                    }}
                                    />
                                    :
                                    <ListItem.Subtitle>{`You are already a member of ${l.name}`}</ListItem.Subtitle>
                                }
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
            </View>
            <Button
                buttonStyle={{
                    width: "50%",
                    marginTop: 50,
                    marginLeft: 50
                }}
                title="Refresh"
                onPress={() => {
                    setRefresh(!refresh);
                }}
            />
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
    group: {
        width: "85%"
    }
});

export default GroupScreen;
