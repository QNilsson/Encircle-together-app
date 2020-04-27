import { StyleSheet, Platform, StatusBar } from "react-native";

// android workaround for ios SafeAreaView
export default StyleSheet.create({
  AndroidSafeArea: {
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});