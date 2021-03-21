//Environment Setup
import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet,Image, TouchableOpacity, ImageBackground,Alert} from 'react-native';
import { Text,Header, Icon  } from "react-native-elements";
import { View} from '../components/Themed';
import { ExampleOne } from '../screens/history.js';
import axios from 'axios';
import Video from "react-native-video";


export default function ProfileScreen() {
  //Setup React Native Hook
  const [userId, setUserId] = useState(null); //The null placeholder should contains a user object
  //setUserId should be a function to change userId when switching between owner user and other users
  const [userBio, setUserBio] = useState(null);
   //setUserBio should be a function to change userId when switching between owner user and other users
  const [userStatus, setUserStatus] = useState(null);
   //setUserStatus should be a function to change userId when switching between owner user and other users

  var testId = 1;
  var photo = () => {};    // Accessing User Photo
  var name = () => {};      //Accessing User Name
  var user = null; //If this is the user own page
  var fetch =() =>{}; // tells whether the current use is in the following list
  var follow = 1;       // tells whether the current use is in the following list
  var followLogic = () =>{}; //unfollow or follow the user
  var setLogic = () =>  Alert.alert('You have changed your profile!'); //change user profile

  //Accessing User Information
  useEffect(
  () => {
   axios.get('http://3.133.124.52:8080/api/user?userId=1')
    .then (function (response) {
        //console.log(response['data']);
        var bio = response['data']['biography'].toString();
        setUserBio(bio);
        var stat = response['data']['status'].toString();
        setUserStatus(stat);

    })
    .catch ( function (error) {
        console.log(error);
    });
    }
    );

  //Page Rendering

  return (
    <View style={styles.container}>


     <View style = {styles.container1}>
        <ImageBackground source={require("../assets/images/background.jpeg")} style={styles.imageBackground}>

            <View style = {styles.containerProfile}>

                <Image
                style={styles.avatar}
                source={require("../assets/images/user.jpeg")} />

                <Text
                h4
                h4Style={styles.name}
                style={{}}
                >
                    Yuming Fei
                </Text>
                <Text
                h4
                h4Style={styles.status}
                style={{}}
                >
                   Status : {userStatus}
                </Text>
                <Text
                h4
                h4Style={styles.bio}
                style={{}}
                >
                   Bio:  {userBio}
                </Text>
            </View>

             <View style = {styles.containerSetting}>
            { user ?
                         <TouchableOpacity
                                onPress={followLogic}
                                style={{ backgroundColor: 'orange',borderRadius: 180/2}}>
                                {follow ? <Text>Unfollow</Text> : <Text>follow</Text>}
                         </TouchableOpacity>
                           :

                           <TouchableOpacity
                                  onPress={setLogic}
                                  style={{flexDirection : 'row', backgroundColor: 'orange',borderRadius: 10/2}}>
                                  <Image style={styles.settingStyle} source={require("../assets/images/setting.png")} />
                                  <Text >  Set Your Profile</Text>
                           </TouchableOpacity>

                        }
             </View>
             </ImageBackground>

     </View>




     <View style = {styles.container4}>
        <ExampleOne/>
     </View>

    </View>
  );

}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    },
    containerProfile : {
        top : '20%',
        backgroundColor: 'transparent',
    },
    container1: {
      top : '0%',
      width : '100%',
      height : '50%',
      alignItems: 'center',
    },
    containerSetting: {
      top : '25%',
      alignItems: 'center',
      backgroundColor: 'transparent',

    },
    container4: {
        height : '50%',
        width : '100%',
        top : '0%',
        alignItems: 'center',
    },
    avatar:{
        width:140,
        height:140,
        borderRadius: 70,
        top: 20,
        alignSelf: 'center',
    },
    imageBackground : {
         resizeMode: 'contain',
         width: '100%',
         height: '100%',
    },
    backgroundVideo: {

    },
    settingStyle:{
        width: 20,
        height:20,

    },
    name: {
        color: 'white',
        marginTop: 30,
        alignSelf: 'center',
    },
    status: {
        color: 'white',
        marginTop: 10,
        fontSize : 18,
        alignSelf: 'center',
    },
    bio: {
        color: 'white',
        marginTop: 10,
        fontSize : 18,
        alignSelf: 'center',
    },
    textHeader: {
        color : 'white',
        fontSize : 18,
        right : '30%',
    }

});