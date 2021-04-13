import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screen/HomeScreen";
import ProfileScreen from "../screen/ProfileScreen";
import ProfileSettingScreen from "../screen/ProfileSettingScreen";
import ChangePasswordScreen from "../screen/ChangePasswordScreen";
const Stack = createStackNavigator();

const SettingNavigator = ({ navigation, route }) => {
    const { myAccount, profileUser, setMyAccount } = route.params;
    return (
    <Stack.Navigator>

      <Stack.Screen name="Profile" component={ProfileScreen} initialParams={{
          myAccount: myAccount,
          profileUser: profileUser,
      }} />

      <Stack.Screen name="ProfileSetting" component={ProfileSettingScreen} initialParams={{
          myAccount: myAccount,
          setMyAccount : setMyAccount,
      }} />

        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} initialParams={{
            myAccount: myAccount,
            setMyAccount : setMyAccount,
        }} />
    </Stack.Navigator>
  );
};

export {SettingNavigator};