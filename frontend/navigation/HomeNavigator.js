import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screen/HomeScreen";
import ProfileScreen from "../screen/ProfileScreen";

const Stack = createStackNavigator();

const HomeNavigator = ({ navigation, route }) => {
    const { myAccount, profileUser, setMyAccount } = route.params;
    return (
        <Stack.Navigator>

            <Stack.Screen name="Home" component={HomeScreen} initialParams={{
                myAccount: myAccount,

            }} />
            <Stack.Screen name="Profile" component={ProfileScreen} initialParams={{
                myAccount: myAccount,
                profileUser: profileUser,
            }} />


        </Stack.Navigator>
    );
};

export {HomeNavigator};