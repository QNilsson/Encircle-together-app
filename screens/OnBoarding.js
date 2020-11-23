import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { Onboard } from "../context/OnbaordContext";

import * as Font from "expo-font";

const fonts = {
  Clarendon: require("../assets/fonts/clarendon.otf"),
  "Clarendon-Italic": require("../assets/fonts/clarendon-italic.otf"),
  "Clarendon-Bold": require("../assets/fonts/clarendon-bold.otf"),
  "Clarendon-Bold-Italic": require("../assets/fonts/clarendon-bold-italic.otf"),
  Din: require("../assets/fonts/din.otf"),
  "Din-Bold": require("../assets/fonts/din-bold.otf"),
  Garamond: require("../assets/fonts/garamond.otf"),
  "Garamond-Bold": require("../assets/fonts/garamond-bold.otf"),
  "Garamond-Italic": require("../assets/fonts/garamond-italic.otf"),
  "Garamond-Bold-Italic": require("../assets/fonts/garamond-bold-italic.otf"),
};

const OnBoarding = () => {
  const OnboardContext = useContext(Onboard);

  useEffect(() => {
    Font.loadAsync(fonts);
  });

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
        <View>
          <Image
            style={styles.imageHouse}
            source={require("../assets/provohouse.jpeg")}
          />
        </View>
        <View style={styles.houseText}>
          <Text>Provo House</Text>
          <Text>-Insert House Address Here-</Text>
        </View>
      </View>
      <View
        style={styles.houseButtons}
        onStartShouldSetResponder={() =>
          OnboardContext.setChoice("Salt Lake City")
        }
      >
        <View>
          <Image
            style={styles.imageHouse}
            source={require("../assets/saltlakehouse.jpg")}
          />
        </View>
        <View style={styles.houseText}>
          <Text>Salt Lake House</Text>
          <Text>-Insert House Address Here-</Text>
        </View>
      </View>
      <View
        style={styles.houseButtons}
        onStartShouldSetResponder={() => OnboardContext.setChoice("StGeorge")}
      >
        <View>
          <Image
            style={styles.imageHouse}
            source={require("../assets/stgeorge.jpg")}
          />
        </View>
        <View style={styles.houseText}>
          <Text>St. Geroge House</Text>
          <Text>-Insert House Address Here-</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "black",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontFamily: "Din",
    fontWeight: "700",
    fontSize: 25,
  },
  subHeaderText: {
    color: "white",
    fontFamily: "Clarendon",
    fontWeight: "400",
    fontSize: 45,
    padding: "5%",
  },
  imageLogo: {
    resizeMode: "contain",
    width: "35%",
    height: 100,
    alignSelf: "center",
  },
  houseButtons: {
    flex: 1,
    margin: 35,
    marginTop: 10,
    flexDirection: "row",
    height: "25%",
    borderWidth: 3,
  },
  houseText: {
    alignItems: "center",
    padding: "5%",
  },
  imageHouse: {
    resizeMode: "contain",
    width: 130,
    height: 100,
    margin: "5%",
  },
});
export default OnBoarding;
