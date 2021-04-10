import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screen/ProfileScreen";
import ProfileSettingScreen from "../screen/ProfileSettingScreen";

const Stack = createStackNavigator();

export const SettingNavigator = props => {
  const { setMyAccount  } = props;

  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} initialParams={{
      }} />
      <Stack.Screen name="ProfileSetting" component={ProfileSettingScreen} initialParams={{
      }} />
    </Stack.Navigator>
  );
};
