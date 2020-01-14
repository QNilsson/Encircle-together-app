import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MoreScreen = props => {
  return (
    <View style={styles.container}>
      <Text>More Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MoreScreen;