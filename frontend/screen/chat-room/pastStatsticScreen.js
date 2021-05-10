import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { Input, Icon, Divider, Card, Rating } from "react-native-elements";
import {
  getPastSelectedSuggestionsByGroupId,
  getGroupsByName,
} from "../../api/ProEventoAPI";
import {
  getAllTags,
  getFollowers,
  register,
  searchUsersByUsername,
} from "../../api/ProEventoAPI";
import RegisterScreen from "../RegisterScreen";
import EventCard from "../../components/EventCard";

export function PastStatsScreen({ navigation, route }) {
  const { myAccount, channelName } = route.params;
  const [groupNum, setGroupNum] = useState(null);
  const [stats, setStats] = useState([]);
  useEffect(() => {
    getGroupsByName(channelName, (groups) => {
      const groupNum = groups[0].id;
      getPastSelectedSuggestionsByGroupId(groupNum, (stats) => {
        setStats(stats);
      });
      setGroupNum(groups[0].id);
    });
  }, [channelName, myAccount]);

  const renderEachStat = (stat) => {
    return (
      <View>
        <Card containerStyle={{}} wrapperStyle={{}}>
          <Card.Title>Suggested Events</Card.Title>
          <Card.Divider />
          <View
            style={{
              position: "relative",
              alignItems: "center",
            }}
          >
            <Text>Name: {stat.name}</Text>
            <Text>Description: {stat.description}</Text>
            <Text>Status: {stat.status}</Text>
            <Text>Date: {stat.dateTime}</Text>
            <Rating
              fractions={0}
              imageSize={30}
              ratingBackgroundColor="#FFF"
              ratingColor="#FFF"
              ratingCount={stat.votes}
              ratingImage="star"
              ratingTextColor="#222"
              startingValue={stat.votes}
              style={{}}
              type="star"
            />
          </View>
        </Card>
        <Divider style={{ width: "80%", margin: 20 }} />
      </View>
    );
  };

  return (
    <FlatList
      data={stats}
      renderItem={(item) => renderEachStat(item.item)}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}
// export default PastStatsScreen;
