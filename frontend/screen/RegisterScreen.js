import React, {useEffect, useState} from "react";
import {StyleSheet, View, Button, Text, TouchableOpacity} from "react-native";
import { Input, Icon } from "react-native-elements";
import {
    getFollowers,
    searchUsersByUsername,
    getAllTags,
} from "../api/ProEventoAPI";

const RegisterScreen = ({navigation, route}) => {
  const { setMyAccount } = route.params;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  //Error Message
  const [error1,setError1] = useState(null);
  const [error2,setError2] = useState(null);

  //Tags List
  const [tagList,setTagList] =   useState([]);

  //Get all tags
    useEffect(() => {

        getAllTags(
            success =>{
                setTagList(success);
            },
            failure =>{
                console.log("Retrieve tags failed");
            },
            );
    }, []);

  const searchAndRegister = searchName => {
      searchUsersByUsername(
          searchName,
          found =>{
             setError1("The user name already exists.");
          },
          notFound =>{
              setError1(null);
              if (password != passwordRepeat){
                  setError2("The two passwords do not match, please try again.");
              }else{
                  setError2(null);
                  //register logic
              }
          },
      );
  };
  const onRegister = () => {
    //searchAndRegister(name);
      if (password != passwordRepeat){
          setError2("The two passwords do not match, please try again.");
      }else{
          setError2(null);
          //register logic
      }
  };
  const Email = (<Input
      placeholder="E-mail"
      onChangeText={input => {
          setEmail(input);
      }}
      leftIcon={<Icon name="email" size={24} color="black" />}
  />);

  const username = <Input
      placeholder="Username"
      onChangeText={input => {
          setName(input);
      }}
      leftIcon={<Icon name="people" size={24} color="black" />}
  />

    const pass = <Input
        secureTextEntry={true}
        placeholder="Password"
        onChangeText={input => {
            setPassword(input);
        }}
        leftIcon={<Icon name="lock" size={24} color="black" />}
    />

    const confirmPass = <Input
        secureTextEntry={true}
        placeholder="Confirm your password"
        onChangeText={input => {
            setPasswordRepeat(input);
        }}
        leftIcon={<Icon name="lock" size={24} color="black" />}
    />

  return (
    <View style={styles.container}>
        <View style = {styles.container1}>
            {Email}
            {username}
            {pass}
            {confirmPass}
            <Text style = {styles.text1}>
                {error1}
            </Text>
            <Text style = {styles.text1}>
                {error2}
            </Text>
        </View>


        <TouchableOpacity
            style = {styles.button}
            onPress={() => {
                onRegister();
            }
            } //newly added
        >
            <Text style = {styles.text}>Register now</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",

  },
  container1 : {
        width : '100%',
        paddingTop: '10%',
      alignItems: "center",
  },
    button :{
        backgroundColor: "orange",
        alignItems: "center",
        padding: 10,

    },
    text1 : {
        color : 'red',
        alignItems: "center",
        padding: 10,
    },
});

export default RegisterScreen;
