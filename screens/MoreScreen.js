import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';

const MoreScreen = props => {
  return (
      <View style={styles.container}>
        <View>
          <Button title="Locations" onPress={() => props.navigation.navigate('Location')}/>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MoreScreen;
