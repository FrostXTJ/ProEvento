import React, { useState } from "react";
import { StyleSheet, Text, View, Linking, Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FlashMessage from 'react-native-flash-message';

import { WelcomeScreen } from './welcome/welcome-screen';
import { ChatListScreen } from './chat-list/chat-list-screen';
import { ChatRoomScreen } from './chat-room/chat-room-screen';
import { ChatCreateScreen } from './chat-create/chat-create-screen';

import { colors } from '../theme';
import { AppProvider } from '../app-context';

const Stack = createStackNavigator();

export const routes = {
    Welcome: {
      name: 'welcome',
      title: 'Welcome',
    },
    ChatList: {
      name: 'chat-list',
      title: 'Chat List',
    },
    ChatRoom: {
      name: 'chat-room',
      title: 'Chat Room',
    },
    ChatCreat: {
      name: 'chat-create',
      title: 'New Channel',
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
                name={routes.Welcome.name}
                options={screenOptions(routes.Welcome.title)}
                component={WelcomeScreen}
              />
              <Stack.Screen
                name={routes.ChatList.name}
                options={screenOptions(routes.ChatList.title)}
                component={ChatListScreen}
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
            </Stack.Navigator>
            <FlashMessage position="bottom" />
          </AppProvider>
        // </NavigationContainer>
      );
};

export default MessageScreen;