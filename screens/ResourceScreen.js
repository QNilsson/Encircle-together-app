import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { WebView } from 'react-native-webview';

const ResourceScreen = (props) => {
  const name = props.navigation.getParam('resourceName');
  let url = '';

  switch(name) {
    case 'gsatoolkit':
      url = 'https://issuu.com/encircletogether/docs/gsatoolkit/s/10192081';
      break;
    case 'encircle_magazine_draft__2':
      url = 'https://issuu.com/encircletogether/docs/encircle_magazine_draft__2/s/10297797';
      break;
    case 'explanation_of_homosexuality':
      url = 'https://issuu.com/encircletogether/docs/explanation_of_homosexuality/s/10297790';
      break;
    case 'soce_12.9.17':
      url = 'https://issuu.com/encircletogether/docs/soce_12.9.17/s/10297478';
      break;
    case 'gregprince_12.9.17':
      url = 'https://issuu.com/encircletogether/docs/gregprince_12.9.17/s/10283847';
      break;
    case '_3_admirationoranimosity_12.9.17':
      url = 'https://issuu.com/encircletogether/docs/_3_admirationoranimosity_12.9.17/s/10224048';
      break;
    case 'contrast-series3_final':
      url = 'https://issuu.com/encircletogether/docs/contrast-series3_final/s/10297880';
      break;
    case 'aparentsguide':
      url = 'https://issuu.com/encircletogether/docs/aparentsguide/s/10224030';
      break;
    case 'whataboutgender':
      url = 'https://issuu.com/encircletogether/docs/whataboutgender/s/10224013';
      break;
    case 'admiration_spa':
      url = 'https://issuu.com/encircletogether/docs/admiration_spa/s/10297809';
      break;
    case 'sciencedogma_spa':
      url = 'https://issuu.com/encircletogether/docs/sciencedogma_spa/s/10297803';
      break;
    case 'sexualorientation_spa':
      url = 'https://issuu.com/encircletogether/docs/sexualorientation_spa/s/10297802';
      break;
    case 'explanation_spa':
      url = 'https://issuu.com/encircletogether/docs/explanation_spa/s/10297801';
      break;
    case 'whataboutgender_spa':
      url = 'https://issuu.com/encircletogether/docs/whataboutgender_spa/s/10297799';
      break;
    default:
      url = '';
  }

  return(
    <SafeAreaView style={{flex: 1}}>
      <WebView
      style={{flex: 1}}
      androidHardwareAccelerationDisabled
      source={{ uri: url }}
      />
    </SafeAreaView>
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
