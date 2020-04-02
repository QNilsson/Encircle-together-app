import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
// @ts-ignore
import Modal from "react-native-modal";
import ModalBaseScene from "../assets/utils/ModalBaseScene";
import DefaultModalContent from "../assets/utils/DefaultModalContent";
import { Ionicons } from "@expo/vector-icons";

class MoreScreen extends Component {
  render() {
    return (
      <View style={styles.view}>
        <DefaultModalContent onPress={this.close} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    margin: 0
  }
});

export default MoreScreen;

// import React from "react";
// import { StyleSheet, Text, Button, View } from "react-native";

// const MoreScreen = props => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.buttonContainer}>
//         <Button
//           title="Locations"
//           onPress={() => props.navigation.navigate("Location")}
//         />
//       </View>
//       <View style={styles.buttonContainer}>
//         <Button
//           title="Donate"
//           onPress={() => props.navigation.navigate("Donate")}
//         />
//       </View>
//       <View style={styles.buttonContainer}>
//         <Button
//           title="Shop"
//           onPress={() => props.navigation.navigate("Shop")}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   buttonContainer: {
//     flex: 1
//   }
// });

// export default MoreScreen;
