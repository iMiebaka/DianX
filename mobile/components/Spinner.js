import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const Spinner = ({ title }) => {
  return (
    <View>
      <ActivityIndicator animating={true} color="#8000F6" size="large" />
      <Text>{title}</Text>
    </View>
  );
};

export default Spinner;
