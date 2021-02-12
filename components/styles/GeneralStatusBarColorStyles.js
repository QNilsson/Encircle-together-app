import { StyleSheet, Platform, StatusBar } from "react-native";
const STATUSBAR_HEIGHT_iOS = Platform.Version > "11.0.1" ? 47 : 20;
const STATUSBAR_HEIGHT_ANDROID = StatusBar.currentHeight;
export default StyleSheet.create({
  statusBar: {
    height:
      Platform.OS === "ios" ? STATUSBAR_HEIGHT_iOS : STATUSBAR_HEIGHT_ANDROID,
  },
});
