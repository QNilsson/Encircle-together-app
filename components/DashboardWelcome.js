import React, { Component } from "react";
import * as Font from "expo-font";
import { ActivityIndicator } from "react-native";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";

class DashboardWelcome extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
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
    width: "100%",
    height: 167,
  },
});

export default DashboardWelcome;
