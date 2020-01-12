import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ResourcesScreen = props => {
  return (
    <View style={styles.container}>
      <Text>Resources Screen</Text>
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

export default ResourcesScreen;