import React, {useState} from "react";
import { StyleSheet, View, Button, Component } from "react-native";
import { Input, Icon } from "react-native-elements";
import CustomMultiPicker from "react-native-multiple-select-list";
import { register } from "../api/ProEventoAPI";

const RegisterScreen = ({navigation, route}) => {
  const { setMyAccount } = route.params;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  let selectedTags = [];
  const onRegister = credential => {
    //TODO
    register(credential, account => {setMyAccount(account)}, error => {console.log(error);setMyAccount(null)});
  };

  const userList= {
    1:"Academics",
    2:"Sports",
    3:"Music",
    4:"Video Game",
    5:"Food & Cooking",
    6:"Coding & Programming",
    7:"Health",
    8:"Traveling",
    9:"History",
    10:"Politics",
    11:"Philosophy",
    12:"Technology",
    13:"Shopping",
    14:"Clothing",
    15:"Shoes",
    16:"Cars",
    17:"Planes & Jets",
    18:"Finance",
    19:"Job Seeking",
    20:"Others"
  };

  
  let selected = [];

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
      

      <View style={{width: "90%"}}>
        <CustomMultiPicker
          options={userList}
          search={true} // should show search bar?
          multiple={true} //
          placeholder={"Add Your Tag!"}
          placeholderTextColor={'#757575'}
          returnValue={"value"} // label or value
          callback={(res)=>{ selectedTags = res; console.log(selectedTags);}} // callback, array of selected items
          rowBackgroundColor={"#eee"}
          rowHeight={40}
          rowRadius={5}
          searchIconName="ios-checkmark"
          searchIconColor="red"
          searchIconSize={30}
          iconColor={"#00a2dd"}
          iconSize={30}
          selectedIconName={"ios-checkmark-circle-outline"}
          unselectedIconName={"ios-radio-button-off-outline"}
          scrollViewHeight={130}
          selected={[]} // list of options which are selected by default
        />
      </View>
      

      <Button
        title="Sign Up"
        onPress={() => {
          //TODO
          onRegister({email: email, password: password, user: {
            username: email, 
            tags: selected
          }});
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
