import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Manager from "../screens/Store/Manager";
import Profile from "../screens/Profile";
import AddNewStore from "../screens/Store/AddNewStore";
import EditStore from "../screens/Store/EditStore";
import InformationStore from "../screens/Store/InformationStore";
const Stack = createNativeStackNavigator();
const TabsNavigation = () => {
  return (
    <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="AddStore" component={AddNewStore} />
    <Stack.Screen name="Manager" component={Manager} />
    <Stack.Screen name="EditStore" component={EditStore} />
    <Stack.Screen name="InformationStore" component={InformationStore} />
  </Stack.Navigator>

  );
};

export default TabsNavigation;

