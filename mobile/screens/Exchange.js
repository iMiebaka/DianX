import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { io } from "socket.io-client";
import ICONS from "../assets/icons";
import { MessageItem } from "../components";
import uuid from "react-native-uuid";

const Exchange = ({ route, navigation }) => {
  const socket = io("ws://" + route.params.route, {
    reconnectionDelayMax: 10000,
    transports: ["websocket"],
  });
  const [messageValue, setMessageValue] = useState("");
  const [messages, setMessages] = useState([
    { id: uuid.v4(), message: "hsjksdjk", type: "text", from: "self" },
    { id: uuid.v4(), message: "sdjkjfk", type: "text", from: "self" },
    { id: uuid.v4(), message: "sdjkjfk", type: "text", from: "user" },
  ]);
  const messageChange = () => {
    const data = {
      id: uuid.v4(),
      message: messageValue,
      type: "text",
      from: "self",
    };
    setMessages([...messages, data]);
    setMessageValue("")
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerHolder}>
        <Text style={styles.header}>{route.params.name}</Text>
      </View>
      <ScrollView style={styles.messages}>
        {messages.map((item) => {
          return <MessageItem key={item.id} item={item} />;
        })}
      </ScrollView>
      <View style={styles.senderZone}>
        <TextInput
          onChangeText={setMessageValue}
          value={messageValue}
          style={styles.input}
        />
        <TouchableOpacity onPress={messageChange} style={styles.senderBtn}>
          <Image style={styles.senderIcon} source={ICONS.sendMessage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    flexDirection: "column",
  },
  headerHolder:{
      borderBottomWidth: .4,
      width: "100%",
      borderBottomColor: "gray",
      padding: 5
  },
  header: {
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "bold",
    color: "gray",
  },
  messages: {
    marginHorizontal: 5,
  },
  wrapper: {
    backgroundColor: "white",
  },
  input: {
    backgroundColor: "white",
    width: "auto",
    flex: 1,
    height: 40,
    fontSize: 20,
    margin: 5,
    marginRight: 2,
    borderRadius: 2,
    paddingLeft: 2,
  },
  senderZone: {
    flexDirection: "row",
  },
  senderBtn: {
    backgroundColor: "#6E5EEF",
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    marginLeft: 2,
    borderRadius: 2,
  },
  senderIcon: {
    tintColor: "#fff",
    width: 30,
    height: 30,
  },
});

export default Exchange;
