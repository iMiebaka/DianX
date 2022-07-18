import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import ICONS from "../assets/icons";

const imageDimension = 50;

const DeviceMenu = ({navigation, name, status, icon, goTo, route }) => {
  return (
    <TouchableOpacity style={styles.containerMain} onPress={() => navigation.navigate(goTo, {route, name})}>
      <View style={styles.containerImage}>
        <Image style={styles.image} source={icon} />
      </View>
      <View style={styles.containerText}>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>status: {status}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  },
  containerImage: {
    width: imageDimension,
    height: imageDimension,
    backgroundColor: "#CDD5E1",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,

  },
  image: {
    width: imageDimension - 10,
    height: imageDimension - 10,
    tintColor: "#4D5563"
  },
  containerText: {
    marginHorizontal: 10
  },
  text:{
    fontSize: 17,
    color: "#4D5563",
    fontWeight: "bold"
  }
});

export default DeviceMenu;
