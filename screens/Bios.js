import React, {useEffect, useState} from "react";
import {
  ScrollView,
  View,
  Text,
  Pressable,
  ImageBackground,
  StyleSheet,
  Linking,
} from "react-native";

import THERAPISTS from "../constants/Therapists"
import Bio from "./Bio"

const BiosScreen = () => {
  const [docs, setDocs] = useState();

  useEffect(() => {
    const loadTherapists = async () => {
      await setDocs([...THERAPISTS]);
    };
    loadTherapists();
  }, [])

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
      <View style={{flex: 1}}>
            {
              docs.map((doc, key) => {
                return <Bio therapist={doc} key={key} />
              })
            }
      </View>
    </ScrollView>
  );
};

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
  }
});

export default BiosScreen;
