import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { useDispatch } from 'react-redux';

import { setLocation } from '../store/actions/Location';

const LocationScreen = () => {
  const [provo, setProvo] = useState(true);
  const [slc, setSlc] = useState(false);

  const dispatch = useDispatch();
  const selectedLocation = (location) => {
    dispatch(setLocation(location));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Location</Text>
      <Text style={styles.subTitle}>Choose your primary Encircle location. This will change which calendar events you see.</Text>
      <View style={styles.filterContainer}>
        <Text style={styles.filterContainerText}>Provo</Text>
        <Switch
          value={provo}
          onValueChange={v => {
            setProvo(v);
            setSlc(false);
            selectedLocation('Provo');
          }}
        />
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterContainerText}>Salt Lake City</Text>
        <Switch
          value={slc}
          onValueChange={v => {
            setSlc(v);
            setProvo(false);
            selectedLocation('Salt Lake City');
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
  title: {
    fontSize: 40,
    textAlign: 'center',
    color: '#2B2B2B',
    fontFamily: 'ModernoFB',
    marginTop: '8%'
  },
  subTitle: {
    fontSize: 20,
    color: '#686868',
    textAlign: 'center',
    margin: 8,
    marginBottom: 20,
    alignItems: 'center',
    fontFamily: 'Futura-Book',
    width: '90%'
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%',
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 8,
  },
  filterContainerText: {
    fontFamily: 'Futura-Book',
    color: '#2b2b2b',
    fontWeight: '400',
    fontSize: 18
  }
});

export default LocationScreen;
