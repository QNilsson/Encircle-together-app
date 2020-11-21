import React, {useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
// imports card component - styled event containers
import Card from '../components/Card';
// imports resource component - styled resource containers
import Resource from '../components/Resource';
// imports dashboard welcome component - styled header container
import DashboardWelcome from '../components/DashboardWelcome';
// imports expo icons
import {Ionicons} from '@expo/vector-icons';
// imports store actions to dispatch
import * as eventActions from '../store/actions/Event';
// imports store actions to dispatch
import * as resourceActions from '../store/actions/Resource';

const Dashboard = props => {
  // pulls set location from store (provo default)
  let location = useSelector (state => state.events.location);
  // pulls events from store (based on selected location)
  let events = useSelector (state => state.events.todaysEvents);
  // pulls resources from store
  let resources = useSelector (state => state.resources.resources);

  const dispatch = useDispatch ();

  //prepare to get month names
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // sets date to today
  let today = new Date ();
  let dd = String (today.getDate ()).padStart (2, '0');
  let mm = String (today.getMonth () + 1).padStart (2, '0');
  let monthName = monthNames[today.getMonth ()].toUpperCase ();
  let yyyy = today.getFullYear ();
  today = mm + ' ' + dd + ', ' + yyyy;
  let todayName = monthName + ' ' + dd + ',' + ' ' + yyyy;

  //trying to get correct time

  
    
      
      const timeConversion = x => {
        let output = [];
        x = x.split (':');
        if (Number (x[0]) == 24) {
          x[0] = '12';
          output.push (x[0] + ':' + x[1]);
          output.push ('AM');
        } else if (Number (x[0]) == 12) {
          output.push (x[0] + ':' + x[1]);
          output.push ('PM');
        } else if (Number (x[0]) > 12) {
          x[0] = Number (x[0]) - 12;
          x[0] = x[0].toString ();
          output.push (x[0] + ':' + x[1]);
          output.push ('PM');
        } else {
          output.push (x[0] + ':' + x[1]);
          output.push ('AM');
        }
        return output;
      };

      // let timeStart = timeConversion (
      //   event.start__dateTime.split ('T')[1].split ('-')[0].slice (0, 5)
      // );
      // let timeEnd = timeConversion (
      //   event.end__dateTime.split ('T')[1].split ('-')[0].slice (0, 5)
      // );
      // let timeStampStart = timeStart[1];
      // let timeStampEnd = timeEnd[1];
      // let timeStart = timeStart[0];
      // let timeEnd = timeEnd[0];

      
    
  

  // updates component when a new location is selected - loads resources from issuu api
  useEffect (
    () => {
      dispatch (eventActions.fetchTodaysEvents (location));
      dispatch (resourceActions.fetchResources ());
    },
    [dispatch]
  );

  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.mainContainer}>
        <SafeAreaView>
          <DashboardWelcome />
        </SafeAreaView>
        <View style={styles.container}>
          <View style={styles.dateContain}>
            <Text style={styles.todayDate}>
              {todayName}

            </Text>
          </View>
          <View style={styles.eventContainter}>

            {events.map (event => (
              
              
                
              <TouchableOpacity
              onPress={() =>
                props.navigation.navigate ('Event', {
                  id: event.id,
                  summ: event.summary,
                 
                  start: timeConversion(event.start__dateTime.split ('T')[1].split ('-')[0].slice (0, 5)),
                  end: timeConversion(event.end__dateTime.split('T')[1].split ('-')[0].slice (0, 5)),
                  // endstamp: event.timeStampEnd,
                  loc: event.location,
                  desc: event.description,
                })}>
                <Card
                  style={styles.event}
                  key={event.id}
                 start={event.start__dateTime.split('T')[1].split ('-')[0].slice (0,5)}
                  end={event.end__dateTime.split('T')[1].split ('-')[0].slice(0,5)}
                 
                  summary={event.summary}
                />
              </TouchableOpacity>
            ))}

          </View>

          <TouchableOpacity
            style={styles.calendarButton}
            onPress={() => props.navigation.navigate ('Calendar')}
          >
            <Text style={styles.buttonText}>See Full Calendar</Text>

          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <View style={styles.publicationContainter}>
            <Text style={styles.resourcesHeading}>POPULAR RESOURCES</Text>
            <ScrollView horizontal={true}>
              {resources.map (resource => (
                <Resource
                  key={resource.docId}
                  id={resource.docId}
                  name={resource.name}
                  title={resource.title}
                  navigation={props.navigation}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
      <View style={{height: 125, backgroundColor: '#f2f2f2'}} />
    </ScrollView>
  )};


const styles = StyleSheet.create ({
  mainContainer: {
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // dateContain: {
  //   flex: 1,
  //   alignItems: 'flex-start',
  // },
  eventContainter: {
    flex: 1,
    alignItems: 'center',
    marginBottom:220
  },
  todayDate: {
    color: '#222222',
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 25,
    marginTop: 25,
    marginRight: 85,
    fontFamily: 'Clarendon',
  },
  locationText: {
    color: '#686868',
  },
  resourcesHeading: {
    alignSelf: 'flex-start',
    color: '#b6acab',
    fontSize: 16,
    letterSpacing: 2,
    fontWeight: '600',
    marginBottom: 15,
    paddingLeft: 12,
    fontFamily: 'Garamond',
  },
  event: {
    marginBottom: 12,
  },
  calendarButton: {
    display: 'flex',
    flexDirection: 'row',
    padding: 4,
    paddingRight: 30,
    paddingLeft: 30,
    borderRadius: 10,
    backgroundColor: 'black',
    minWidth: 250,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    textAlign: 'center',
    marginTop: 20,
    shadowColor: '#b6acab',
    shadowOffset: {
      width: 5,
      height: 4,
    },
    shadowOpacity: 0.3,
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Din-Bold',
  },
  arrowIcon: {
    color: 'white',
    marginLeft: 'auto',
    fontWeight: '700',
  },
  publicationContainter: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
    paddingBottom: 30,
    paddingTop: 30,
    marginHorizontal: 10,
    fontFamily: 'Din-Bold',
  },
  eventBox: {
    width: 500,
    height: 90,
    margin: 'auto',
    marginLeft: 120,
  },
});

export default Dashboard;
