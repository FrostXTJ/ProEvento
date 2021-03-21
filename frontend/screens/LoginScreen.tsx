import * as React from 'react';
import {useState} from 'react';
import {StatusBar} from 'expo-status-bar'
import { StyleSheet, SafeAreaView, View, TextStyle, TextInput, Pressable, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Text } from '../components/Themed';


export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const LoginAuthentication = (email:String, password:String) => {

    
    if (email == null || email.trim().length == 0){

      alert("Please enter your email or phone number");
      return;
    }
    if (password == null || password.trim().length == 0){

      alert("Please enter your password");
      return;
    }
    fetch("http://3.133.124.52:8080/api/account/login", {

      method: "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({

        "email" : email,
        "password" : password,
        
      })

    }).then((response) => {

      if (response.status == 200){

        alert("Login suceed");
        sessionStorage.setItem("user", JSON.stringify(response));
      }
      else{

        alert("Login failed");
      }
    }).catch((error) => {
      alert(error);
    })
  }
  
  return (
    <SafeAreaView style={styles.container}>
        <Image style={styles.image} source={require("../assets/images/logo.png")}></Image>

        <StatusBar style="auto" />
        <View style={styles.form}>
          <TextInput style={styles.input}
           placeholder="Username"
           placeholderTextColor="#003f5c"
           onChangeText={(email) => setEmail(email)}>
          </TextInput>
        </View>

        <View style= {styles.form}>
          <TextInput style={styles.input}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText = {(password) => setPassword(password)}
          >
          </TextInput>
        </View>

        <View style={{marginTop:30}}></View>

        
        
          
        

        
    <View style={styles.row}>
      <View style={styles.row1}> 
        <TouchableOpacity style={styles.button} 
          onPress = {() => {
            LoginAuthentication(email, password);
          }}>
          <Text style={{fontSize: 20}}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.row}>

    </View>
        
        
        
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    
  },
  image:{
    marginBottom: 30
  },
  form:{
    backgroundColor: "#ffc0cb",
    borderRadius: 30,
    width: "70%",
    height: 60,
    marginBottom: 20,
    alignItems: "center"
  },
  input:{
    height: 50,
    flex: 1,
    padding: 15,
    marginLeft: 15,
    fontSize: 20
  },
  button:{
    
    alignItems: "center",
    backgroundColor: "skyblue",
    padding:15,
    borderRadius: 25,
    height: 60,
    width: "100%"
  },
  row:{
    width: "100%",
    justifyContent: "center",
    alignItems : "center"
  },
  row1:{
    width: "70%"
    
  }
  
});