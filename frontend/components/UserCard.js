import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Card, Button } from "react-native-elements";

const UserCard = props => {
  const { user, navigation, children } = props;
  return (
    <Card>
      {/*<Card.Title>{user.username}</Card.Title>*/}
        <Button
            title={`${user.username}`}
            type="clear"
            onPress={() =>
                navigation.navigate("Profile", {
                    profileUser: user,
                })
            }
        ></Button>
      <Text style = {styles.bio}>Bio:  {user.biography}</Text>
      {children}
      <Text style = {styles.tagH}>Tags: </Text>
      {user.tags.map(tag => (

            <Text key={tag.id} style = {styles.tagB}>{tag.name}</Text>

      ))}
    </Card>
  );
};
const styles = StyleSheet.create({
    card: {
        flex: 1,
        width: "80%",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    bio : {

        fontSize : 18,
    },
    tagH :{
        fontSize : 18,

    },
    tagB :{
        fontSize : 18,
        fontWeight : 'bold',
        paddingLeft:'40%',

    },
});
export default UserCard;
