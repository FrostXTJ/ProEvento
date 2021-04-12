import React from "react";
import { StyleSheet, View,ScrollView } from "react-native";
import { Text,Icon, Card, Button } from "react-native-elements";

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

        <View style = {styles.tags}>
            {user.tags.map(tag => (
                <Text key={tag.id} style = {styles.tagB}>{tag.name}</Text>
            ))}
        </View>


      <Text style = {styles.tagH}>Badges Received: </Text>
        <View style = {styles.badges}>
            <ScrollView horizontal={true}>
            <View style = {styles.singleBadge}>
                <Icon style = {styles.badgesBody} name="apple" type="font-awesome" size={20} />
                <Text>{user.badgeFunCount}</Text>
            </View>
            <View style = {styles.singleBadge}>
                <Icon style = {styles.badgesBody} name="bomb" type="font-awesome" size={20} />
                <Text>{user.badgeCoolCount}</Text>
            </View>
            <View style = {styles.singleBadge}>
                <Icon style = {styles.badgesBody} name="bolt" type="font-awesome" size={20} />
                <Text>{user.badgeHelpfulCount}</Text>
            </View>
            <View style = {styles.singleBadge}>
                <Icon style = {styles.badgesBody} name="car" type="font-awesome" size={20} />
                <Text>{user.badgeLovelyCount}</Text>
            </View>
            <View style = {styles.singleBadge}>
                <Icon style = {styles.badgesBody} name="anchor" type="font-awesome" size={20} />
                <Text>{user.badgeCharmingCount}</Text>
            </View>
            <View style = {styles.singleBadge}>
                <Icon style = {styles.badgesBody} name="archive" type="font-awesome" size={20} />
                <Text>{user.badgeAwesomeCount}</Text>
            </View>
            <View style = {styles.singleBadge}>
                <Icon style = {styles.badgesBody} name="ban" type="font-awesome" size={20} />
                <Text>{user.badgeEnergeticCount}</Text>
            </View>
            <View style = {styles.singleBadge}>
                <Icon style = {styles.badgesBody} name="bath" type="font-awesome" size={20} />
                <Text>{user.badgeDullCount}</Text>
            </View>
            <View style = {styles.singleBadge}>
                <Icon style = {styles.badgesBody} name="bell" type="font-awesome" size={20} />
                <Text>{user.badgeRudeCount}</Text>
            </View>
            <View style = {styles.singleBadge}>
                <Icon style = {styles.badgesBody} name="battery-full" type="font-awesome" size={20} />
                <Text>1</Text>
            </View>
            </ScrollView>
        </View>


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
    badges :{
        flex:1,
        flexDirection:'row',
        alignItems: 'flex-end',
        paddingLeft : 10,
    },
    badgesBody : {
        margin:20,
        alignSelf : 'center',
    },
    singleBadge : {
        alignItems : 'center',
    },
    bio : {
        paddingLeft : 10,
        fontSize : 18,
    },
    tagH :{
        fontSize : 18,
        padding : 10,

    },
    tags : {
        flex:1,
        flexDirection:'row',
        alignItems: 'flex-end',
        paddingLeft : 10,
    },
    tagB :{
        fontSize : 18,
        color : 'black',
        fontWeight : 'bold',
        alignSelf : 'center',
        borderRadius : 5,
        overflow: 'hidden',
        backgroundColor: 'orange',
        margin:5,

    },
});
export default UserCard;
