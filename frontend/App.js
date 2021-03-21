import React from "react";
import { useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./navigation/MainNavigator";
import { LoginNavigator } from "./navigation/LoginNavigator";

export default function App() {
  const [myAccount, setMyAccount] = useState(null);
  const [myUse, SetMyUser] = useState(null);

  const appContent =
    myAccount === null ? (
      <LoginNavigator setMyAccount={setMyAccount} />
    ) : (
      <MainNavigator setMyAccount={setMyAccount} />
    );

  console.log(appContent);

  return (
    <NavigationContainer>
      { appContent }
    </NavigationContainer>
  );
}
