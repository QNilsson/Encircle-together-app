import React, { Component } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';

export default class LocationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      provo: false,
      slc: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Provo</Text>
        <View style={styles.filterContainer}>
          <Switch
            value={this.state.provo}
            onValueChange={v => this.setState({ provo: v, slc: false })}
          />
        </View>
        <View style={styles.filterContainer}>
          <Text>Salt Lake City</Text>
          <Switch
            value={this.state.slc}
            onValueChange={v => this.setState({ slc: v, provo: false })}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});