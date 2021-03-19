import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {ScrollView, ImageBackground, Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import ExampleOne from "./history.js";
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function userPage() {
  var photo = () => {};    // Accessing User Photo
  var name = () => {};      //Accessing User Name
      var user = null; //If this is the user own page
  var fetch =() =>{}; // tells whether the current use is in the following list
  var follow = 1;       // tells whether the current use is in the following list
  var followLogic = () =>{}; //unfollow or follow the user
  var setLogic = () =>{}; //change user profile
  var history = () => {}//Accessing User History

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
      <View style={styles.container}>

    <View style = {styles.container1}>

            <Image source={require('./assets/user.jpeg')}
                           style={styles.image} />
            <Text style = {styles.text}>Yuming Fei</Text>

    </View>

    <View style = {styles.container2}>

            { user ?
             <TouchableOpacity
                    onPress={followLogic}
                    style={{ backgroundColor: 'orange',borderRadius: 180/2}}>
                    {follow ? <Text>Unfollow</Text> : <Text>follow</Text>}
             </TouchableOpacity>
               :
               <TouchableOpacity
                      onPress={setLogic}
                      style={{ backgroundColor: 'orange',borderRadius: 180/2}}>
                      <Text>Set Your Profile</Text>
               </TouchableOpacity>
            }


     </View>

     <View style = {styles.container3}>
            <Text style = {styles.textHeader}> Attended History </Text>
     </View>

     <View style = {styles.container4}>

               <ExampleOne/>

     </View>


      <StatusBar style="auto" />
    </View>

    );
  }
}

const styles = StyleSheet.create({
  container:  {
    height : '100%',
    width : '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    bottom : '20%',
    alignItems: 'center',
  },
  container2: {
     bottom : '15%',
     alignItems: 'center',
    },
  container3: {
      bottom : '10%',
      alignItems: 'center',
  },
  container4: {
        height : '20%',
        width : '100%',
        bottom : '5%',
       alignItems: 'center',
    },

  image: {
    width: 150,
    height: 150,
    borderRadius: 180/2,
  },
  text: {
    fontSize : 24,
    top : '10%',
    color: 'orange',
  },
  textHeader: {
      fontSize : 24,
      top : '20%',
      right : '20%',
    }
});
