import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Button, Platform } from "react-native";
import { Onboard } from "../context/OnbaordContext";

import * as Font from "expo-font";

const fonts = {
  "Clarendon-Regular": require("../assets/fonts/clarendon.otf"),
  "Clarendon-Italic": require("../assets/fonts/clarendon-italic.otf"),
  "Clarendon-Bold": require("../assets/fonts/clarendon-bold.otf"),
  "Clarendon-Bold-Italic": require("../assets/fonts/clarendon-bold-italic.otf"),
  "Din-Regular": require("../assets/fonts/din.otf"),
  "Din-Bold": require("../assets/fonts/din-bold.otf"),
  "Garamond-Regular": require("../assets/fonts/garamond.otf"),
  "Garamond-Bold": require("../assets/fonts/garamond-bold.otf"),
  "Garamond-Italic": require("../assets/fonts/garamond-italic.otf"),
  "Garamond-Bold-Italic": require("../assets/fonts/garamond-bold-italic.otf"),
};

const Support = ( )=>{
	const [fontsLoaded, setFontsLoaded] = useState(false)

	useEffect(() => {
		Font.loadAsync(fonts).then(() => setFontsLoaded(true));
	  });
	
	  if (!fontsLoaded) {
		return <View>
		  <Text>Loading...</Text>
		</View>;
	  }
	
	  return(
		  <View>
			<Text>Hello</Text>
		  </View>
	  )
}



  const styles = StyleSheet.create({
	  container:{
		flex: 1,
		flexDirection: "column",
	  }
  })

  export default Support;