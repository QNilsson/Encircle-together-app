import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import Card from '../components/Card';
import Resource from '../components/Resource';
import DashboardWelcome from '../components/DashboardWelcome';
import * as eventActions from '../store/actions/Event';
import * as resourceActions from '../store/actions/Resource';

const Dashboard = (props) => {
  let location = useSelector(state => state.events.location);
  let events = useSelector(state => state.events.location);
  let resources = useSelector(state => state.resources.resources);

  const dispatch = useDispatch();

  useEffect(() => {
    if(location === 'Provo') {
      dispatch(eventActions.fetchProvoEvents('Provo'));
    } else if(location === 'Salt Lake City') {
      dispatch(eventActions.fetchSlcEvents('Salt Lake City'));
    } else {
      dispatch(eventActions.fetchProvoEvents('Provo'));
    }
    dispatch(resourceActions.fetchResources());
  }, [dispatch]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        {/* <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subTitle}>Make today a great day.</Text>
          </View> */}
        <DashboardWelcome />
        <View style={styles.eventContainter}>
          <Text style={styles.location}>LATER TODAY IN <Text style={styles.locationText}>{location.toUpperCase()}</Text></Text>
          {events.map(event => <Card style={styles.event} key={event.id} time={event.start__dateTime} summary={event.summary}></Card>)}
        </View>

        <View style={styles.publicationContainter}>
          <Text>POPULAR RESOURCES</Text>
          <ScrollView horizontal={true}>
            { resources.map(resource => <Resource id={resource.docId} name={resource.name} title={resource.title} />) }
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // margin: 20,
    // marginTop: 100,
    // marginBottom: 50,
    backgroundColor: '#F5F5F5'
  },
  titleContainer: {
    backgroundColor: 'white',
    width: '100%',
    padding: 20,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2B2B2B',

    paddingLeft: 12,
    paddingRight: 12,
    top: 0,
    // height: '100%',

  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    color: '#2B2B2B',
    marginTop: '20%'
    // fontFamily: 'ModernoFB',
  },
  subTitle: {
    fontSize: 18,
    color: '#686868',
    textAlign: 'center',
    margin: 8,
    marginBottom: 20,
    alignItems: 'center',
    // fontFamily: 'Futura-Book'
  },
  eventContainter: {
    flex: 1,
    alignItems: 'center'
  },
  location: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 15
  },
  locationText: {
    color: '#686868'
  },

  event: {
    marginBottom: 10
  },
  publicationContainter: {
    flex: 1,
    alignItems: 'center'
  },
  publication: {

  }
});

export default Dashboard;
