import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Pressable,
  ImageBackground,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Image,
} from "react-native";

import THERAPISTS from "../constants/Therapists";

const BiosScreen = () => {
  const [docs, setDocs] = useState();

  useEffect(() => {
    const loadTherapists = async () => {
      await setDocs([...THERAPISTS]);
    };
    loadTherapists();
  }, []);

  return (
    <ScrollView>
      <View>
        <ImageBackground
          style={styles.backgroundImage}
          source={require("../assets/biosHeader.png")}
        >
          <Text style={styles.headerTopText}>THERE'S MORE</Text>
          <Text style={styles.boldTopText}>Book an Appointment</Text>
          <Text style={styles.longText}>
            Encircle Therapy offers a free consultation that allows you and our
            therapists to assess the proper treatment and direction to help you
            thrive.
          </Text>
          <Pressable
            onPress={() =>
              Linking.openURL("https://www.encircletherapy.org/book")
            }
            style={styles.button}
          >
            <Text style={styles.buttonText}>Request Appointment</Text>
          </Pressable>
        </ImageBackground>
      </View>
      <Text style={docStyles.docHeader}>Our Therapists</Text>
      <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
        <TouchableOpacity style={docStyles.docContainer}>
          <Image style={docStyles.docImage} source={require("../assets/Jared.png")} />
          <Text style={docStyles.docName}>
            Jared Klundt <Text style={docStyles.docTitle}>PhD</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={docStyles.docContainer}>
          <Image style={docStyles.docImage} source={require("../assets/Lacey.png")} />
          <Text style={docStyles.docName}>
            Lacey Bagley <Text style={docStyles.docTitle}>MS, AMFT</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={docStyles.docContainer}>
          <Image style={docStyles.docImage} source={require("../assets/Sandra.png")} />
          <Text style={docStyles.docName}>
            Sandra Priedeman <Text style={docStyles.docTitle}>MSW, LCSW</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={docStyles.docContainer}>
          <Image style={docStyles.docImage} source={require("../assets/Andres.png")} />
          <Text style={docStyles.docName}>
            Andrés Brown <Text style={docStyles.docTitle}>MS, AMFT</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={docStyles.docContainer}>
          <Image style={docStyles.docImage} source={require("../assets/Meghan.png")} />
          <Text style={docStyles.docName}>
            Meghan Maddock <Text style={docStyles.docTitle}>MS</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={docStyles.docContainer}>
          <Image style={docStyles.docImage} source={require("../assets/Lori.png")} />
          <Text style={docStyles.docName}>
            Lori Smith <Text style={docStyles.docTitle}>MSW, LCSW</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const docStyles = StyleSheet.create({
  docImage: {
    resizeMode: "contain",
    width: 147,
    height: 196,
  },
  docName: {
    fontSize: 16,
    fontFamily: "Garamond-Regular",
  },
  docTitle: {
    fontSize: 12,
  },
  docContainer: {
    paddingRight: 34,
  },
  docHeader: {
    fontSize: 24,
  }
})

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: "contain",
    height: 321,
  },
  headerTopText: {
    fontSize: 16,
    fontFamily: "Garamond-Regular",
    alignSelf: "center",
    color: "white",
    paddingTop: 44,
  },
  boldTopText: {
    fontSize: 30,
    fontFamily: "Clarendon-Regular",
    alignSelf: "center",
    color: "white",
    paddingBottom: 66,
  },
  longText: {
    fontSize: 18,
    fontFamily: "Garamond-Regular",
    alignSelf: "center",
    color: "white",
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 14,
  },
  button: {
    backgroundColor: "white",
    alignSelf: "center",
    justifyContent: "center",
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: "Din-Regular",
    fontSize: 20,
    textAlign: "center",
  },
});

export default BiosScreen;
