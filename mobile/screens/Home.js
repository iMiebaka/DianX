import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import ICONS from "../assets/icons";
import { HomeButton } from "../components";

const Home = ({ navigation, database }) => {
  useEffect(() => {
    console.log(database);
    return () => {
    }
  }, [])
  
  return (
    <View>
      <HomeButton navigation={navigation} title={"New User"} icon={ICONS.AddUser} goTo={"NewUser"} />
      <HomeButton navigation={navigation} title={"Existing User"} icon={ICONS.findUser} goTo={"ExistingUser"} />
      <HomeButton navigation={navigation} title={"Setting"} icon={ICONS.settings} goTo={"Settings"} />
    </View>
  );
};

const style = StyleSheet.create({

});

export default Home;
