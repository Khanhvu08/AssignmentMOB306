import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  Switch,
} from "react-native";
import React, { useState } from "react";
import { API_URL } from "../../config.js";

const AddNewStore = (props) => {
  const { navigation: nav } = props;
  const [nameOfStore, setnameOfStore] = useState();
  const [phoneNumberOfStore, setphoneNumberOfStore] = useState();
  const [addressOfStore, setaddressOfStore] = useState();
  const [logoStore, setlogoStore] = useState();
  const [status, setstatus] = useState(true);

  const validateForm = () => {
    if (!nameOfStore || !phoneNumberOfStore || !addressOfStore || !logoStore) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return false;
    }
    return true;
  };
  const onSave = () => {
    if (!validateForm()) {
      return;
    }
    let newObj = {
      logoStore,
      nameOfStore,
      phoneNumberOfStore,
      addressOfStore,
      status,
    };
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify(newObj),
    })
      .then((result) => {
        // tạo đối tượng thành công
        if (result.status == 201) {
          console.log("Thêm thành công");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    nav.navigate("Manager");
  };

  const toggleSwitch = () => setstatus((previousState) => !previousState);
  return (
    <View style={styles.container}>
      <Text style={{ color: "red", fontWeight: "bold", fontSize: 22 }}>
        Add New Store
      </Text>
      <View style={{ width: "100%", paddingHorizontal: 20 }}>
        <TextInput
          placeholder="Name Of Store"
          style={styles.inputType}
          onChangeText={(e) => setnameOfStore(e)}
        />
        <TextInput
          placeholder="Address"
          style={styles.inputType}
          onChangeText={(e) => setaddressOfStore(e)}
        />
        <TextInput
          placeholder="Phone Number"
          style={styles.inputType}
          keyboardType="numeric"
          onChangeText={(e) => setphoneNumberOfStore(e)}
        />
        <TextInput
          placeholder="link Avatar"
          style={styles.inputType}
          onChangeText={(e) => setlogoStore(e)}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: status ? "green" : "gray",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              Online
            </Text>
            <Text
              style={{
                marginHorizontal: 5,
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              |
            </Text>
            <Text
              style={{
                color: status ?  'gray':"green",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              Offline
            </Text>
            <Switch value={status} onValueChange={toggleSwitch} />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={onSave}>
        <Text style={styles.title}>Thêm</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          nav.goBack();
        }}
      >
        <Text style={styles.title}>Huỷ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddNewStore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    color: "white",
    fontWeight: "bold",
  },
  inputType: {
    marginVertical: 10,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  button: {
    backgroundColor: "#1B74E4",
    marginVertical: 7,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
});
