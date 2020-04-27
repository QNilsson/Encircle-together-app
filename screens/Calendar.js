import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
// imports calendar component (https://github.com/wix/react-native-calendars)
import { Calendar } from 'react-native-calendars';
// imports store actions to dispatch
import * as eventActions from '../store/actions/Event';
// imports expo icons
import { Ionicons } from '@expo/vector-icons';
// imports android SafeAreaView workaround
import SafeViewAndroid from '../constants/SafeViewAndroid';

const CalendarScreen = (props) => {
  const dispatch = useDispatch();

  // pulls set location from store (provo default)
  let location = useSelector(state => state.events.location);
  // pulls events from store (based on selected location)
  let events = useSelector(state => state.events.events);

  // sets date to today
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;

  // stores selected date on calendar (initialized to today)
  let [selectedDay, setSelectedDay] = useState(today);
  // stores list of events for selected day
  let [eventList, setEventList] = useState([]);
  // track when events from store are loaded
  let [isLoading, setIsLoading] = useState(events.length > 0 ? false : true);

  // updates component when a new location is selected - loads events from google api (https://developers.google.com/calendar)
  useEffect(() => {
    if (location === 'Provo') {
      dispatch(eventActions.fetchProvoEvents('Provo'));
    } else if (location === 'Salt Lake City') {
      dispatch(eventActions.fetchSlcEvents('Salt Lake City'));
    } else {
      dispatch(eventActions.fetchProvoEvents('Provo'));
    }
  }, [dispatch]);

  // marks dates on calendar
  const markItems = () => {
    let items = {};

    events.forEach(e => items[e.start__dateTime.split('T')[0]] = { marked: true, dotColor: 'tomato', selectedDotColor: 'tomato' });

    return items;
  };

  // triggered when a day is selected - creates a list of events for the day
  const onDayPress = (day) => {
    let selected = '';

    if (day.dateString) {
      selected = day.dateString;
    } else {
      selected = day;
    }

    setSelectedDay(selected);

    // creates object array of events for selected day
    let list = {};
    events.forEach(e => {
      let strTime = e.start__dateTime.split('T')[0];

      if (!list[strTime]) {
        list[strTime] = [];

        list[strTime].push({
          id: e.id,
          summ: e.summary,
          desc: e.description,
          loc: e.location,
          start: e.start__dateTime.split('T')[1].split('-')[0].slice(0, 5),
          end: e.end__dateTime.split('T')[1].split('-')[0].slice(0, 5),
          height: 200
        });
      } else {
        list[strTime].push({
          id: e.id,
          summ: e.summary,
          desc: e.description,
          loc: e.location,
          start: e.start__dateTime.split('T')[1].split('-')[0].slice(0, 5),
          end: e.end__dateTime.split('T')[1].split('-')[0].slice(0, 5),
          height: 200
        });
      }
    });

    setEventList(list);
  };

  let date;
  // conditional text to display for selected day
  if (selectedDay === '') {
    date = <Text style={styles.eventsOnText}>Select a date to see events</Text>;
  } else if (!eventList[selectedDay]) {
    date = <Text style={styles.eventsOnText}>NO EVENTS ON <Text style={styles.selectedDayText}>{selectedDay}</Text></Text>;
  } else {
    date = <Text style={styles.eventsOnText}>EVENTS ON <Text style={styles.selectedDayText}>{selectedDay}</Text></Text>;
  }
  
  
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        <Calendar
          markedDates={markItems()}
          onDayPress={onDayPress.bind(this)}
          hideExtraDays
          style={styles.calendar}
          theme={{
            calendarBackground: '#f2f2f2',
            selectedDayTextColor: '#2B2B2B',
            todayTextColor: 'tomato',
            dayTextColor: '#2B2B2B',
            arrowColor: '#2B2B2B',
            dotColor: 'tomato',
            selectedDotColor: 'tomato',
            textDayFontFamily: 'Futura-Medium',
            textMonthFontFamily: 'Futura-Medium',
            textDayHeaderFontFamily: 'Futura-Light',
            textDayFontSize: 14,
            textMonthFontSize: 24,
            textDayHeaderFontSize: 14
          }}
        />
      </SafeAreaView>
      
      <View style={{zIndex: 100}}>
        <View style={styles.eventsOnContainer}>
          { date }
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <ScrollView style={styles.eventListContainer}>
          <FlatList
            style={{ paddingTop: 25, paddingBottom: 50, flex: 1 }}
            data={eventList[selectedDay]}
            keyExtractor={event => event.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <TouchableOpacity style={styles.textIconContainer}
                // navigates to event screen - sends event data as parameters
                  onPress={() => props.navigation.navigate("Event",
                    {
                      id: item.id,
                      summ: item.summ,
                      start: item.start,
                      end: item.end,
                      loc: item.loc,
                      desc: item.desc
                    }
                  )}>
                  <View>
                    <View style={styles.eventTimeLoc}>
                      <Text><Ionicons name="ios-clock" size={16} color="#686868" /> { item.start }    <Ionicons name="ios-pin" size={16} color="#686868" /> { location }</Text>
                    </View>
                    <View>
                      <Text style={styles.eventSummaryText}>{ item.summ }</Text>
                    </View>
                  </View>
                  
                  <Ionicons name="ios-arrow-forward" size={20} color="#686868" style={styles.arrowIcon} />
                </TouchableOpacity>
              </View>
            )}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    paddingBottom: 10
  },
  eventsOnContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 100,
    borderWidth: 1,
    borderColor: '#2B2B2B',
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
    marginRight: '10%',
    marginLeft: '10%',
    width: '75%',
    position: 'absolute',
    top: -5
  },
  eventsOnText: {
    color: '#2B2B2B',
    fontFamily: 'Futura-Medium',
  },
  selectedDayText: {
    color: '#686868',
    fontFamily: 'Futura-Book',
  },
  item: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#999999',
    paddingVertical: 25,
    paddingHorizontal: 20,
    color: '#2B2B2B',
    justifyContent: 'center',
    alignContent: 'space-between'
  },
  textIconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  eventSummaryText: {
    flex: 1,
    fontFamily: 'Futura-Medium',
    color: '#2B2B2B',
  },
  arrowIcon: {
    marginLeft: 'auto',
    marginVertical: 'auto'
  },
  eventListContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    paddingLeft: 12,
    paddingRight: 12,
    height: '100%',
    marginTop: 15,
    marginBottom: 50
  }
});

export default CalendarScreen;
