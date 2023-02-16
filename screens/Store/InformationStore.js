import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React from "react";

const InformationStore = (props) => {
  const { navigation: nav } = props;
  const { tempList } = props.route.params;
  const { logoStore, nameOfStore, addressOfStore, phoneNumberOfStore, status } =
    tempList;
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image_background}
        imageStyle={{ borderRadius: 20 }}
        source={require("../../assets/mesh_gradient.jpg")}
      >
        <View style={styles.visitCard}>
          <View style={styles.visitCardHeader}>
            <View style={{ flex: 7 }} />
            <Text style={styles.titleHeader}>Abouts</Text>
            <TouchableOpacity
              onPress={() => {
                nav.goBack();
              }}
            >
              <Image
                source={require("../../assets/x-icon.png")}
                style={{
                  width: 20,
                  marginRight: 10,
                  height: 20,
                  borderRadius: 200,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.visitCardAvatar}>
            <Image
              style={{
                width: 200,
                height: 200,
                borderRadius: 200,
              }}
              source={{
                uri: logoStore,
              }}
            />
          </View>
          <View style={styles.visitCardFooter}>
            <Text style={styles.fullName}>{nameOfStore}</Text>
            <Text style={styles.fullName}>{addressOfStore}</Text>
            <Text style={styles.fullName}>{phoneNumberOfStore}</Text>
            <Text style={styles.fullName}>
              {status ? (
                <Text style={{ color: "green" }}>Đang hoạt động</Text>
              ) : (
                <Text style={{ color: "red" }}>Tạm đóng</Text>
              )}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default InformationStore;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
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
    height: 450,
    borderRadius: 24,
  },
  titleHeader: {
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "700",
    flex: 8,
  },
  visitCardHeader: {
    marginTop: 5,
    flex: 1,
    flexDirection: "row",
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
