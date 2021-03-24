import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { Input, Icon } from "react-native-elements";

const RegisterScreen = ({navigation, route}) => {
  const { setMyAccount } = route.params;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const onRegister = credential => {
    //TODO
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
        title="Sign Up"
        onPress={() => {
          //TODO
        }}
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

export default RegisterScreen;
