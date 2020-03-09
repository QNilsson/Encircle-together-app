import React from "react";
import { StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";

const EncircleLiveScreen = props => {
  return (
    <WebView
      source={{ uri: "https://www.encirclelive.org" }}
      style={{ marginTop: 20 }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default EncircleLiveScreen;
