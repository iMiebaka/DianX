import { Alert, ScrollView, Text } from "react-native";
import React from "react";
import { DeviceMenu } from "../components";
import ICONS from "../assets/icons";

const ExistingUser = ({ navigation }) => {
  return (
    <ScrollView>
      {/* <Text>Existing Users</Text> */}
      <DeviceMenu
        navigation={navigation}
        name={"Misty"}
        status={"active"}
        icon={ICONS.desktop}
        route={"192.168.43.64:3333"}
        goTo="Exchange"
      />
    </ScrollView>
  );
};

export default ExistingUser;
