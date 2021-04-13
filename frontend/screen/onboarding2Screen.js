import React, {useEffect, useState} from "react";
import {StyleSheet, View, Button, Text, TouchableOpacity,ScrollView ,ImageBackground} from "react-native";
import { Input, Icon } from "react-native-elements";

const onboarding2Screen = ({navigation}) => {
    return (
        <View style = {styles.container}>
        <ImageBackground source={require("../assets/background.jpeg")} style={styles.imageBackground}>
            <View style = {styles.container1}>
                <Text style = {styles.header}>With Proevento !</Text>

                <Text style = {styles.text1}>-  You can broadcast live media</Text>
                <Text style = {styles.text1}>- You can explore live events </Text>
                <Text style = {styles.text1}>- You can expand your social network while streaming</Text>

            </View>
            <View style = {styles.container2}>
             <TouchableOpacity
            onPress={() => {
                navigation.navigate("onboard3");
            }
            } //newly added
            >
            <View style = {styles.button}>
                <Text style = {styles.body}>Tap here to continue..</Text>
                <Icon  name="arrow-right"  color = "orange" type="font-awesome" size={60} />
            </View>
            </TouchableOpacity>
            </View>
            </ImageBackground>
        </View>
    );
};
const styles = StyleSheet.create({
  container: {
    width:'100%',
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header : {
    fontSize : 40,
    fontWeight : 'bold',
    color : 'white',
  },
  button : {
    flex : 1,
    flexDirection : 'row',
    alignItems : 'center',

  },
  body : {
    fontWeight : 'bold',
    color : 'white',
    margin : 5,
  },
  imageBackground : {
           resizeMode: 'contain',
           width: '100%',
           height: '100%',
      },

  container1 : {
      flex : 1,
      width : '100%',
      alignItems: "center",
      paddingTop : '40%',
      padding:10,

  },
  container2: {
     flex : 1,
           width : '100%',
           alignItems: "center",
           paddingTop : '40%',
           padding:10,
  },
  text1 : {
      width:'100%',
      color : 'white',
      fontSize : 20,
      backgroundColor : 'orange',
      borderWidth : 0.1,
      borderRadius : 20,
      overflow : 'hidden',
      fontWeight : 'bold',
      padding : 10,
      margin:30,
  },

});
export default onboarding2Screen;
