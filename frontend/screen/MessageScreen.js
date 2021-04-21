import React, { useState } from "react";
// import { StyleSheet, Text, View, Linking, Button } from "react-native";
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FlashMessage from 'react-native-flash-message';

import { ChatListScreen } from './chat-list/chat-list-screen';
import { ChatRoomScreen } from './chat-room/chat-room-screen';
import { ChatCreateScreen } from './chat-create/chat-create-screen';
import { ChatAddUserScreen} from './chat-adduser/chat-adduser-screen';
import {ChatDirectContact} from './chat-directContact/chat-directContact';

import { colors } from '../theme';
import { AppProvider } from '../app-context';

const Stack = createStackNavigator();

export const routes = {
    ChatList: {
      name: 'chat-list',
      title: 'Joined Groups',
    },
    ChatRoom: {
      name: 'chat-room',
      title: 'Chat room',
    },
    ChatCreat: {
      name: 'chat-create',
      title: 'New Group',
    },
    ChatAddUser: {
      name: 'chat-adduser',
      title: 'Add User',
    },
    ChatDirectContact: {
      name: 'chat-directContact',
      title: 'Add Direct Contact',
    },
  };

const MessageScreen = ({ navigation, route }) => {
    const { myAccount } = route.params;
    const screenOptions = (title) => ({
        title,
        headerStyle: {
          backgroundColor: colors.amaranth,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: '700',
        },
    });

    return (
        // <NavigationContainer>
          <AppProvider>
            <Stack.Navigator>
              <Stack.Screen
                name={routes.ChatList.name}
                options={screenOptions(routes.ChatList.title)}
                component={ChatListScreen}
                initialParams={{
                  myAccount: myAccount,
                }}
              />
              <Stack.Screen
                name={routes.ChatRoom.name}
                options={screenOptions(routes.ChatRoom.title)}
                component={ChatRoomScreen}
              />
              <Stack.Screen
                name={routes.ChatCreat.name}
                options={screenOptions(routes.ChatCreat.title)}
                component={ChatCreateScreen}
              />
              <Stack.Screen
                name={routes.ChatAddUser.name}
                options={screenOptions(routes.ChatAddUser.title)}
                component={ChatAddUserScreen}
              />
              <Stack.Screen
                name={routes.ChatDirectContact.name}
                options={screenOptions(routes.ChatDirectContact.title)}
                component={ChatDirectContact}
              />
            </Stack.Navigator>
            <FlashMessage position="bottom" />
          </AppProvider>
        // </NavigationContainer>
      );
};

export default MessageScreen;