import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { API_URL } from "../../config.js";

const StoreItem = (props) => {
  const {
    id,
    logoStore,
    nameOfStore,
    addressOfStore,
    phoneNumberOfStore,
    status,
  } = props.item;
  const { getList: getListStore, navigation: nav } = props;

  const deleteItemInList = () => {
    Alert.alert("Thông báo", "Bạn có chắc chắn muốn xoá?", [
      {
        text: "Huỷ",
        onPress: () => {},
      },
      {
        text: "Xoá",
        onPress: () => {
          fetch(API_URL + id, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
            .then((result) => {
              // xoa đối tượng thành công
              if (result.ok) {
                console.log("Xoá thành công");
                getListStore();
              }
            })
            .catch((error) => {
              console.log(error);
            });
        },
      },
    ]);
  };
  const tempList = {
    id: id,
    logoStore: logoStore,
    nameOfStore: nameOfStore,
    addressOfStore: addressOfStore,
    phoneNumberOfStore: phoneNumberOfStore,
    status: status,
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() => nav.navigate("InformationStore", { tempList })}
      >
        <View style={styles.cardContainer}>
          <Image source={{ uri: logoStore }} style={styles.avatarSrore} />
          <TouchableOpacity
            style={styles.inforStore}
            onPress={() => nav.navigate("InformationStore", { tempList })}
          >
            <View>
              <Text style={styles.textNameStore}>{nameOfStore}</Text>
              <Text style={styles.text}>{addressOfStore}</Text>
              <Text style={styles.text}>
                {status ? (
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
                nav.navigate("EditStore", { tempList });
              }}
            >
              {/* edit Item */}
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../../assets/edit.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              // deleteItem
              onPress={deleteItemInList}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../../assets/delete.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Manager = (props) => {
  const { navigation: nav } = props;
  const [listStore, setListStore] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const getListStore = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setListStore(data);
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    const unsubcribe = nav.addListener("focus", () => {
      getListStore();
    });
    return unsubcribe;
  }, [nav]);
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
          onPress={() => {
            nav.navigate("AddStore");
          }}
          style={styles.buttonAdd}
        >
          <Text style={styles.addStore}>+</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View
          style={{ alignItems: "center", flex: 1, justifyContent: "center" }}
        >
          <ActivityIndicator size={100} color="#00BEF2" />
          <Text> Loading...</Text>
        </View>
      ) : (
        <View style={styles.listStore}>
          <FlatList
            data={listStore}
            renderItem={({ item }) => (
              <StoreItem item={item} getList={getListStore} navigation={nav} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </View>
  );
};

export default Manager;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 30,
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
    height: 90,
    flex: 2,
    borderRadius: 200,
  },
  inforStore: {
    width: "62%",
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
  visitCard: {
    width: 380,
    height: 390,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.2)",
    flex: 1,
    alignItems: "center",
  },
  image_background: {
    width: 380,
    height: 400,
    borderRadius: 24,
  },
  titleHeader: { fontFamily: "Roboto", fontSize: 18, fontWeight: "700" },
  visitCardHeader: {
    flex: 0.5,
    position: "relative",
  },
  visitCardAvatar: {
    flex: 3,
  },
  visitCardFooter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  fullName: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  btnBackToHome: {
    backgroundColor: "#1B74E4",
    marginVertical: 7,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  textButton: {
    color: "white",
    fontWeight: "bold",
  },
});
