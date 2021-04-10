import React, {useState} from "react";
import { StyleSheet, View, Button } from "react-native";
import { Input, Icon } from "react-native-elements";

const ProfileSettingScreen = ({navigation, route}) => {
  const { } = route.params;

  
  return (
    <View style={styles.container}>
      <Input
        placeholder="E-mail"
        // onChangeText={input => {
        //   setEmail(input);
        // }}
        leftIcon={<Icon name="email" size={24} color="black" />}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileSettingScreen;
