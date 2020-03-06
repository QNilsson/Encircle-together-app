import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';

export default class LocationScreen extends Component {
  render() {
    const [provo, setProvo] = useState(false);
    const [slc, setSlc] = useState(false)
    return (
      <View>
        <Text>Location Screen</Text>
        <Switch
          value={provo}
          onValueChange={v => {
            setProvo(v);
          }}
        />
        <Switch
          value={slc}
          onValueChange={v => {
            setSlc(v);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

});