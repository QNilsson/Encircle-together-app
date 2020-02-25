import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class DashboardScreen extends Component {
  static navigationOptions = {
    title: 'Dashboard Screen'
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>dashboard Screen</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
