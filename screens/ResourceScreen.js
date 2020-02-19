import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { WebView } from 'react-native-webview';

const ResourceScreen = (props) => {
  const name = props.navigation.getParam('resourceName');
  // let url = '';
  // switch(name) {
  //   case 'gsatoolkit':
  //     url = '';
  //     break;
  //   default:
  //     url = '';https://issuu.com/encircletogether/docs/${name}
  // }
  const url = `https://issuu.com/encircletogether/docs/gsatoolkit/s/10192081`;
  
  
  return(
    <WebView
    androidHardwareAccelerationDisabled
    source={{uri: url}}
    />
  )
};

ResourceScreen.navigationOptions = () => {
  return {
    title: 'Resource Screen'
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default ResourceScreen;