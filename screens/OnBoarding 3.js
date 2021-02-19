import React, { useContext } from "react";
import { View, Text } from "react-native";
import { OnboardProvider } from "../context/OnbaordContext";

const OnBoarding = () => {
  const OnboardContext = useContext(OnboardProvider);
  return (
    <View>
      <Text>Welcome!</Text>
      <Text>Choose Your House:</Text>
      <View>Provo</View>
      <View>SLC</View>
      <View>ST George</View>
    </View>
  );
};
export default OnBoarding;
