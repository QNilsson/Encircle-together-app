import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';

export default class LocationScreen extends Component {
  render() {
    const [value, setValue] = useState(false);
    return (
      <View>
        <Text>Location Screen</Text>
        <Switch
          value={value}
          onValueChange={v => {
            setValue(v);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

});