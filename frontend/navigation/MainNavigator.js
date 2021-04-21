import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screen/HomeScreen";
import ProfileScreen from "../screen/ProfileScreen";
import NotificationScreen from "../screen/NotificationScreen";
import GroupScreen from "../screen/GroupScreen";
import StreamingScreen from "../screen/StreamingScreen";
import MessageScreen from "../screen/MessageScreen";
import TestScreen from "../screen/TestScreen";
import { SettingNavigator } from "../navigation/SettingNavigator";
import { HomeNavigator } from "./HomeNavigator";
import { StreamingNavigator } from "./StreamingNavigator";

const Tab = createBottomTabNavigator();

export const MainNavigator = props => {
  const { myAccount, setMyAccount } = props;

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        initialParams={{
          myAccount: myAccount,
          profileUser: myAccount.user,
          setMyAccount: setMyAccount,
        }}
      />

      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        initialParams={{
          myAccount: myAccount,
        }}
      />
      <Tab.Screen
          name="Group"
          component={GroupScreen}
          initialParams={{
              myAccount: myAccount,
          }}
      />
      <Tab.Screen
        name="Streaming"
        component={StreamingNavigator}
        initialParams={{
          myAccount: myAccount,
        }}
      />
      <Tab.Screen
        name="Message"
        component={MessageScreen}
        initialParams={{
          myAccount: myAccount,
        }}
        />
      <Tab.Screen
        name="Profile"
        component={SettingNavigator}
        initialParams={{
          myAccount: myAccount,
          profileUser: myAccount.user,
          setMyAccount: setMyAccount,
        }}
      />
      <Tab.Screen
        name="Test"
        component={TestScreen}
        initialParams={{
          myAccount: myAccount,
          setMyAccount: setMyAccount,
        }}
      />
    </Tab.Navigator>
  );
};
