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

  // setting global variable to display full date on calendar
  let selectedFullDate = ''

  // sets date to today
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;

  // stores selected date on calendar (initialized to today)
  let [selectedDay, setSelectedDay] = useState('');
  let [selectedFullDay, setSelectedFullDay] = useState('');
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
  let items = {};

  const markItems = () => {
    let items = {};

    // Styling for each date with an event
    events.forEach(e => items[e.start__dateTime.split('T')[0]] = { marked: true, dotColor: '#000', selectedDotColor: '#000' });

    if (items[today]) {
      items[today] = {
        selected: true,
        marked: true,
        textColor: '#000',
        selectedTextColor: '#bbb',
        selectedColor: '#fff'
      }
    } else {
      items[today] = {
        selected: true,
        selectedColor: '#f2f2f2',
        selectedTextColor: '#000',
      }
    }

    // Styling for the currently selected date (conditional to display dot)
    if (items[selectedDay]) {
      items[selectedDay] = {
        marked: true,
        selected: true,
        textColor: '#000',
        selectedColor: '#f2f2f2',
        selectedTextColor: '#000',
        disabled: true, 
        disableTouchEvent: true,
      }
    } else {
      items[selectedDay] = {
        selected: true,
        textColor: '#000',
        selectedColor: '#f2f2f2',
        selectedTextColor: '#000',
        disabled: true, 
        disableTouchEvent: true,
      }
    }

  

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

    // changing date format
    let selectedNew = selected.split('-')
    const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    selectedFullDate = monthArray[(Number(selectedNew[1])-1)].toUpperCase()
    selectedFullDate = selectedFullDate + ' ' + selectedNew[2] + ', ' + selectedNew[0]

    setSelectedDay(selected);
    setSelectedFullDay(selectedFullDate)

    /*items = {
      selected: {selected: true, marked: true, selectedColor: 'blue'}
    }*/

    // creates object array of events for selected day
    let list = {};
    events.forEach(e => {
      let strTime = e.start__dateTime.split('T')[0];
      const timeConversion = (x) => {
        let output = []
        x = x.split(':')
        if (Number(x[0]) == 24) {
          x[0] = '12'
          output.push((x[0]+':'+x[1]))
          output.push('AM')
        } else if (Number(x[0]) == 12) {
          output.push((x[0]+':'+x[1]))
          output.push('PM')
        } else if (Number(x[0]) > 12) {
          x[0] = Number(x[0]) - 12
          x[0] = x[0].toString()
          output.push((x[0]+':'+x[1]))
          output.push('PM')
        } else {
          output.push((x[0]+':'+x[1]))
          output.push('AM')
        }
        return output
      }

      let timeStart = timeConversion(e.start__dateTime.split('T')[1].split('-')[0].slice(0, 5))
      let timeEnd = timeConversion(e.end__dateTime.split('T')[1].split('-')[0].slice(0, 5))
      let timeStampStart = timeStart[1]
      let timeStampEnd = timeEnd[1]
      timeStart = timeStart[0]
      timeEnd = timeEnd[0]

      if (!list[strTime]) {
        list[strTime] = [];

        list[strTime].push({
          id: e.id,
          summ: e.summary,
          desc: e.description,
          loc: e.location,
          start: timeStart,
          startstamp: timeStampStart,
          end: timeEnd,
          endstamp: timeStampEnd,
          height: 200
        });
      } else {
        list[strTime].push({
          id: e.id,
          summ: e.summary,
          desc: e.description,
          loc: e.location,
          start: timeStart,
          startstamp: timeStampStart,
          end: timeEnd,
          endstamp: timeStampEnd,
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
    date = <Text style={styles.selectedDayText}>{selectedFullDay}{'\n'}<Text style={{color: '#767B82', fontSize: 16}}>No Events on Selected Day</Text></Text>;
  } else {
    date = <Text style={styles.selectedDayText}>{selectedFullDay}</Text>;
  }
  
  markItems()



  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        <Calendar
          markedDates={markItems()}
          onDayPress={onDayPress.bind(this)}
          style={styles.calendar}
          monthFormat={'MMMM'}
          theme={{
            calendarBackground: '#fff',
            todayTextColor: '#000',
            dayTextColor: '#2B2B2B',
            arrowColor: '#2B2B2B',
            dotColor: '#000',
            selectedDotColor: '#000',
            textDayFontFamily: 'Garamond-Bold',
            textMonthFontFamily: 'Garamond-Regular',
            textMonthTransform: 'Uppercase',
            textDayHeaderFontFamily: 'Garamond-Regular',
            textDayHeaderColor: '#2B2B2B',
            textDayFontSize: 16,
            textMonthFontSize: 24,
            textDayHeaderFontSize: 14
          }}
        />
      </SafeAreaView>
      
      <View style={{zIndex: 100,}}>
        <View style={styles.eventsOnContainer}>
          { date }
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <SafeAreaView style={styles.eventListContainer}>
          <FlatList
            style={{ paddingTop: 25, flex: 1 }}
            data={eventList[selectedDay]}
            keyExtractor={event => event.id}
            ListFooterComponent={
              <View style={{height: 22}}/>
            }
            ListHeaderComponent={
              <View style={{height: 10}}/>
            }
            renderItem={({ item }) => (
              <View style={styles.item}>
                <TouchableOpacity style={styles.textIconContainer}
                // navigates to event screen - sends event data as parameters
                  onPress={() => props.navigation.navigate("Event",
                    {
                      id: item.id,
                      summ: item.summ,
                      start: item.start,
                      startstamp: item.startstamp,
                      end: item.end,
                      endstamp: item.endstamp,
                      loc: item.loc,
                      desc: item.desc
                    }
                  )}>
                  <View style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                    <View style={styles.eventTimeLoc}>
                      <Text style={{textAlign: 'center', justifyContent: 'center', fontFamily: 'Garamond-Bold', fontSize: 16, letterSpacing: 1.6}}>{item.start}</Text>
                      <Text style={{textAlign: 'center', justifyContent: 'center', color: '#767B82', fontFamily: 'Garamond-Regular'}}>{item.startstamp}</Text>
                    </View>
                    <View style={{flexDirection:'row', flexWrap: 'wrap',flexShrink: 1}}>
                      <Text style={[styles.eventSummaryText,]}>{ item.summ }</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    paddingBottom: 4,
  },
  eventsOnContainer: {
    alignSelf: 'center',
    zIndex: 100,
    backgroundColor: '#f9f9f9',
    color: '#2B2B2B',
    padding: 10,
    paddingVertical: 10,
    paddingLeft: 30,
    width: '100%',
    position: 'absolute',
  },
  eventsOnText: {
    color: '#767B82', 
    fontSize: 16,
    fontFamily: 'Garamond-Regular',
  },
  selectedDayText: {
    color: '#2B2B2B',
    fontSize: 22,
    fontFamily: 'Clarendon-Regular',
  },
  item: {
    flex: 1,
    marginBottom: 12,
    marginHorizontal: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    color: '#2B2B2B',
    justifyContent: 'center',
    alignContent: 'space-between',
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.09
  },
  textIconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: -130,
    alignItems: 'center',
  },
  eventSummaryText: {
    flexShrink: 1,
    fontFamily: 'Clarendon-Regular',
    color: '#2B2B2B',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  arrowIcon: {
    marginLeft: 'auto',
    marginVertical: 'auto'
  },
  eventListContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingLeft: 12,
    paddingRight: 12,
    height: '100%',
    marginTop: 15,
  },
  eventTimeLoc: {
    borderStyle: 'solid',
    borderRightWidth: 2,
    borderRightColor: '#D4D6D8',
    paddingRight: 5,
    marginLeft: -10,
    marginRight: 10,
    paddingVertical: 10,
    alignItems: 'center',
    width: '20%'
  }
});

export default CalendarScreen;
