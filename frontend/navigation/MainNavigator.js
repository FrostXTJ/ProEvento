import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screen/HomeScreen";
import ProfileScreen from "../screen/ProfileScreen";
import NotificationScreen from "../screen/NotificationScreen";
import StreamingScreen from "../screen/StreamingScreen";
import TestScreen from "../screen/TestScreen";
import {SettingNavigator} from  "../navigation/SettingNavigator";
import {HomeNavigator} from "./HomeNavigator";

const Tab = createBottomTabNavigator();

export const MainNavigator = props => {
  const { myAccount, setMyAccount } = props;

  return (

    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        initialParams={{ myAccount : myAccount,
                            profileUser : myAccount.user,

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
        name="Notification"
        component={NotificationScreen}
        initialParams={{
          myAccount: myAccount,
        }}
      />
      <Tab.Screen
        name="Streaming"
        component={StreamingScreen}
        initialParams={{
          myAccount: myAccount,
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
