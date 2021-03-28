import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screen/LoginScreen";
import RegisterScreen from "../screen/RegisterScreen";

const Stack = createStackNavigator();

export const LoginNavigator = props => {
  const { setMyAccount } = props;

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} initialParams={{
        setMyAccount: setMyAccount
      }} />
      <Stack.Screen name="Register" component={RegisterScreen} initialParams={{
        setMyAccount: setMyAccount
      }} />
    </Stack.Navigator>
  );
};
