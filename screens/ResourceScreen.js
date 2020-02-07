import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { WebView } from 'react-native-webview';

const ResourceScreen = (props) => {
  const title = props.navigation.getParam('resourceTitle');
  console.log(title);
  return(
    <View>
      <Text>Resource</Text>
    </View>
  )
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