import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StreamingScreen from "../screen/StreamingScreen";
import EventCreationScreen from "../screen/EventCreationScreen";
const Stack = createStackNavigator();

const StreamingNavigator = ({ navigation, route }) => {
  const { myAccount} = route.params;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Streaming"
        component={StreamingScreen}
        initialParams={{
          myAccount: myAccount,
        }}
      />

      <Stack.Screen
        name="EventCreation"
        component={EventCreationScreen}
        initialParams={{
          myAccount: myAccount,
        }}
      />
    </Stack.Navigator>
  );
};

export { StreamingNavigator };
