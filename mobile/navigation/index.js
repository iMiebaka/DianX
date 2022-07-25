import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, NewUser, ExistingUser, Settings, Exchange } from "../screens";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="NewUser"
          component={NewUser}
          options={{ title: "New User" }}
        />
        <Stack.Screen
          name="ExistingUser"
          component={ExistingUser}
          options={{ title: "Existing User" }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ title: "Settings" }}
        />
        <Stack.Screen
          name="Exchange"
          component={Exchange}
          options={{ title: "Exchange" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
