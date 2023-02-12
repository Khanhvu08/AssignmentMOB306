import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  TextInput,
  Button,
  Alert,
} from "react-native";
import React, { useState } from "react";

// modal

const Manager = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isEditItem, setIsEditItem] = useState(false);
  const [nameOfStore, setnameOfStore] = useState();
  const [phoneNumberOfStore, setphoneNumberOfStore] = useState();
  const [addressOfStore, setaddressOfStore] = useState();
  const [logoStore, setlogoStore] = useState();
  const [status, setstatus] = useState();
  const [listStore, setlistStore] = useState([]);
  const validate = () => {
    if (
      nameOfStore == "" ||
      phoneNumberOfStore == "" ||
      addressOfStore == "" ||
      logoStore == ""
    ) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return false;
    }
    return true;
  };
  const onSave = () => {
    if (validate()) {
      setlistStore([
        ...listStore,
        {
          id: listStore[listStore.length - 1]?.id + 1 || 1,
          nameOfStore: nameOfStore,
          phoneNumberOfStore: phoneNumberOfStore,
          addressOfStore: addressOfStore,
          logoStore: logoStore,
          status: status,
        },
      ]);
      setIsOpenForm(false);
      setForm();
    }
  };
  const setForm = () => {
    setnameOfStore(""),
      setphoneNumberOfStore(""),
      setaddressOfStore(""),
      setlogoStore(""),
      setstatus(0);
  };
  const deleteItemInList = (itemID) => {
    Alert.alert("Thông báo", "Bạn có chắc chắn muốn xoá", [
      {
        text: "Huỷ",
        onPress: () => {},
      },
      {
        text: "Xoá",
        onPress: () => {
          const newListStore = listStore.filter((item) => item.id !== itemID);
          setlistStore(newListStore);
        },
      },
    ]);
  };
  const showInformation = (editId) => {
    setIsEditItem(!false);
    const newItemUpdate = listStore.find((item) => item.id === editId);
    setnameOfStore(newItemUpdate.nameOfStore),
      setphoneNumberOfStore(newItemUpdate.phoneNumberOfStore),
      setaddressOfStore(newItemUpdate.addressOfStore),
      setlogoStore(newItemUpdate.logoStore),
      setstatus(newItemUpdate.status);
  };
  const updatedShopList = (editId) => {
    const newEditList = listStore.map((item) => {
      if (item.id === editId) {
        item.nameOfStore = nameOfStore;
        item.phoneNumberOfStore = phoneNumberOfStore;
        item.addressOfStore = addressOfStore;
        item.logoStore = logoStore;
        item.status = status;
      }
      return item;
    });
    setlistStore(newEditList);
    setIsEditItem(!true);
  };
  console.log(listStore);
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 50,
          paddingStart: 10,
          paddingRight: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={styles.titleA}>Store Manager List</Text>
        <TouchableOpacity
          onPress={() => setIsOpenForm(!isOpenForm)}
          style={styles.buttonAdd}
        >
          <Text style={styles.addStore}>+</Text>
        </TouchableOpacity>
      </View>
      {isOpenForm ? (
        <Modal visible={isOpenForm}>
          <View style={styles.container}>
            <Text style={{ color: "red", fontWeight: "bold", fontSize: 22 }}>
              Add New Store
            </Text>
            <View style={{ width: "100%", paddingHorizontal: 20 }}>
              <TextInput
                placeholder="Name Of Store"
                value={nameOfStore}
                style={styles.inputType}
                onChangeText={(e) => setnameOfStore(e)}
              />
              <TextInput
                placeholder="Address"
                value={addressOfStore}
                style={styles.inputType}
                onChangeText={(e) => setaddressOfStore(e)}
              />
              <TextInput
                placeholder="Phone Number"
                style={styles.inputType}
                value={phoneNumberOfStore}
                keyboardType="numeric"
                onChangeText={(e) => setphoneNumberOfStore(e)}
              />
              <TextInput
                placeholder="link Avatar"
                value={logoStore}
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
                <Button title="Online" onPress={() => setstatus(1)} />
                <Button title="Offline" onPress={() => setstatus(0)} />
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={onSave}>
              <Text style={styles.title}>Thêm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsOpenForm(false)}
            >
              <Text style={styles.title}>Huỷ</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      ) : null}
      <View style={styles.listStore}>
        <FlatList
          data={listStore}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View style={styles.cardContainer}>
                <Image
                  source={{ uri: item.logoStore }}
                  style={styles.avatarSrore}
                />
                <TouchableOpacity style={styles.inforStore}>
                  <View>
                    <Text style={styles.textNameStore}>{item.nameOfStore}</Text>
                    <Text style={styles.text}>{item.addressOfStore}</Text>
                    <Text style={styles.text}>
                      {item.status ? (
                        <Text style={{ color: "green" }}>Đang hoạt động</Text>
                      ) : (
                        <Text style={{ color: "red" }}>Tạm đóng</Text>
                      )}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.buttonForm}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => {
                      showInformation(item.id);
                    }}
                  >
                    {/* edit Item */}
                    <Image
                      style={{ width: 30, height: 30 }}
                      source={require("../assets/edit.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.editButton}
                    // deleteItem
                    onPress={() => deleteItemInList(item.id)}
                  >
                    <Image
                      style={{ width: 30, height: 30 }}
                      source={require("../assets/delete.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {/* modal update */}
              <Modal visible={isEditItem}>
                <View style={styles.container}>
                  <Text
                    style={{ color: "red", fontWeight: "bold", fontSize: 22 }}
                  >
                    Edit Store
                  </Text>
                  <View style={{ width: "100%", paddingHorizontal: 20 }}>
                    <TextInput
                      placeholder="Name Of Store"
                      value={nameOfStore}
                      style={styles.inputType}
                      onChangeText={(e) => setnameOfStore(e)}
                    />
                    <TextInput
                      placeholder="Address"
                      value={addressOfStore}
                      style={styles.inputType}
                      onChangeText={(e) => setaddressOfStore(e)}
                    />
                    <TextInput
                      placeholder="Phone Number"
                      style={styles.inputType}
                      value={phoneNumberOfStore}
                      keyboardType="numeric"
                      onChangeText={(e) => setphoneNumberOfStore(e)}
                    />
                    <TextInput
                      placeholder="link Avatar"
                      value={logoStore}
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
                      <Button title="Online" onPress={() => setstatus(1)} />
                      <Button title="Offline" onPress={() => setstatus(0)} />
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      updatedShopList(item.id);
                    }}
                  >
                    <Text style={styles.title}>Cập nhật</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => setIsEditItem(false)}
                  >
                    <Text style={styles.title}>Huỷ</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default Manager;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonAdd: { flex: 1, alignItems: "center", justifyContent: "center" },
  addStore: {
    fontSize: 28,
    width: 40,
    height: 40,
    color: "white",
    textAlign: "center",
    borderRadius: 50,
    backgroundColor: "#00BEF2",
  },
  titleA: {
    fontSize: 22,
    color: "#2B13AF",
    flex: 7,
    fontWeight: "bold",
  },
  cardContainer: {
    margin: 5,
    flex: 1,
    flexDirection: "row",
  },
  avatarSrore: {
    marginRight: 5,
    width: 120,
    height: 100,
    flex: 2,
    borderRadius: 200,
  },
  inforStore: {
    width: "54%",
    marginLeft: 10,
  },
  editButton: {
    margin: 5,
  },
  textNameStore: {
    fontSize: 19,
    color: "black",
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontWeight: "bold",
    marginVertical: 1,
    fontSize: 16,
  },
  listStore: {
    width: "100%",
    paddingBottom: 30,
  },
  button: {
    backgroundColor: "#1B74E4",
    marginVertical: 7,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  buttonForm: {
    flex: 1,
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
});
