import React, { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { showMessage } from 'react-native-flash-message';
import { routes } from '../MessageScreen';
import { colors } from '../../theme';
import { TwilioService } from '../../services/twilio-service';
//import { ChatLoader } from './components/chat-loader';

export function ChatRoomScreen({ navigation, route }) {
  const { channelId, channelName, identity, myAccount} = route.params;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const chatClientChannel = useRef();
  const chatMessagesPaginator = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate(routes.ChatAddUser.name,  { myAccount: myAccount, channelName: channelName})}>
          <Text style={styles.addButtonText}>{'Add Member'}</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const setChannelEvents = useCallback((channel) => {
    chatClientChannel.current = channel;
    chatClientChannel.current.on('messageAdded', (message) => {
      const newMessage = TwilioService.getInstance().parseMessage(message);
      const { giftedId } = message.attributes;
      if (giftedId) {
        setMessages((prevMessages) => {
          if (prevMessages.some(({ _id }) => _id === giftedId)) {
            return prevMessages.map((m) => (m._id === giftedId ? newMessage : m));
          }
          return [newMessage, ...prevMessages];
        });
      }
    });
    return chatClientChannel.current;
  }, []);

  useEffect(() => {
    TwilioService.getInstance()
      .getChatClient()
      .then((client) => client.getChannelBySid(channelId))
      .then((channel) => setChannelEvents(channel))
      .then((currentChannel) => currentChannel.getMessages())
      .then((paginator) => {
        chatMessagesPaginator.current = paginator;
        const newMessages = TwilioService.getInstance().parseMessages(paginator.items);
        setMessages(newMessages);
      })
      .catch((err) => showMessage({ message: err.message, type: 'danger' }))
      .finally(() => setLoading(false));
  }, [channelId, setChannelEvents]);

  const onSend = useCallback((newMessages = []) => {
    const attributes = { giftedId: newMessages[0]._id };
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    chatClientChannel.current?.sendMessage(newMessages[0].text, attributes);
  }, []);

  return (
    <View style={styles.screen}>
      {loading ? (
        <Text>Loading... </Text>
      ) : (
          <GiftedChat
            messagesContainerStyle={styles.messageContainer}
            messages={messages}
            renderAvatarOnTop
            onSend={(messages) => onSend(messages)}
            user={{ _id: identity }}
          />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },
  messageContainer: {
    backgroundColor: colors.snow,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    marginRight: 10,
    color: colors.white,
  },
});
