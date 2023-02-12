import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Manager from "../screens/Manager";
import Profile from "../screens/Profile";
const Stack = createNativeStackNavigator();
const TabsNavigation = () => {
  return (
    <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="Manager" component={Manager} />
  </Stack.Navigator>

  );
};

export default TabsNavigation;

