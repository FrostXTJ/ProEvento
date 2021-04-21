import React, { useState, useEffect, useLayoutEffect} from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { colors } from '../../theme';
import { images } from '../../assets';
import { TwilioService } from '../../services/twilio-service';
import { LoadingOverlay } from '../../components/loading-overlay';
import { useApp } from '../../app-context';
import { sendGroupRequest, createGroup, getAllTags, getGroupsByName} from "../../api/ProEventoAPI";
import {Picker} from '@react-native-picker/picker';
import { routes } from '../MessageScreen';

export function ChatCreateScreen({ route, navigation}) {
  const [channelName, setChannelName] = useState('');
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [tagList, setTagList] = useState([]);
  const [selectedTag, setSelectedTag] = useState(0);
  const { channels, updateChannels } = useApp();
  const { myAccount } = route.params;
  const userId = myAccount.user.id;
  const userName = myAccount.user.username;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate(routes.ChatDirectContact.name,  { myAccount: myAccount})}>
          <Text style={styles.addButtonText}>{'Direct Message'}</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(()=>{
    getAllTags(tags=>{
      setTagList(tags);
    });
  }, []);

  const onAddChannel = (channel) => {
    const newChannel = TwilioService.getInstance().parseChannel(channel);
    updateChannels(channels.concat(newChannel));
  };

  const onCreateOrJoin = () => {
    setLoading(true);
    //create or join a group 
    TwilioService.getInstance()
    .getChatClient()
    .then((client) =>
      client
        .getChannelByUniqueName(channelName)
        .then((channel) => (channel.channelState.status !== 'joined' ? channel.join() : channel))
        .then(onAddChannel)
        .catch(() =>{
            //create new channel 
            const newGroup = {};
            newGroup.name = channelName;
            newGroup.description = description;
            newGroup.avatarUrl = "";
            const tag = {id: selectedTag};
            const founder = {id: userId};
            newGroup.tag = tag;
            newGroup.founder = founder;
            createGroup(newGroup, ()=>{
              client.createChannel({ uniqueName: channelName, friendlyName: channelName }).then((channel) => {
                onAddChannel(channel);
                channel.join();
              });
            });
          }
        ),
    )
    .then(() => showMessage({ message: 'You have joined.' }))
    .catch((err) => showMessage({ message: err.message, type: 'danger' }))
    .finally(() => setLoading(false));

  };

  const tagSlide = tagList.map((tag)=>{
    return <Picker.Item label={tag.name} value={tag.id} key={tag.id}/>
   });

  return (
    <View style={styles.screen}>
      <Image style={styles.logo} source={images.message} />
      <TextInput
        value={channelName}
        onChangeText={setChannelName}
        style={styles.input}
        placeholder="Group Name"
        placeholderTextColor={colors.ghost}
      />

      <TextInput
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        placeholder="Group Description"
        placeholderTextColor={colors.ghost}
      />

      <Picker
        selectedValue={selectedTag}
        style={{ height: 100, width: 150, marginTop: 0}}
        mode="dialog"
        onValueChange={(itemValue, itemIndex) => setSelectedTag(itemValue)}
      >
        {tagSlide}
      </Picker>

      <TouchableOpacity style={styles.button2} onPress={onCreateOrJoin}>
        <Text style={styles.buttonText}>Create a new group</Text>
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
  button1: {
    width: 280,
    height: 50,
    backgroundColor: colors.malibu,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  button2: {
    width: 280,
    height: 50,
    backgroundColor: colors.malibu,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100
  },
  buttonText: {
    fontSize: 17,
    color: colors.white,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    marginRight: 10,
    color: colors.white,
  },
});
