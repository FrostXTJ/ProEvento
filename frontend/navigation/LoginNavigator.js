import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screen/LoginScreen";
import RegisterScreen from "../screen/RegisterScreen";

const Stack = createStackNavigator();

export const LoginNavigator = props => {
  const { setMyAccount } = props;

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login">
        {props => <LoginScreen {...props} setMyAccount={setMyAccount} />}
      </Stack.Screen>
      <Stack.Screen name="Register">
        {props => <RegisterScreen {...props} setMyAccount={setMyAccount} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
