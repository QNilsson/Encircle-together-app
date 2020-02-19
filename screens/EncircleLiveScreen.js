import React from "react";
import { StyleSheet, Text, View } from "react-native";

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

const EncircleLiveScreen = props => {
  return (
    <WebView
      source={{
        html:
          '<iframe width="100%" height="100%" src="https://www.encirclelive.org" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
      }}
      style={{ marginTop: 30 }}
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
