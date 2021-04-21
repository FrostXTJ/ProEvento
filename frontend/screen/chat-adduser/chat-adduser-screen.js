import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { colors } from '../../theme';
import { images } from '../../assets';
import { LoadingOverlay } from '../../components/loading-overlay';
import { searchUsersByUsername, getGroupsByName, addUserToGroup} from "../../api/ProEventoAPI";


export function ChatAddUserScreen({ route }) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const { myAccount, channelName} = route.params;
 const onAddUser = ()=>{
    if (username == "")
    {
        showMessage({ message: 'Please enter a user name' });
    }
    else
    {
        searchUsersByUsername(username, users=>{
            const userId = users[0].id;
            getGroupsByName(channelName, groups=>{
               const groupId = groups[0].id;
               const body = {userId: userId, groupId:groupId};
               console.log(body);
               addUserToGroup(body, ()=>{
                showMessage({ message: 'Successfully added user' });
               })
            });
        });
    }
 }

  return (
    <View style={styles.screen}>
      <Image style={styles.logo} source={images.message} />
      <TextInput
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        placeholder="Enter a user name"
        placeholderTextColor={colors.ghost}
      />

      <TouchableOpacity style={styles.button} onPress={()=>{
          onAddUser();
      }}>
        <Text style={styles.buttonText}>{`Add user to ${channelName}`}</Text>
      </TouchableOpacity>
      {loading && <LoadingOverlay />}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.whisper,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 32,
  },
  input: {
    width: 280,
    height: 50,
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.eclipse,
    marginTop: 20,
    marginBottom: 16,
  },
  button: {
    width: 280,
    height: 50,
    backgroundColor: colors.malibu,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  buttonText: {
    fontSize: 17,
    color: colors.white,
  },
});