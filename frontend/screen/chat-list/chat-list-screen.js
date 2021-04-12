import React, { useState, useLayoutEffect, useEffect, useCallback, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { colors } from '../../theme';
import { routes } from '../MessageScreen';
import { TwilioService } from '../../services/twilio-service';
import { getToken } from '../../services/api-service';
import { useApp } from '../../app-context';

//import { ChatListLoader } from './components/chat-list-loader';
import { ChatListEmpty } from './components/chat-list-empty';
import { ChatListItem } from './components/chat-list-item';
import {getUserJoinedGroup} from "../../api/ProEventoAPI";

export function ChatListScreen({ navigation, route }) {
  const { myAccount } = route.params;
  const username = myAccount.user.username;
  const userId = myAccount.user.id;
  const [loading, setLoading] = useState(true);
  const { channels, updateChannels } = useApp();
  const {groups, setGroups} = useState([]);
  const channelPaginator = useRef();

  const onAddChannel = (channel) => {
    const newChannel = TwilioService.getInstance().parseChannel(channel);
    updateChannels(channels.concat(newChannel));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate(routes.ChatCreat.name)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const setChannelEvents = useCallback(
    (client) => {
      client.on('messageAdded', (message) => {
        updateChannels((prevChannels) =>
          prevChannels.map((channel) =>
            channel.id === message.channel.sid ? { ...channel, lastMessageTime: message.dateCreated } : channel,
          ),
        );
      });
      return client;
    },
    [updateChannels],
  );

  const getSubscribedChannels = useCallback(
    (client) =>
      client.getSubscribedChannels().then((paginator) => {
        channelPaginator.current = paginator;
        const newChannels = TwilioService.getInstance().parseChannels(channelPaginator.current.items);
        updateChannels(newChannels);
      }),
    [updateChannels],
  );

  useEffect(() => {
    //get group names of the group that 
    getUserJoinedGroup(userId, groups=>{
      getToken(username)
      .then((token) => TwilioService.getInstance().getChatClient(token))
      .then(() => TwilioService.getInstance().addTokenListener(getToken))
      .then(setChannelEvents)
      .then(getSubscribedChannels)
      .then(()=>{
        //find group that is in groups but not in sortedChannels
        const joinedGroups = sortedChannels.map(channel => channel.name);
        groups.forEach(group =>{
          const groupName = group.name;
          console.log(groupName);
          console.log(joinedGroups);
          if (!joinedGroups.includes(groupName))
          {
            console.log("need to add");
            onCreateOrJoin(groupName); 
          }
        });
      })
      .catch((err) => showMessage({ message: err.message, type: 'danger' }))
      .finally(() => setLoading(false));
    });

    return () => TwilioService.getInstance().clientShutdown();
  }, [username, setChannelEvents, getSubscribedChannels]);

  const sortedChannels = useMemo(
    () => channels.sort((channelA, channelB) => channelB.lastMessageTime - channelA.lastMessageTime),
    [channels],
  );

  const onCreateOrJoin = (channelName) => {
    setLoading(true);
    TwilioService.getInstance()
      .getChatClient()
      .then((client) =>
        client
          .getChannelByUniqueName(channelName)
          .then((channel) => (channel.channelState.status !== 'joined' ? channel.join() : channel))
          .then(onAddChannel)
          .catch(() =>
            client.createChannel({ uniqueName: channelName, friendlyName: channelName }).then((channel) => {
              onAddChannel(channel);
              channel.join();
            }),
          ),
      )
     // .then(() => showMessage({ message: 'You have joined.' }))
      .catch((err) => showMessage({ message: err.message, type: 'danger' }))
      //.finally(() => setLoading(false));
  };

  return (
    <View style={styles.screen}>
      {loading ? (
        <Text>Loading.... </Text>
      ) : (
        <FlatList
          data={sortedChannels}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatListItem
              channel={item}
              onPress={() => navigation.navigate(routes.ChatRoom.name, { channelId: item.id, identity: username })}
            />
          )}
          ListEmptyComponent={<ChatListEmpty />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.snow,
  },
  addButton: {
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  addButtonText: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 24,
    color: colors.white,
  },
});
