import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import moment from "moment";
// import copy from "copy-to-clipboard";
import * as Clipboard from "expo-clipboard";

const MessageItem = ({ item, user }) => {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync("hello world");
  };
  return (
    <View
      style={[
        styles.container,
        item.userId == user.publicId
          ? { alignItems: "flex-end" }
          : { alignItems: "flex-start" },
      ]}
    >
      {item.type == "text" && (
        <TouchableOpacity
          onPress={() => copyToClipboard(item.message)}
          style={styles.text}
        >
          <Text>{item.message}</Text>
          <Text style={styles.subText}>
            {moment(item.createdOn).format("LT")}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 2,
  },
  text: {
    // color: "#4E5675",
    fontSize: 17,
    maxWidth: "80%",
    elevation: 2,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
  subText: {
    color: "gray",
    fontSize: 10,
  },
});

export default MessageItem;
