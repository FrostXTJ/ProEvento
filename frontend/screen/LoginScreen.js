import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import { Input, Icon } from "react-native-elements";
import { login } from "../api/ProEventoAPI";

const LoginScreen = ({ navigation, route }) => {
  const { setMyAccount } = route.params;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = credential => {
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

  // TODO Delete this
  const fakeLogin = () => {
    const credential = {
      email: "tommy@usc.edu",
      password: "uscfighton!",
    };
    login(
      credential,
      account => {
        setMyAccount(account);
      },
      error => {
        setMyAccount(null);
      }
    );
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="E-mail"
        onChangeText={input => {
          setEmail(input);
        }}
        leftIcon={<Icon name="email" size={24} color="black" />}
      />
      <Input
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={input => {
          setPassword(input);
        }}
        leftIcon={<Icon name="lock" size={24} color="black" />}
      />
      <Button
        title="Log in"
        onPress={() => {
          // TODO Delete this
           fakeLogin();
          //onLogin({ email: email, password: password });
        }}
      />
      <Button
        title="Sign up a new account"
        onPress={() => navigation.navigate("onboard1")}
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
