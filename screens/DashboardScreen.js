import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DashboardScreen = props => {
  return (
    <View style={styles.container}>
      <Text>dashboard Screen</Text>
    </View>
  );
};

DashboardScreen.navigationOptions = {
  headerTitle: 'Dashboard'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DashboardScreen;