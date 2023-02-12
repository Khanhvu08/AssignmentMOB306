import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
const Home = (props) => {
  const nav = props.navigation;
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo_app.png")} />
      <Text style={styles.text}>Welcome to Store Manager</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => nav.navigate("Manager")}
      >
        <Text style={styles.title}>Manager</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => nav.navigate("Profile")}
      >
        <Text style={styles.title}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 20,
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 17,
    color: "red",
    marginBottom: 30,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#1B74E4",
    marginVertical: 7,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  title: {
    color: "white",
    fontWeight: "bold",
  },
});
