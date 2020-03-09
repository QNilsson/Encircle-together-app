import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { useDispatch } from 'react-redux';

import { setLocation } from '../store/actions/Location';

const LocationScreen = () => {
  const [provo, setProvo] = useState(false);
  const [slc, setSlc] = useState(false);

  const dispatch = useDispatch();
  const selectedLocation = (location) => {
    dispatch(setLocation(location));
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Text>Provo</Text>
        <Switch
          value={provo}
          onValueChange={v => {
            setProvo(v);
            setSlc(false);
            selectedLocation('provo');
          }}
        />
      </View>

      <View style={styles.filterContainer}>
        <Text>Salt Lake City</Text>
        <Switch
          value={slc}
          onValueChange={v => {
            setSlc(v);
            setProvo(false);
            selectedLocation('slc');
          }}
        />
      </View>
    </View>
  );
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

export default LocationScreen;