import React, { Component } from "react";
import * as Font from "expo-font";
import { ActivityIndicator } from "react-native";
import { StyleSheet, Text, View } from "react-native";

class DashboardWelcome extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentDidMount() {
    await Font.loadAsync({
      ModernoFB: require("../assets/fonts/ModernoFB-Semibold.otf"),
      "Futura-Light": require("../assets/fonts/Futura-Light.ttf"),
      "Futura-Book": require("../assets/fonts/Futura-Book.ttf"),
      "Futura-Medium": require("../assets/fonts/Futura-Medium.ttf"),
      "Futura-Bold": require("../assets/fonts/Futura-Bold.ttf"),
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <ActivityIndicator />;
    }
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subTitle}>Make today a great day.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: "white",
    width: "100%",
    padding: 20,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    marginBottom: 20,

    paddingLeft: 12,
    paddingRight: 12,
    top: 0,
    // height: '100%',
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    color: "#2B2B2B",
    marginTop: "20%",
    fontFamily: "ModernoFB",
  },
  subTitle: {
    fontSize: 18,
    color: "#686868",
    textAlign: "center",
    margin: 8,
    marginBottom: 20,
    alignItems: "center",
    fontFamily: "Futura-Book",
  },
});

export default DashboardWelcome;
