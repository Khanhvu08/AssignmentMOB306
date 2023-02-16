import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { API_URL } from "../../config.js";

const EditStore = (props) => {
  const { tempList } = props.route.params;
  const { navigation: nav } = props;
  const { id, logoStore, nameOfStore, addressOfStore, phoneNumberOfStore,status } =
    tempList;
  console.log(tempList)
  const [newnameOfStore, setnewnameOfStore] = useState(nameOfStore);
  const [newphoneNumberOfStore, setnewphoneNumberOfStore] = useState(phoneNumberOfStore);
  const [newaddressOfStore, setanewddressOfStore] = useState(addressOfStore);
  const [newlogoStore, setnewlogoStore] = useState(logoStore);
  const toggleSwitch = () => setnewstatus((previousState) => !previousState);
  const [newstatus, setnewstatus] = useState(status);

  const updatedShopList = () => {
    const updateObj = {
      nameOfStore: newnameOfStore,
      addressOfStore: newaddressOfStore,
      phoneNumberOfStore: newphoneNumberOfStore,
      logoStore: newlogoStore,
      status: newstatus,
    };
    fetch(API_URL + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(updateObj),
    })
      .then((result) => {
        // Sửa đối tượng thành công
        if (result.ok) {
          console.log("Sửa thành công");
          nav.navigate("Manager");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={{ color: "red", fontWeight: "bold", fontSize: 22 }}>
        Edit Store
      </Text>
      <View style={{ width: "100%", paddingHorizontal: 20 }}>
        <TextInput
          value={newnameOfStore}
          editable={true}
          style={styles.inputType}
          onChangeText={ setnewnameOfStore}
        />
        <TextInput
          value={newaddressOfStore}
          style={styles.inputType}
          editable={true}
          onChangeText={ setanewddressOfStore}
        />
        <TextInput
          style={styles.inputType}
          value={phoneNumberOfStore}
          editable={true}
          keyboardType="numeric"
          onChangeText={ setnewphoneNumberOfStore}
        />
        <TextInput
          value={logoStore}
          editable={true}

          style={styles.inputType}
          onChangeText={ setnewlogoStore}
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
                color: newstatus ? "green" : "gray",
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
                color: newstatus ?  'gray':"green",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              Offline
            </Text>
            <Switch value={newstatus} onValueChange={toggleSwitch} />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={updatedShopList}>
        <Text style={styles.title}>Cập nhật</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.goBack()}
      >
        <Text style={styles.title}>Huỷ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditStore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  title: {
    color: "white",
    fontWeight: "bold",
  },
});
