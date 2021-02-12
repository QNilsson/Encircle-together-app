import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Button, Platform } from "react-native";
import { Onboard } from "../context/OnbaordContext";

import * as Font from "expo-font";

const fonts = {
  "Clarendon-Regular": require("../assets/fonts/clarendon.otf"),
  "Clarendon-Italic": require("../assets/fonts/clarendon-italic.otf"),
  "Clarendon-Bold": require("../assets/fonts/clarendon-bold.otf"),
  "Clarendon-Bold-Italic": require("../assets/fonts/clarendon-bold-italic.otf"),
  "Din-Regular": require("../assets/fonts/din.otf"),
  "Din-Bold": require("../assets/fonts/din-bold.otf"),
  "Garamond-Regular": require("../assets/fonts/garamond.otf"),
  "Garamond-Bold": require("../assets/fonts/garamond-bold.otf"),
  "Garamond-Italic": require("../assets/fonts/garamond-italic.otf"),
  "Garamond-Bold-Italic": require("../assets/fonts/garamond-bold-italic.otf"),
};

const OnBoarding = () => {
  const OnboardContext = useContext(Onboard);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync(fonts).then(() => setFontsLoaded(true));
  });

  if (!fontsLoaded) {
    return <View>
      <Text>Loading...</Text>
    </View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.imageLogo}
          source={require("../assets/logo-2020-WHT.png")}
        />
        <Text style={styles.headerText}>Welcome!</Text>
        <Text style={styles.subHeaderText}>Choose Your House</Text>
      </View>
      <View
        onStartShouldSetResponder={() => OnboardContext.setChoice("Provo")}
        style={styles.houseButtons}
      >
        <Image
          style={styles.buttonImage}
          source={require("../assets/provoHouse.png")}
        />
      </View>
      <View
        style={styles.houseButtons}
        onStartShouldSetResponder={() =>
          OnboardContext.setChoice("Salt Lake City")
        }
      >
        <Image
          style={styles.buttonImage}
          source={require("../assets/slcHouse.png")}
        />
      </View>
      <View
        style={styles.houseButtons}
        onStartShouldSetResponder={() => OnboardContext.setChoice("St. George")}
      >
        <Image
          style={styles.buttonImage}
          source={require("../assets/stgeorgeHouse.png")}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  header: {
    height: "30%",
    backgroundColor: "black",
    alignItems: "center",
    marginBottom: 25,
  },
  headerText: {
    fontSize: 20,
    color: "white",
    fontFamily: "Din-Regular",
  },
  subHeaderText: {
    fontSize: 34,
    color: "white",
    fontFamily: "Clarendon-Regular",
  },
  imageLogo: {
    resizeMode: "contain",
    width: "50%",
    height: 100,
  },
  buttonImage: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  houseButtons: {
    flex: 1,
    marginBottom: 15,
    flexDirection: "row",
    minWidth: "100%",
  },
});
export default OnBoarding;
