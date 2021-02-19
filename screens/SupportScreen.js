import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Button, Platform, LayoutAnimation, UIManager} from 'react-native';
import {Onboard} from '../context/OnbaordContext';

import * as Font from 'expo-font';
import { Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

if(Platform.OS === 'android'){
	if(UIManager.setLayoutAnimationEnabledExperimental){
		UIManager.setLayoutAnimationEnabledExperimental(true)
	}
}
const fonts = {
  'Clarendon-Regular': require ('../assets/fonts/clarendon.otf'),
  'Clarendon-Italic': require ('../assets/fonts/clarendon-italic.otf'),
  'Clarendon-Bold': require ('../assets/fonts/clarendon-bold.otf'),
  'Clarendon-Bold-Italic': require ('../assets/fonts/clarendon-bold-italic.otf'),
  'Din-Regular': require ('../assets/fonts/din.otf'),
  'Din-Bold': require ('../assets/fonts/din-bold.otf'),
  'Garamond-Regular': require ('../assets/fonts/garamond.otf'),
  'Garamond-Bold': require ('../assets/fonts/garamond-bold.otf'),
  'Garamond-Italic': require ('../assets/fonts/garamond-italic.otf'),
  'Garamond-Bold-Italic': require ('../assets/fonts/garamond-bold-italic.otf'),
};

const Support = () => {
  const [fontsLoaded, setFontsLoaded] = useState (false);

  useEffect (() => {
    Font.loadAsync (fonts).then (() => setFontsLoaded (true));
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Image source={require ('../assets/Hotlines.png')} />
	  <View style={styles.content}>
		  <Text style = {styles.headerText}>Additional Resources</Text>
		  <Text style={styles.subHeaderText}>A currated list of local and national resources</Text>
		  <Text style={styles.disclaimerText}>DISCLAIMER: Significant efforts were made to ensure that this resource list is reputable
			  & safe, however; Encircle can not guarantee these resources. Encircle does not endorse
			  the listed facilities, service providers, or support groups. 
		  </Text>
		  <Item/>
		  <Item/>
		  
	  </View>
    </View>
  );
};

function Item(){
	const [open, setopen] = useState(false);
	const onPress = () =>{
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		setopen(!open)
	};
	return(
		<TouchableOpacity style={[styles.item, !open && {height:40}]} onPress={onPress} activeOpacity={1}>
			<Text>Header</Text>
			
			{open && (
				<View>
					<Text>Some Data</Text>
					<Text>Some Data</Text>
				</View>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content:{
	  paddingLeft:29,
	  paddingRight:40
  },
  headerText:{
	  paddingTop:30,
	  fontFamily:"Clarendon",
	  fontSize:24,
	  lineHeight:28.8,
  },
  subHeaderText:{
	  paddingTop:5,
	  fontFamily:"Garamond",
	  fontSize: 18,
	  lineHeight:21.6,
  },
  disclaimerText:{
	  paddingTop:18,
	  fontFamily:"Garamond-Italic",
	  lineHeight:18
  },
  item:{
	  width:'100%',
	borderWidth:1,
	paddingHorizontal:20,
	overflow:'hidden',
	paddingVertical:10,
	marginBottom:5
  }
})

export default Support;
