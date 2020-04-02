import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

type Props = {
  onPress: () => any;
};

const DefaultModalContent: React.FC<Props> = props => (
  <View style={styles.content}>
    <View style={styles.link}>
      <Text style={styles.contentTitle}>ADDITIONAL RESOURCES</Text>
      <Text>{">"}</Text>
    </View>

    <View style={styles.link}>
      <Text style={styles.contentTitle}>SHOP</Text>
      <Text>{">"}</Text>
    </View>

    <View style={styles.link}>
      <Text style={styles.contentTitle}>DONATE</Text>
      <Text>{">"}</Text>
    </View>

    <View style={{ ...styles.link, ...styles.lastLink }}>
      <Text style={styles.contentTitle}>CHANGE PRIMARY LOCATION</Text>
      <Text>{">"}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  content: {
    backgroundColor: "white",
    padding: 22,
    alignItems: "flex-start",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderColor: "rgba(0, 0, 0, 0.1)",
    height: 220,
    marginTop: 40
  },
  link: {
    width: "100%",
    height: 50,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    borderStyle: "solid"
  },
  lastLink: {
    borderBottomWidth: 0
  },
  contentTitle: {
    fontSize: 16
  }
});

export default DefaultModalContent;
