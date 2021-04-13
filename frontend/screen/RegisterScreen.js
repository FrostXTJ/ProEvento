import React, {useEffect, useState} from "react";
import {StyleSheet, View, Button, Text, TouchableOpacity,ScrollView } from "react-native";
import {Input, Icon, Divider} from "react-native-elements";
import {
    getFollowers,
    searchUsersByUsername,
    getAllTags,
    register,
} from "../api/ProEventoAPI";

const RegisterScreen = ({navigation, route}) => {
  const { setMyAccount } = route.params;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");


  //Error Message
  const [error1,setError1] = useState(null);
  const [error2,setError2] = useState(null);

  //Tags List
  const [tagList,setTagList] =   useState([]);

  //Tags State
    const [tag1,setTag1] = useState(false);
    const [tag2,setTag2] = useState(false);
    const [tag3,setTag3] = useState(false);
    const [tag4,setTag4] = useState(false);
    const [tag5,setTag5] = useState(false);
    const [tag6,setTag6] = useState(false);
    const [tag7,setTag7] = useState(false);
    const [tag8,setTag8] = useState(false);
    const [tag9,setTag9] = useState(false);
    const [tag10,setTag10] = useState(false);
    const [tag11,setTag11] = useState(false);
    const [tag12,setTag12] = useState(false);
    const [tag13,setTag13] = useState(false);
    const [tag14,setTag14] = useState(false);
    const [tag15,setTag15] = useState(false);
    const [tag16,setTag16] = useState(false);
    const [tag17,setTag17] = useState(false);
    const [tag18,setTag18] = useState(false);
    const [tag19,setTag19] = useState(false);
    const [tag20,setTag20] = useState(false);
    const [tag21,setTag21] = useState(false);

    var l = [0,tag1,tag2,tag3,tag4,tag5,tag6,tag7,tag8,tag9,tag10,tag11,tag12,tag13,
    tag14,tag15,tag16,tag17,tag18,tag19,tag20,tag21];

  //User Tag List
    const [userTagList,setUserTagList] =   useState([]);
  //Get all tags
    useEffect(() => {

        getAllTags(
            success =>{
                setTagList(success);
            },
            failure =>{
                console.log("Retrieve tags failed");
            },
            );
    }, [setMyAccount]);

    //Tag State

  const searchAndRegister = searchName => {
      searchUsersByUsername(
          searchName,
          found =>{
              if (found.length > 0){
                  setError1("The user name already exists.");
              }else{
                  setError1(null);
              }
          },
          notFound =>{
              console.log("API Fails");
          },
      );
  };
  const onRegister = () => {
    searchAndRegister(name);
      if (password != passwordRepeat){
          setError2("The two passwords do not match, please try again.");
      }else{
          setError2(null);
          //register logic
          if (name != null && password != null && passwordRepeat != null){
              register({
                      email : email,
                      password : password,
                      user : {
                          username :name,
                          enableNotifications: true,
                          tags: userTagList
                      }
                  },
                  success => {
                      setMyAccount(success);
                  });
          }
      }
  };

  const tapTag = id => {
      if (id == 1) setTag1(!tag1);
      if (id == 2) setTag2(!tag2);
      if (id == 3) setTag3(!tag3);
      if (id == 4) setTag4(!tag4);
      if (id == 5) setTag5(!tag5);
      if (id == 6) setTag6(!tag6);
      if (id == 7) setTag7(!tag7);
      if (id == 8) setTag8(!tag8);
      if (id == 9) setTag9(!tag9);
      if (id == 10) setTag10(!tag10);
      if (id == 11) setTag11(!tag11);
      if (id == 12) setTag12(!tag12);
      if (id == 13) setTag13(!tag13);
      if (id == 14) setTag14(!tag14);
      if (id == 15) setTag15(!tag15);
      if (id == 16) setTag16(!tag16);
      if (id == 17) setTag17(!tag17);
      if (id == 18) setTag18(!tag18);
      if (id == 19) setTag19(!tag19);
      if (id == 20) setTag20(!tag20);
      if (id == 21) setTag21(!tag21);


  };

  const handleAdd = tag => {
      const newList = userTagList.concat(tag);
      setUserTagList(newList);
  }
    const handleRemove = tag => {

        const newList = userTagList.filter(item => item.id != tag.id);
        setUserTagList(newList);
    }

  const Email = (<Input
      placeholder="E-mail"
      onChangeText={input => {
          setEmail(input);
      }}
      leftIcon={<Icon name="email" size={24} color="black" />}
  />);

  const username = <Input
      placeholder="Username"
      onChangeText={input => {
          setName(input);
      }}

      leftIcon={<Icon name="people" size={24} color="black" />}
  />

    const pass = <Input
        secureTextEntry={true}
        placeholder="Password"
        onChangeText={input => {
            setPassword(input);
        }}
        leftIcon={<Icon name="lock" size={24} color="black" />}
    />

    const confirmPass = <Input
        secureTextEntry={true}
        placeholder="Confirm your password"
        onChangeText={input => {
            setPasswordRepeat(input);
        }}
        leftIcon={<Icon name="lock" size={24} color="black" />}
    />



  return (
    <View style={styles.container}>
        <View style = {styles.container1}>
            {Email}
            {username}
            {pass}
            {confirmPass}
            <Text style = {styles.text1}>
                {error1}
            </Text>
            <Text style = {styles.text1}>
                {error2}
            </Text>
        </View>


        <TouchableOpacity
            style = {styles.button}
            onPress={() => {
                onRegister();
            }
            } //newly added
        >
            <Text style = {styles.text2}>Register now</Text>
        </TouchableOpacity>

        <Divider height={20} backgroundColor="white" />
        <View style = {styles.container3}>

        <ScrollView>
        <View style = {styles.container2}>


            {tagList.map(tag => (
                <TouchableOpacity
                    key ={tag.id}
                    style = {styles.button1}
                    onPress={() => {
                        tapTag(tag.id);
                        if (l[tag.id]){
                            handleRemove(tag);
                        }else{
                            handleAdd(tag);
                        }
                    }
                    }
                >
                    <View style = {styles.tag}>
                        <Text style = {styles.text3}>{tag.name}</Text>
                        {l[tag.id] ? <Icon name="check" type="font-awesome" size={20} /> : null}
                    </View>

                </TouchableOpacity>
            ))}

        </View>
        </ScrollView>
            {userTagList.length == 0 ?  <Text style = {styles.text4}>You've choosen 0 tag</Text> :
                <Text style = {styles.text4}>You've choosen {userTagList.length} tags</Text>
            }
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
    tag : {
        flex: 1,
        flexDirection : 'row',
        alignItems: "center",
        justifyContent : 'space-between',
        paddingLeft : 10,
    },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",

  },
  container1 : {
        width : '100%',
        paddingTop: '10%',
      alignItems: "center",
  },
    container2 :{
        width : '100%',
        flexDirection : 'column',
        paddingHorizontal: '15%',
        alignItems: "center",
    },
    container3 :{
        width : '100%',
        height: '40%',

    },
    button :{
        backgroundColor: "orange",
        alignItems: "center",
        padding: 10,
        borderRadius : 5,

    },
    button1 :{
        backgroundColor: "white",

        padding: 10,
        borderRadius : 10,
        borderWidth : 1,
        margin : 10,
        borderColor : 'black',
        width : '100%',
    },
    text4 : {
        alignSelf: 'center',
    },
    text3 : {
        fontSize : 13,
        color : 'black',
        fontWeight : 'bold',
        alignSelf : 'center',

        overflow: 'hidden',
        margin:5,

    },
    text2 : {
        color : 'white',
        fontWeight : 'bold',
    },
    text1 : {
        color : 'red',
        alignItems: "center",
        padding: 5,
    },
});

export default RegisterScreen;
