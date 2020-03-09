import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
      <WebView
        androidHardwareAccelerationDisabled
        source={{ uri: this.state.url }}
      />
    )
  }
};
