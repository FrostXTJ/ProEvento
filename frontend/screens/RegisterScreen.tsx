import * as React from 'react';
import {useState} from 'react';
import {StatusBar} from 'expo-status-bar'
import { StyleSheet, SafeAreaView, View, ScrollView, TextInput, Pressable, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Text } from '../components/Themed';


export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  return (
    <ScrollView>
      <SafeAreaView style = {styles.container}>
          <Image style={styles.image} source={require("../assets/images/logo.png")}></Image>
          
          <StatusBar style="auto" />
          <View style={styles.form}>
            <TextInput style={styles.input}
            placeholder="Username"
            placeholderTextColor="#003f5c"
            onChangeText={(username) => setUsername(username)}>
            </TextInput>
          </View>

          <View style={styles.form}>
            <TextInput style={styles.input}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}>
            </TextInput>
          </View>

          <View style={styles.form}>
            <TextInput style={styles.input}
            placeholder="Firstname"
            placeholderTextColor="#003f5c"
            onChangeText={(firstname) => setFirstname(firstname)}>
            </TextInput>
          </View>

          <View style={styles.form}>
            <TextInput style={styles.input}
            placeholder="Lastname"
            placeholderTextColor="#003f5c"
            onChangeText={(lastname) => setLastname(lastname)}>
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
              alert("Register clicked")
            }}>
            <Text style={{fontSize: 20}}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.row}>

      </View>
        
        
    </SafeAreaView>   
    </ScrollView>
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