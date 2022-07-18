import { Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";

const HomeButton = ({ title, icon, goTo, navigation }) => {
  return (
    <TouchableOpacity
      style={style.textWrapper}
      onPress={() => navigation.navigate(goTo)}
    >
      <Image source={icon} style={style.icon} />
      <Text style={style.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  text: {
    fontSize: 20,
    color: "#8000F6",
    paddingLeft: 5,
  },
  textWrapper: {
    marginVertical: 5,
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    height: 50,
  },
  icon: {
    width: 25,
    height: 25,
    tintColor: "#8000F6",
  },
});

export default HomeButton;
