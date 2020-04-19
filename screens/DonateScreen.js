import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { WebView } from 'react-native-webview';

export default class DonateScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: 'https://encircletogether.org/donate'
    };
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <WebView
          style={{ flex:1 }}
          androidHardwareAccelerationDisabled
          source={{ uri: this.state.url }}
        />
      </SafeAreaView>
    )
  }
};
