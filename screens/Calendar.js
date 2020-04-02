import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { Calendar } from 'react-native-calendars';
import * as eventActions from '../store/actions/Event';

const CalendarScreen = () => {
  const dispatch = useDispatch();

  let location = useSelector(state => state.events.location);
  let events = useSelector(state => state.events.events);
  let eventList = [];
  let selectedDay = '';
  

  useEffect(() => {
    if(location === 'Provo') {
      dispatch(eventActions.fetchProvoEvents('Provo'));
    } else if(location === 'Salt Lake City') {
      dispatch(eventActions.fetchSlcEvents('Salt Lake City'));
    }
  }, [dispatch]);

  const markItems = () => {  
    let items = {};
    events.forEach(e => items[e.start__dateTime.split('T')[0]] = { marked: true });
    return items;
  }

  const onDayPress = (day) => {
    console.log(day);
    let selected = day.dateString;
    selectedDay = selected;

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
    eventList = list;
  }
  
  

  return (
    <View>
      <View>
        <Calendar
        markedDates={markItems()}
        onDayPress={onDayPress.bind(this)}
        style={styles.calendar}
        />
      </View>
      
      <View style={styles.eventListContainer}>
        <FlatList
        style={{flex: 1}}
        data={eventList[selectedDay]}
        keyExtractor={event => event.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.summ}</Text>
          </View>
        )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    marginTop: 50,
    marginBottom: 10
  },
  item: {
    backgroundColor: '#fff',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#777777',
    padding: 20,
    marginTop: 17,
    color: 'black'
  },
  eventListContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 16,
    backgroundColor: '#ddd',
    paddingLeft: 12,
    paddingRight: 12,
    height: '100%'
  },
 
});

export default CalendarScreen;
