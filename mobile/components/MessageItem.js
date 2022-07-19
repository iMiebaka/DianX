import { View, Text, StyleSheet } from "react-native";
import React from "react";

const MessageItem = ({ item }) => {
  return (
    <View
      style={[
        styles.container,
        item.from == "self"
          ? { alignItems: "flex-end" }
          : { alignItems: "flex-start" },
      ]}
    >
      {item.type == "text" && <Text style={styles.text}>{item.message}</Text>}
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
});

export default MessageItem;
