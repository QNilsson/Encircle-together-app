import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import WebView from "react-native-webview";

const EncircleLiveScreen = props => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        source={{ uri: "https://www.encirclelive.org" }}
        androidHardwareAccelerationDisabled
        style={{ flex: 1 }}
      />
    </SafeAreaView>
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
