import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { colors } from "../../theme";
import { images } from "../../assets";
import { LoadingOverlay } from "../../components/loading-overlay";
import { useApp } from "../../app-context";
import {
  sendGroupRequest,
  createGroup,
  getAllTags,
  getGroupsByName,
  createEventSuggestion,
} from "../../api/ProEventoAPI";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

export function AddSuggestionScreen({ route, navigation }) {
  const [suggestionName, setSuggestionName] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [tagList, setTagList] = useState([]);
  const [selectedTag, setSelectedTag] = useState(0);
  const [eventDateTime, setEventDateTime] = useState(new Date(Date.now()));
  const [datePickerShow, setDatePickerShow] = useState(true);
  const [timePickerShow, setTimePickerShow] = useState(true);
  const [groupId, setGroupId] = useState(0);
  const [hashTag, setHashTag] = useState("");

  const { myAccount, channelName } = route.params;

  useEffect(() => {
    getAllTags((tags) => {
      setTagList(tags);
    });
    getGroupsByName(channelName, (groups) => {
      setGroupId(groups[0].id);
    });
  }, []);

  const dateTimeToString = (date) => {
    const iso = date.toISOString();
    return iso.slice(0, 10) + " " + iso.slice(11, 19);
  };

  const onCreateSuggestion = () => {
    const newSuggestion = {};
    newSuggestion.name = suggestionName;
    newSuggestion.description = description;
    newSuggestion.hashtags = hashTag;
    const tag = { id: selectedTag };
    newSuggestion.tag = tag;
    newSuggestion.dateTime = dateTimeToString(eventDateTime);
    const userGroup = { id: groupId };
    newSuggestion.userGroup = userGroup;
    createEventSuggestion(newSuggestion, () => {
      showMessage({ message: "Successfully added suggestion" });
      //   console.log(newSuggestion);
      //   console.log("success");
    });
  };

  const tagSlide = tagList.map((tag) => {
    return <Picker.Item label={tag.name} value={tag.id} key={tag.id} />;
  });

  return (
    <View style={styles.screen}>
      {/* <Image style={styles.logo} source={images.message} /> */}
      <TextInput
        value={suggestionName}
        onChangeText={setSuggestionName}
        style={styles.input}
        placeholder="Suggest a name for Event"
        placeholderTextColor={colors.ghost}
      />

      <TextInput
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        placeholder="Event Description"
        placeholderTextColor={colors.ghost}
      />

      <TextInput
        value={hashTag}
        onChangeText={setHashTag}
        style={styles.input}
        placeholder="Add a hashtag for this suggestion"
        placeholderTextColor={colors.ghost}
      />

      <View>
        <Picker
          selectedValue={selectedTag}
          style={{ height: 100, width: 150, marginTop: 0 }}
          mode="dialog"
          onValueChange={(itemValue, itemIndex) => {
            setSelectedTag(itemValue);
          }}
        >
          {tagSlide}
        </Picker>
      </View>

      <View style={styles.datatimepickerWrapper}>
        {datePickerShow && (
          <DateTimePicker
            style={styles.datetimepicker}
            value={eventDateTime}
            mode={"date"}
            display="default"
            onChange={(e, selectedDate) => {
              const datetime = new Date(eventDateTime);
              datetime.setFullYear(selectedDate.getFullYear());
              datetime.setMonth(selectedDate.getMonth());
              datetime.setDate(selectedDate.getDate());
              setDatePickerShow(Platform.OS === "ios");
              setEventDateTime(datetime);
            }}
          />
        )}
        {timePickerShow && (
          <DateTimePicker
            style={styles.datetimepicker}
            value={eventDateTime}
            mode={"time"}
            is24Hour={true}
            display="default"
            onChange={(e, selectedTime) => {
              const datetime = new Date(eventDateTime);
              datetime.setHours(selectedTime.getHours());
              datetime.setMinutes(selectedTime.getMinutes());
              datetime.setSeconds(selectedTime.getSeconds());
              setTimePickerShow(Platform.OS === "ios");
              setEventDateTime(datetime);
            }}
          />
        )}
      </View>

      <View>
        <TouchableOpacity style={styles.button2} onPress={onCreateSuggestion}>
          <Text style={styles.buttonText}>Submit the suggestion</Text>
        </TouchableOpacity>
        {loading && <LoadingOverlay />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    marginBottom: 0,
  },
  button1: {
    width: 280,
    height: 50,
    backgroundColor: colors.malibu,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  button2: {
    width: 280,
    height: 50,
    backgroundColor: colors.malibu,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  buttonText: {
    fontSize: 17,
    color: colors.white,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
    marginRight: 10,
    color: colors.white,
  },
  datatimepickerWrapper: {
    paddingTop: 100,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
  },
  datetimepicker: {
    width: 128,
    height: 28,
    fontSize: 30,
  },
});
