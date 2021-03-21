import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screen/HomeScreen";
import ProfileScreen from "../screen/ProfileScreen";
import NotificationScreen from "../screen/NotificationScreen";
import StreamingScreen from "../screen/StreamingScreen";
import TestScreen from "../screen/TestScreen";

const Tab = createBottomTabNavigator();

export const MainNavigator = props => {
  const { setMyAccount } = props;

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Streaming" component={StreamingScreen} />
      <Tab.Screen name="Test">
        {props => <TestScreen {...props} setMyAccount={setMyAccount} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
