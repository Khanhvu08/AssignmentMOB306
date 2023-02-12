import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";

const Card=(props)=>{
  const nav = props.navigation;
  const {listInformation} =props
  const { fullName, studentID, avatar } = listInformation;
  return(
    <View style={styles.container}>
      <ImageBackground
        style={styles.image_background}
        imageStyle={{ borderRadius: 20 }}
        source={require("../assets/mesh_gradient.jpg")}
      >
        <View style={styles.visitCard}>
          <View style={styles.visitCardHeader}>
            <Text style={styles.titleHeader}>Abouts Me</Text>
          </View>
          <View style={styles.visitCardAvatar}>
            <Image
              style={{
                width: 200,
                height: 200,
                borderRadius: 200,
              }}
              source={{
                uri: avatar,
              }}
            />
          </View>
          <View style={styles.visitCardFooter}>
            <Text style={styles.fullName}>{fullName}</Text>
            <Text style={styles.fullName}>MSV: {studentID}</Text>
          </View>
        </View>
      </ImageBackground>
      <TouchableOpacity
        style={styles.btnBackToHome}
        onPress={() => nav.navigate("Manager")}
      >
        <Text style={styles.textButton}>Manager</Text>
      </TouchableOpacity>
    </View>
  )
}

const Profile = (props) => {
  const nav = props.navigation;
  const [listInformation, setlistInformation] = useState([]);
  useEffect(() => {
    setlistInformation({
      fullName: "Vũ Viết Khanh",
      studentID: "PH28077",
      avatar:
        "https://scontent.fhan5-8.fna.fbcdn.net/v/t1.6435-9/158286235_1355382268148507_3942750498553992743_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=HOq0l1URID4AX-OKKNM&_nc_ht=scontent.fhan5-8.fna&oh=00_AfAhMSSG-PWjsmLThg9Zf-PyfZ_l3vahuErh9JIwlE5fLw&oe=6409DC5E",
    });
  }, []);
  return <Card listInformation={listInformation} navigation={nav}/>
};


export default Profile;

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
    height: 390,
    borderRadius: 24,
  },
  titleHeader: { fontFamily: "Roboto", fontSize: 18, fontWeight: "700" },
  visitCardHeader: {
    flex: 1,
    position: "relative",
  },
  visitCardAvatar: {
    flex: 3,
  },
  visitCardFooter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fullName: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  btnBackToHome:{
    backgroundColor: "#1B74E4",
    marginVertical: 7,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  textButton:{
      color: "white",
      fontWeight: "bold",
  }
});
