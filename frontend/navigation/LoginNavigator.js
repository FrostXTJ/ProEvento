import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screen/LoginScreen";
import RegisterScreen from "../screen/RegisterScreen";
import onboarding1Screen from "../screen/onboarding1Screen";
import onboarding2Screen from "../screen/onboarding2Screen";
import onboarding3Screen from "../screen/onboarding3Screen";
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
      <Stack.Screen name="onboard1" component={onboarding1Screen} initialParams={{

            }} />
            <Stack.Screen name="onboard2" component={onboarding2Screen} initialParams={{

                  }} />
                  <Stack.Screen name="onboard3" component={onboarding3Screen} initialParams={{

                        }} />
    </Stack.Navigator>
  );
};
