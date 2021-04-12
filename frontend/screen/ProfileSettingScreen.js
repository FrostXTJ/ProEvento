import React, {useState} from "react";
import { StyleSheet, View, Text,Button,TouchableOpacity,ScrollView} from "react-native";
import { Divider,Input, Icon } from "react-native-elements";

const ProfileSettingScreen = ({navigation, route}) => {
  const {myAccount, profileUser,setMyAccount} = route.params;
    const onLogout = () => {
        setMyAccount(null);
    };
    const deactivate = () => {

    }; //account deactivation logic
  return (

    <View style={styles.container}>

        <TouchableOpacity
            style = {styles.button}
        >
            <View  style = {styles.setting}>
                <Text style = {styles.text}>Change Email Address</Text>
                <View  style = {styles.icon}>
                    <Icon name="chevron-right" size={40} color="orange" />
                </View>
            </View>
        </TouchableOpacity>
        <Divider style={{ width: "100%", margin: 1 }} />

        <TouchableOpacity
            style = {styles.button}
            //newly added
        >
            <View  style = {styles.setting}>

                <Text style = {styles.text}>Change Username</Text>
                <Icon name="chevron-right" size={40} color="orange" />
            </View>
        </TouchableOpacity>
        <Divider style={{ width: "100%", margin: 1 }} />

      <TouchableOpacity
              style = {styles.button}
              onPress={() => navigation.navigate("ChangePassword", {
              })} //newly added
      >
          <View  style = {styles.setting}>

              <Text style = {styles.text}>Change Password</Text>
              <Icon name="chevron-right" size={40} color="orange" />
          </View>
      </TouchableOpacity>

        <Divider style={{ width: "100%", margin: 1 }} />
        <TouchableOpacity
            style = {styles.button}
            //newly added
        >
            <View  style = {styles.setting}>

                <Text style = {styles.text}>Reset Password</Text>
                <Icon name="chevron-right" size={40} color="orange" />
            </View>
        </TouchableOpacity>

        <Divider style={{ width: "100%", margin: 1 }} />
      <TouchableOpacity
          style = {styles.button}
        onPress={onLogout}
        >
          <View  style = {styles.setting}>

              <Text style = {styles.text}>Log Out</Text>
              <Icon name="chevron-right" size={40} color="orange" />
          </View>
      </TouchableOpacity>

        <Divider style={{ width: "100%", margin: 1 }} />
        <TouchableOpacity
            style = {styles.button}
            onPress={deactivate}
        >
            <View  style = {styles.setting}>

                <Text style = {styles.text}>Deactivate</Text>
                <Icon name="chevron-right" size={40} color="orange" />
            </View>
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
    button: {
        backgroundColor: "#fff",
        width : '100%',
        height : '10%',
    },
    text : {
        color : 'grey',
        alignItems: "center",
        padding : 20,
        fontSize : 20,
    },
    setting : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

});

export default ProfileSettingScreen;
