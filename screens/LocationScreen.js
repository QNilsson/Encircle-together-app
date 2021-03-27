import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';

// imports store actions to dispatch
import * as eventActions from '../store/actions/Event';



const LocationScreen = () => {
  // controls on/off for provo switch (app default)
  const [provo, setProvo] = useState(true);
  // controls on/off for salt lake city switch 
  const [slc, setSlc] = useState(false);

  const dispatch = useDispatch();

 
  // method used to update events in store based on selected location
  const selectedLocation = (location) => {
    if(location === 'Provo') {
      dispatch(eventActions.fetchProvoEvents(location));
      dispatch(eventActions.fetchTodaysEvents(location));
    } else if(location === 'Salt Lake City') {
      dispatch(eventActions.fetchSlcEvents(location));
      dispatch(eventActions.fetchTodaysEvents(location));
    } else {
      dispatch(eventActions.fetchProvoEvents(location));
      dispatch(eventActions.fetchTodaysEvents(location));
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
    </SafeAreaView>
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
    fontFamily: 'Garamond-Regular',
    marginTop: '20%'
  },
  subTitle: {
    fontSize: 20,
    color: '#686868',
    textAlign: 'center',
    margin: 8,
    marginBottom: 20,
    alignItems: 'center',
    fontFamily: 'Clarendon-Regular',
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
    fontFamily: 'Clarendon-Regular',
    color: '#2b2b2b',
    fontWeight: '400',
    fontSize: 18
  }
});

export default LocationScreen;
