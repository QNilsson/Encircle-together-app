import React, { Component } from "react";
import { Button, Text, StyleSheet, View, TouchableOpacity, SafeAreaView, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

class MoreScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
       

        <View style={styles.container}>
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={() => {
              Linking.openURL("https://encircletogether.org/involved/");
            }}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Volunteer at Encircle</Text>
             
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={() => {
              this.props.navigation.navigate("SupportScreen");
            }}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Hotlines & Support</Text>
              
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={() => {
              Linking.openURL("https://encirclestore.org//");
            }}
            >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Encircle Store</Text>
              
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
    marginBottom: 0
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
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
    
  },
  container: {
    alignItems: "center",
    height: "40%",
    backgroundColor: "white",
    paddingTop: 7,
    bottom: 0,
    marginTop: "125%"
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2B2B2B",
    fontFamily: "Garamond-Regular",
    marginLeft: "10%",
    marginBottom: 10,
    marginTop:-10
  },
  titleContainer: {
    borderColor: "#F2F2F2",
    borderStyle: "solid",
    borderBottomColor: "#F2F2F2",
    borderBottomWidth: 5,
    width: "100%",
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
});

export default MoreScreen;
