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
      "Clarendon": require("../assets/fonts/clarendon.otf"),
      "Garamond-Bold": require("../assets/fonts/garamond-bold.otf"),
      "Din-Bold":require("../assets/fonts/din-bold.otf")
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
        //need to change background image to new logo
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
    width: "100%",
    height: 167,
  },
});

export default DashboardWelcome;
