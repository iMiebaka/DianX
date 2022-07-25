import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import ICONS from "../assets/icons";
import { MessageItem } from "../components";
import uuid from "react-native-uuid";
// import { useSelector } from "react-redux";
import { socket } from "../request";
import { db, SQL } from "../models";

const Exchange = ({ route, navigation }) => {
  // const userDetails = useSelector((state) => state.userDetail);
  const [messageValue, setMessageValue] = useState(""),
    [userDetails, setUserDetails] = useState({}),
    [messages, setMessages] = useState([]);
  //   { id: uuid.v4(), message: "hsjksdjk", type: "text", from: "self" },
  //   { id: uuid.v4(), message: "sdjkjfk", type: "text", from: "self" },
  //   { id: uuid.v4(), message: "sdjkjfk", type: "text", from: "user" },
  // ]);
  // console.log(userDetails);
  const messageChange = () => {
    const data = {
      id: uuid.v4(),
      message: messageValue,
      room: route.params.connectionId,
      type: "text",
      userId: userDetails.publicId,
      createdOn : new Date()
    };
    console.log(userDetails);
    socket(route.params.url).emit("receive_text", data);
    setMessageValue("");
  };

  useEffect(() => {
    const listener = (message) => {
      console.log(messages);
      setMessages((data) => [...data, message]);
      // console.log(message);
    };
    socket(route.params.url).on("send_message", listener);

    return () => socket(route.params.url).off("send_message", listener);
  }, ["send_message"]);

  useEffect(() => {
    let mounted = true;
    {
      mounted &&
        socket(route.params.url).emit("join_room", route.params.connectionId);
      db.transaction((tx) => {
        tx.executeSql(SQL.get.DeviceID, [], (_, { rows }) => {
          setUserDetails(rows._array[0]);
        });
      });
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerHolder}>
        <Text style={styles.header}>{route.params.name}</Text>
      </View>
      <ScrollView style={styles.messages}>
        {messages.map((item) => {
          return <MessageItem key={uuid.v4()} item={item} user={userDetails} />;
        })}
      </ScrollView>
      <View style={styles.senderZone}>
        <TextInput
          onChangeText={setMessageValue}
          value={messageValue}
          style={styles.input}
          multiline
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
    backgroundColor: "#CDD5E1",
    flexDirection: "column",
  },
  headerHolder: {
    borderBottomWidth: 0.4,
    width: "100%",
    borderBottomColor: "gray",
    padding: 5,
  },
  header: {
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "bold",
    color: "white",
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
