import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import Card from '../components/Card';
import Resource from '../components/Resource';
import DashboardWelcome from '../components/DashboardWelcome';
import { Ionicons } from '@expo/vector-icons';
import * as eventActions from '../store/actions/Event';
import * as resourceActions from '../store/actions/Resource';

const Dashboard = (props) => {
  let location = useSelector(state => state.events.location);
  let events = useSelector(state => state.events.todaysEvents);
  let resources = useSelector(state => state.resources.resources);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(eventActions.fetchTodaysEvents(location));
    dispatch(resourceActions.fetchResources());
  }, [dispatch]);

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <DashboardWelcome />
        <View style={styles.container}>
          <View style={styles.eventContainter}>
            <Text style={styles.location}>LATER TODAY IN <Text style={styles.locationText}>{location.toUpperCase()}</Text></Text>
            {events.map(event => <Card style={styles.event} key={event.id} time={event.start__dateTime} summary={event.summary}></Card>)}
          </View>
          <TouchableOpacity
            style={styles.calendarButton}
            onPress={() => props.navigation.navigate('Calendar')}
          >
            <Text style={styles.buttonText}>FULL CALENDAR</Text>
            <Ionicons name="ios-arrow-round-forward" size={45} style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <View style={styles.publicationContainter}>
            <Text style={styles.location}>POPULAR RESOURCES</Text>
            <ScrollView horizontal={true}>
              {resources.map(resource => <Resource key={resource.docId} id={resource.docId} name={resource.name} title={resource.title} navigation={props.navigation} />)}
            </ScrollView>
          </View>
        </View>
      </View>
    </ScrollView>
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
    width:'100%',
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
    marginTop: 40
  },
  publication: {

  }
});

export default Dashboard;
