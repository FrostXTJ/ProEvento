import * as React from 'react';
import { StyleSheet,Image, TouchableOpacity, ImageBackground} from 'react-native';
import { Text,Header, Icon  } from "react-native-elements";
import { View} from '../components/Themed';
import { ExampleOne } from '../screens/history.js';
export default function ProfileScreen() {

  var photo = () => {};    // Accessing User Photo
  var name = () => {};      //Accessing User Name
  var user = null; //If this is the user own page
  var fetch =() =>{}; // tells whether the current use is in the following list
  var follow = 1;       // tells whether the current use is in the following list
  var followLogic = () =>{}; //unfollow or follow the user
  var setLogic = () =>{}; //change user profile
  var history = () => {}//Accessing User History

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


      <View style = {styles.container3}>
        <Text style = {styles.textHeader}> Attended History </Text>
     </View>

     <View style = {styles.container4}>
        <ExampleOne/>
     </View>

    </View>
  );

}

const settingPage = () => {
  return (
    console.log("change setting")
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
    container3: {
        top : '0%',
        width : '100%',
        alignItems: 'center',
        backgroundColor : 'orange',

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
    settingStyle:{
        width: 20,
        height:20,

    },
    name: {
        color: 'white',
        marginTop: 30,
        alignSelf: 'center',
    },
    textHeader: {
        color : 'white',
        fontSize : 18,
        right : '30%',
    }

});