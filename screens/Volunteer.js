import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";

const VolunteerScreen = () => {

  const VolunteerWebpage = () => {

  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <ImageBackground
          style={styles.backgroundImage}
          source={require("../assets/volunteer.png")}
        />
      </View>
      <Text style={styles.familyText}>
        We aren't just volunteers, we are family.
      </Text>
      <Text style={styles.bodyText}>
        Join our Volunteer family by applying online.
      </Text>
      <Image
        style={styles.bodyImage}
        source={require("../assets/volunteerBodyImage.png")}
      />
      <Text style={styles.bodyText}>
        We love our volunteers and the support that they provide our LGBTQ+
        youth. Volunteer responsibilities include welcoming visitors, baking
        cookies and other treats, playing games, helping with homework, and
        providing information.
      </Text>
      <Pressable style={styles.button}><Text style={styles.buttonText}>Get Involved</Text></Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    resizeMode: "contain",
    width: "100%",
    height: 167,
  },
  familyText: {
    fontSize: 24,
    padding: 30,
    paddingBottom: 0,
  },
  bodyText: {
    fontSize: 18,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
  },
  bodyImage: {
    resizeMode: "contain",
    height: 250,
    width: "100%",
  },
  button: {
    backgroundColor: "#000000",
    width: 218,
    alignSelf: "center",
    borderRadius: 10,
    paddingLeft: 40,
    paddingRight: 40,
    shadowColor: "black",
    shadowOffset: {
      width: 20,
      height: 0,
    },
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: "#FFFFFF",
    alignSelf: "center",
    fontSize: 20,
    marginTop: 15,
    marginBottom: 15,
  }
});

export default VolunteerScreen;
