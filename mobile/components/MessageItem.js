import { View, Text, StyleSheet } from "react-native";
import React from "react";

const MessageItem = ({ item }) => {
  return (
    <View
      style={[
        styles.container,
        item.from == "self" && { alignItems: "flex-end" },
      ]}
    >
      <Text style={styles.text}>{item.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 2
  },
  text: {
    color: "#4D5563",
    fontSize: 25,
    maxWidth: "80%",
  },
});

export default MessageItem;
