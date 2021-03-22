import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { login } from "../api/ProEventoAPI";

const LoginScreen = props => {

  const { navigation, setMyAccount } = props;
  const fakeLogin = () => {
    const credential = {
      email: "alanturing@mail.com",
      password: "helloworld123",
    };
    login(
      credential,
      account => {
        setMyAccount(account);
      },
      error => {
        console.log(error);
        setMyAccount(null);
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Log in" onPress={fakeLogin} />
      <Button
        title="Sign up a new account"
        onPress={() => navigation.navigate("Register")}
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

export default LoginScreen;
