import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  testConnection,
  login,
  register,
  searchUserById,
  searchUsersByUsername,
  getFollowers,
  getFollowing,
  follow,
  unfollow,
  getAllTags,
  getAllEvents,
  searchEventById,
  searchEventsByName,
} from "../api/ProEventoAPI";

const TestScreen = ({navigation, route}) => {
  const [ testMsg, setTestMsg ] = useState("");
  const [channelName, setChannelName] = useState('');

  const { myAccount, setMyAccount } = route.params;

  const onTestConnection = () => {
    testConnection(
      data => {
        console.log(data), setTestMsg(data);
      },
      err => {
        console.log(err);
        setTestMsg("Failed to connect to server.");
      }
    );
  };

  const onTestLogin = () => {
    const testAccount = {
      email: "tommy@usc.edu",
      password: "uscfighton!",
    };
    login(testAccount, account => {
      console.log(account), setTestMsg(account.user.username);
    });
  };

  const onTestRegister = () => {
    const testAccount = {
      email: "shannon@mail.com",
      password: "infotheory",
      user: {
        username: "Shannon",
        biography: "A Mathematical Theorist of Cryptography.",
        avatarUrl: "",
        enableNotifications: true,
        tags: [{ id: 4 }],
      },
    };
    register(testAccount, account => {
      console.log(account);
      setTestMsg(account.user.username);
    });
  };

  const onTestSearchUserById = () => {
    searchUserById(1, user => {
      if (user !== null) {
        console.log(user);
        setTestMsg(user.username);
      }
    });
  };

  const onTestSearchUsersByUsername = () => {
    searchUsersByUsername("T", userList => {
      console.log(userList);
      let msg = "";
      userList.forEach(user => {
        msg += user.username + "\n";
      });
      setTestMsg(msg);
    });
  };

  const onTestGetFollowers = () => {
    getFollowers(1, userList => {
      console.log(userList);
      let msg = "";
      userList.forEach(user => {
        msg += user.username + "\n";
      });
      setTestMsg(msg);
    });
  };

  const onTestGetFollowing = () => {
    getFollowing(1, userList => {
      console.log(userList);
      let msg = "";
      userList.forEach(user => {
        msg += user.username + "\n";
      });
      setTestMsg(msg);
    });
  };

  const onTestFollow = () => {
    const body = {
      followerId: 1,
      followeeId: 2,
    };
    follow(body, response => {
      setTestMsg(response);
    });
  };

  const onTestUnfollow = () => {
    const body = {
      followerId: 1,
      followeeId: 2,
    };
    unfollow(body, response => {
      setTestMsg(response);
    });
  };

  const onTestGetAllTags = () => {
    getAllTags(tags => {
      console.log(tags);
      let msg = "";
      tags.forEach(tag => {
        msg += tag.name + "\n";
      });
      setTestMsg(msg);
    });
  };

  const onTestGetAllEvents = () => {
    getAllEvents(eventList => {
      console.log(eventList);
      let msg = "";
      eventList.forEach(event => {
        msg += event.name + "\n";
      });
      setTestMsg(msg);
    });
  };

  const onTestSearchEventById = () => {
    searchEventById(1, event => {
      if (event !== null) {
        console.log(event);
        setTestMsg(event.name);
      }
    });
  };

  const onTestSearchEventsByName = () => {
    searchEventsByName("CSCI", eventList => {
      console.log(eventList);
      let msg = "";
      eventList.forEach(event => {
        msg += event.name + "\n";
      });
      setTestMsg(msg);
    });
  };

  const onTestUserTwoProfile = () => {
    searchUserById(2, userTwo => {
      navigation.navigate("Profile", {
        myAccount: myAccount,
        profileUser: userTwo
      })
    })
  };

  const onLogout = () => {
    setMyAccount(null);
  };

  return (
    <View style={styles.container}>
      <Text>{testMsg}</Text>
      <Button title="Test Connection" onPress={onTestConnection} />
      <Button title="Test Login" onPress={onTestLogin} />
      <Button
        title="Test Register (One-Timed)"
        onPress={onTestRegister}
        disabled
      />
      <Button title="Test Search User 1" onPress={onTestSearchUserById} />
      <Button
        title="Test Search Users 'T'"
        onPress={onTestSearchUsersByUsername}
      />
      <Button
        title="Test Get User 1's Followers"
        onPress={onTestGetFollowers}
      />
      <Button
        title="Test Get User 1's Following"
        onPress={onTestGetFollowing}
      />
      <Button title="Test User 1 Follows User 2" onPress={onTestFollow} />
      <Button title="Test User 1 Unfollows User 2" onPress={onTestUnfollow} />
      <Button title="Test Get All Tags" onPress={onTestGetAllTags} />
      <Button title="Test Get All Events" onPress={onTestGetAllEvents} />
      <Button title="Test Search Event 1" onPress={onTestSearchEventById} />
      <Button
        title="Test Search Event 'CSCI'"
        onPress={onTestSearchEventsByName}
      />
      <Button title="See User 2 Profile" onPress={onTestUserTwoProfile} />
      <Button title="Logout" onPress={onLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TestScreen;
