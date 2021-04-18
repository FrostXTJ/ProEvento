import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { colors } from '../../theme';
import { images } from '../../assets';
import { TwilioService } from '../../services/twilio-service';
import { LoadingOverlay } from '../../components/loading-overlay';
import { useApp } from '../../app-context';
import { sendGroupRequest, createGroup, getAllTags, getGroupsByName} from "../../api/ProEventoAPI";
import {Picker} from '@react-native-picker/picker';

export function ChatCreateScreen({ navigation, route }) {
  const [channelName, setChannelName] = useState('');
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [tagList, setTagList] = useState([]);
  const [selectedTag, setSelectedTag] = useState(0);
  const { channels, updateChannels } = useApp();
  const { myAccount } = route.params;
  const userId = myAccount.user.id;
  const userName = myAccount.user.username;

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

  const onSendRequest = () =>{
    //send request to group owner 
    const request = {};
    getGroupsByName (channelName, (groups)=> {
      const userGroup = {id: groups[0].id};
      request.userGroup = userGroup;
      const receivers = [{id: groups[0].founder.id}]
      request.receivers = receivers;

      Number.prototype.padLeft = function(base,chr){
        var  len = (String(base || 10).length - String(this).length)+1;
        return len > 0? new Array(len).join(chr || '0')+this : this;
      }
      var d = new Date,
      dformat = [d.getFullYear(),
                 (d.getMonth()+1).padLeft(),
                 d.getDate().padLeft()
                 ].join('/') +' ' +
                [d.getHours().padLeft(),
                 d.getMinutes().padLeft(),
                 d.getSeconds().padLeft()].join(':');
      request.dateTime = dformat;
      const content = `${userName} wants to join ${channelName}`;
      request.content = content;
      const sender = {id: userId};
      request.sender = sender;

      console.log(request);

      sendGroupRequest(request, ()=>{
        showMessage({ message: 'You have requested to join the group' })
      });
    });
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
      <TouchableOpacity style={styles.button1} onPress={onSendRequest}>
        <Text style={styles.buttonText}>Request to Join</Text>
      </TouchableOpacity>

      <TextInput
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        placeholder="Group Description"
        placeholderTextColor={colors.ghost}
      />

      <Picker
        selectedValue={selectedTag}
        style={{ height: 50, width: 150 }}
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
    marginTop: 32,
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
});
