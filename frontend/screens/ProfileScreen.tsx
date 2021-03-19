import * as React from 'react';
import { StyleSheet,Image, TouchableWithoutFeedback} from 'react-native';
import { Text } from "react-native-elements";
import { View} from '../components/Themed';

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
      <Image 
        style={styles.avatar}
        source={require("../assets/images/avatar.png")} />
      <Text
        h4
        h4Style={styles.name}
        style={{}}
      >
      Yifan Zhuang
      </Text>

      {/* <Image 
        style={styles.settingStyle}
        onPress={() => console.log("onPress()")}
        source={require("../assets/images/setting.png")}
      /> */}

    <TouchableWithoutFeedback onPress={() => settingPage()}>
      <Image style={styles.settingStyle} source={require("../assets/images/setting.png")} />
    </TouchableWithoutFeedback>

      {/* <Button
        buttonStyle={styles.settingStyle}
        containerStyle={{ margin: 5 }}
          loadingProps={{ animating: false }}
        loadingStyle={{}}
        onPress={() => alert("click")} //will change later
        title="Settings"
        titleStyle={{ marginHorizontal: 5 }}
      /> */}
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
  avatar:{
    width:140,
    height:140,
    borderRadius: 70,
    top: 20,
    alignSelf: 'center',
  },
  settingStyle:{
    width: 20,
    height:20,
    top:20,
    left:290
    
  },
  name: {
    color: '#FF9999',
    marginTop: 30,
    alignSelf: 'center',
  }
});
