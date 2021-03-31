import React, { Component } from "react";
import { Button, Text, StyleSheet, View, TouchableOpacity, SafeAreaView, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";

class MoreScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={styles.shop}>More</Text>

        <View style={styles.container}>
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={() => {
              this.props.navigation.navigate("Location");
            }}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Location</Text>
              <Ionicons
                name="ios-arrow-forward"
                size={20}
                color="#686868"
                style={styles.arrowIcon}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={() => {
              this.props.navigation.navigate("Volunteer");
            }}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Volunteer</Text>
              <Ionicons
                name="ios-arrow-forward"
                size={20}
                color="#686868"
                style={styles.arrowIcon}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={() => {
              Linking.openURL("https://encirclestore.org/");
            }}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Shop</Text>
              <Ionicons
                name="ios-arrow-forward"
                size={20}
                color="#686868"
                style={styles.arrowIcon}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={() => {
              Linking.openURL("https://encircletogether.org/give");
            }}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Donate</Text>
              <Ionicons
                name="ios-arrow-forward"
                size={20}
                color="#686868"
                style={styles.arrowIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    margin: 20,
    marginTop: "10%",
    marginBottom: 50
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  shop: {
    fontSize: 40,
    textAlign: "center",
    color: "#2B2B2B",
    fontFamily: "Garamond-Regular",
    marginTop: "20%"
  },
  TouchableOpacity: {
    width: "100%",
    display: "flex",
    flexDirection: "row"
  },
  view: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    margin: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50
  },
  container: {
    alignItems: "center",
    height: "100%",
    backgroundColor: "white",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    paddingTop: 30,
    bottom: 0,
    marginTop: "40%"
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#2B2B2B",
    fontFamily: "Clarendon-Regular",
    marginLeft: "10%",
    marginBottom: 10
  },
  titleContainer: {
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderStyle: "solid",
    borderBottomColor: "#eee",
    borderBottomWidth: 5,
    width: "100%",
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#2B2B2B",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  arrowIcon: {
    marginLeft: "auto",
    marginRight: "10%"
  }
});

export default MoreScreen;
