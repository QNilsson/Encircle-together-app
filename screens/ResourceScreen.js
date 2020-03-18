import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { WebView } from 'react-native-webview';

const ResourceScreen = (props) => {
  const name = props.navigation.getParam('resourceName');
  let url = '';

  switch(name) {
    case 'gsatoolkit':
      url = 'https://issuu.com/encircletogether/docs/gsatoolkit/s/10192081';
      break;
    case 'encircle_magazine_draft__2':
      url = '';
      break;
    case 'explanation_of_homosexuality':
      url = '';
      break;
    case 'soce_12.9.17':
      url = '';
      break;
    case 'gregprince_12.9.17':
      url = '';
      break;
    case '_3_admirationoranimosity_12.9.17':
      url = '';
      break;
    case 'contrast-series3_final':
      url = '';
      break;
    case 'aparentsguide':
      url = '';
      break;
    case 'whataboutgender':
      url = '';
      break;
    case 'admiration_spa':
      url = '';
      break;
    case 'sciencedogma_spa':
      url = '';
      break;
    case 'sexualorientation_spa':
      url = '';
      break;
    case 'explanation_spa':
      url = '';
      break;
    case 'whataboutgender_spa':
      url = '';
      break;
    default:
      url = '';
  }

  return(
    <WebView
    androidHardwareAccelerationDisabled
    source={{ uri: url }}
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
