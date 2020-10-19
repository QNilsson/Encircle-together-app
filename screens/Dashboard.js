import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
// imports card component - styled event containers
import Card from '../components/Card';
// imports resource component - styled resource containers
import Resource from '../components/Resource';
// imports dashboard welcome component - styled header container
import DashboardWelcome from '../components/DashboardWelcome';
// imports expo icons
import { Ionicons } from '@expo/vector-icons';
// imports store actions to dispatch
import * as eventActions from '../store/actions/Event';
// imports store actions to dispatch
import * as resourceActions from '../store/actions/Resource';

import Calendar from '../screens/Calendar';

const Dashboard = (props) => {
  // pulls set location from store (provo default)
  let location = useSelector(state => state.events.location);
  // pulls events from store (based on selected location)
  let events = useSelector(state => state.events.todaysEvents);
  // pulls resources from store
  let resources = useSelector(state => state.resources.resources);

  const dispatch = useDispatch();

  // updates component when a new location is selected - loads resources from issuu api
  useEffect(() => {
    dispatch(eventActions.fetchTodaysEvents(location));
    dispatch(resourceActions.fetchResources());
  }, [dispatch]);

  return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.mainContainer}>
        <SafeAreaView>
          <DashboardWelcome />
        </SafeAreaView>
          <View style={styles.container}>
            <View style={styles.eventContainter}>
              <Text style={styles.location}>LATER TODAY IN <Text style={styles.locationText}>{location.toUpperCase()}</Text></Text>
              
              {events.map(event => 
              <TouchableOpacity style={styles.eventBox} onPress={() => props.navigation.navigate('Event',
              {
                id: event.id,
                summ: event.summary,
                start: event.start,
                end: event.end,
                loc: event.location,
                desc: event.description
              })}>
                 
                
              <Card style={styles.event} key={event.id} time={event.start__dateTime} summary={event.summary}></Card></TouchableOpacity> )}
              
            </View>
            
            <TouchableOpacity
              style={styles.calendarButton}
              onPress={() => props.navigation.navigate('Calendar')}>
              <Text style={styles.buttonText}>FULL CALENDAR</Text>
              <Ionicons name="ios-arrow-round-forward" size={45} style={styles.arrowIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <View style={styles.publicationContainter}>
            <Text style={styles.resourcesHeading}>POPULAR RESOURCES</Text>
              <ScrollView horizontal={true}>
                {resources.map(resource => <Resource key={resource.docId} id={resource.docId} name={resource.name} title={resource.title} navigation={props.navigation} />)}
              </ScrollView>
            </View>
          </View>
        </View>
        <View style={{height: 125, backgroundColor: '#f2f2f2'}}></View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  eventContainter: {
    flex: 1,
    alignItems: 'center'
  },
  location: {
    color: '#2B2B2B',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15
  },
  locationText: {
    color: '#686868'
  },
  resourcesHeading: {
    alignSelf: 'flex-start',
    color: '#2B2B2B',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    paddingLeft: 12
  },
  event: {
    marginBottom: 12
  },
  calendarButton: {
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    paddingRight: 30,
    paddingLeft: 30,
    backgroundColor: 'black',
    minWidth: 250,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    textAlign: 'center',
    marginTop:5
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  },
  arrowIcon: {
    color: 'white',
    marginLeft: 'auto',
    fontWeight: '700'
  },
  publicationContainter: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
    paddingBottom: 30,
    paddingTop: 30,
    marginHorizontal: 10
  },
  eventBox:{
    width:500,
    height:90,
    margin:'auto',
    marginLeft:120,
  }
});

export default Dashboard;