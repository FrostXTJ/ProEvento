import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { colors } from "../../theme";
import { images } from "../../assets";
import { TwilioService } from "../../services/twilio-service";
import { LoadingOverlay } from "../../components/loading-overlay";
import { useApp } from "../../app-context";
import {
  getOngoingEventSuggestions,
  voteEventSuggestion,
  getGroupsByName,
  convertEventSuggestionToEvents,
  unregisterEvent,
} from "../../api/ProEventoAPI";
import { routes } from "../MessageScreen";
import { Button, Card } from "react-native-elements";
import { isSameUser } from "react-native-gifted-chat/lib/utils";

const SuggestionCard = (props) => {
  const {
    description,
    name,
    myUserId,
    suggestionId,
    dateTime,
    voters,
    voterCounts,
  } = props;

  const onVoteEventSuggestion = (myUserId, suggestionId) => {
    voteEventSuggestion(
      {
        userId: myUserId,
        eventSuggestionId: suggestionId,
      },
      () => {
        console.log("successfully voted");
      }
    );
  };
  const checkVoterInList = (voter, list) => {
    let result = false;
    list.forEach((item) => {
      if (item.id === voter) {
        result = true;
      }
    });
    return result;
  };

  let button = <Button title="Loading"></Button>;
  if (checkVoterInList(myUserId, voters)) {
    button = (
      <Button
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        title="Voted"
        onPress={() => {
          alert("You have already voted this event!");
        }}
      />
    );
  } else {
    button = (
      <Button
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        title="Vote"
        onPress={() => {
          alert("You have successfully voted!");
          onVoteEventSuggestion(myUserId, suggestionId);
        }}
      />
    );
  }

  return (
    <Card containerStyle={{ width: 350, borderRadius: 20 }}>
      <Card.Title>{name}</Card.Title>
      <Card.Divider />
      <Text style={{ marginBottom: 10 }}>{description}</Text>
      <Text style={{ marginBottom: 10 }}>{`Voter Counts: ${voterCounts}`}</Text>
      <Text style={{ marginBottom: 10 }}>{dateTime}</Text>
      {button}
    </Card>
  );
};

export function ChatVoteScreen({ route, navigation }) {
  const [loading, setLoading] = useState(false);
  const { myAccount, channelName } = route.params;
  const userId = myAccount.user.id;

  const [suggestionCards, setSuggestionCards] = useState([]);
  const [isGroupOwner, setIsGroupOwner] = useState(false);
  const [groupId, setGroupId] = useState(0);

  useEffect(() => {
    let arr = [];
    getGroupsByName(channelName, (groups) => {
      const groupId = groups[0].id;
      setGroupId(groupId);
      if (myAccount.user.id == groups[0].founder.id) {
        setIsGroupOwner(true);
      }
      getOngoingEventSuggestions(groupId, (allSuggestions) => {
        if (allSuggestions != null) {
          allSuggestions.forEach((i) => {
            const card = (
              <SuggestionCard
                description={i.description}
                name={i.name}
                dateTime={i.dateTime}
                myUserId={userId}
                suggestionId={i.id}
                voters={i.voters}
                voterCounts={i.voters.length}
              />
            );
            arr.push(card);
          });
          setSuggestionCards(arr);
        }
      });
    });
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>{suggestionCards}</View>

      {isGroupOwner ? (
        <TouchableOpacity
          style={styles.button1}
          onPress={() => {
            convertEventSuggestionToEvents(groupId, (result) => {
              console.log(result);
            });
          }}
        >
          <Text style={styles.buttonText}>Convert Suggestions to Events</Text>
        </TouchableOpacity>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whisper,
    alignItems: "center",
    justifyContent: "center",
  },
  button1: {
    width: 300,
    height: 80,
    backgroundColor: colors.malibu,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginLeft: 50,
  },
  buttonText: {
    fontSize: 20,
    color: colors.white,
  },
});
