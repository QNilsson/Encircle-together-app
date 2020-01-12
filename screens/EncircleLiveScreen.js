import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const EncircleLiveScreen = props => {
  return (
    <View style={styles.container}>
      <Text>Encircle Live Screen</Text>
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

export default EncircleLiveScreen;