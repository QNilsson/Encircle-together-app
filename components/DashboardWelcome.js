import React, { Component } from "react";
import * as Font from "expo-font";
import { ActivityIndicator } from "react-native";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";

class DashboardWelcome extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Font.loadAsync({
      ModernoFB: require("../assets/fonts/ModernoFB-Semibold.otf"),
      "Futura-Light": require("../assets/fonts/Futura-Light.ttf"),
      "Futura-Book": require("../assets/fonts/Futura-Book.ttf"),
      "Futura-Medium": require("../assets/fonts/Futura-Medium.ttf"),
      "Futura-Bold": require("../assets/fonts/Futura-Bold.ttf"),
      // "Claredon-Pro-Bold-Italic": require("./assets/fonts/Clarendon Text Pro Bold Italic.otf"),
      // "Claredon-Pro-Italic": require("./assets/fonts/Clarendon Text Pro Italic.otf"),
      // "Claredon-Pro-Reg": require("./assets/fonts/Clarendon Text Pro Reg.otf"),
      // "Claredon-Pro-Bold": require("./assets/fonts/Clarendon Text Pro Bold.otf"),
      // "DIN-Condensed-Reg": require("./assets/fonts/DIN Condensed Reg.otf"),
      // "Garamond-Pro-Bold-Italic": require("./assets/fonts/Garamond Premier Pro Bold Italic.otf"),
      // "Garamond-Pro-Bold": require("./assets/fonts/Garamond Premier Pro Bold.otf"),
      // "Garamond-Pro-Italic": require("./assets/fonts/Garamond Premier Pro Italic.otf"),
      // "Garamond-Pro-Medium-Italic": require("./assets/fonts/Garamond Premier Pro Medium Italic.otf"),
      // "Garamond-Pro-Medium": require("./assets/fonts/Garamond Premier Pro Medium.otf"),
      // "Garamond-Pro-Reg": require("./assets/fonts/Garamond Premier Pro Reg.otf"),
      // "Garamond-Pro-Semibold-Italic": require("./assets/fonts/Garamond Premier Pro Semibold Italic.otf"),
      // "Garamond-Pro-Semibold": require("./assets/fonts/Garamond Premier Pro Semibold.otf"),
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <ActivityIndicator />;
    }
    return (
      <View style={styles.titleContainer}>
        <ImageBackground
          source={require("../assets/backgroundImage.png")}
          style={styles.backgroundImage}
        ></ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    width: "100%",
    top: 0,
    // height: '100%',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: 414,
    height: 167,
  },
  image: {
    resizeMode: "contain",
    height: 100,
  },
});

export default DashboardWelcome;
