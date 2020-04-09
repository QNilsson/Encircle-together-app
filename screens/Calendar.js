import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity,StyleSheet } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { Calendar } from 'react-native-calendars';
import * as eventActions from '../store/actions/Event';
import { Ionicons } from '@expo/vector-icons';

const CalendarScreen = (props) => {
  const dispatch = useDispatch();

  let location = useSelector(state => state.events.location);
  let events = useSelector(state => state.events.events);

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  
  let [selectedDay, setSelectedDay] = useState(today);
  let [eventList, setEventList] = useState([]);

  useEffect(() => {
    if(location === 'Provo') {
      dispatch(eventActions.fetchProvoEvents('Provo'));
    } else if(location === 'Salt Lake City') {
      dispatch(eventActions.fetchSlcEvents('Salt Lake City'));
    } else {
      dispatch(eventActions.fetchProvoEvents('Provo'));
    }
  }, [dispatch]);

  const markItems = () => {  
    let items = {};
    events.forEach(e => items[e.start__dateTime.split('T')[0]] = { marked: true });
    return items;
  };

  const onDayPress = (day) => {
    let selected = '';

    if(day.dateString) {
      selected = day.dateString;
    } else {
      selected = day;
    }
    
    setSelectedDay(selected);

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
  if(selectedDay === '') {
    date = (
      <View style={styles.eventsOnContainer}>
        <Text style={styles.eventsOnText}>Select a date to see events</Text>
      </View>
    );
  }
  else if(!eventList[selectedDay]) {
    date = (
      <View style={styles.eventsOnContainer}>
        <Text style={styles.eventsOnText}>NO EVENTS ON <Text style={styles.selectedDayText}>{ selectedDay }</Text></Text>
      </View>
    );
  } else {
    date = (
      <View style={styles.eventsOnContainer}>
        <Text style={styles.eventsOnText}>EVENTS ON <Text style={styles.selectedDayText}>{ selectedDay }</Text></Text>
      </View>
    );
  }

  return (
    <View>
      <View>
        <Calendar
        markedDates={markItems()}
        onDayPress={onDayPress.bind(this)}
        hideExtraDays
        style={styles.calendar}
        />
      </View>
      <View>{ date }</View>
      <View style={styles.eventListContainer}>
      {/* { date }
 */}
        {/* <FlatList
        style={{flex:1}}
        data={eventList[selectedDay]}
        keyExtractor={event => event.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity style={styles.textIconContainer} onPress={() => props.navigation.navigate("Event", {
              id: item.id,
              summ: item.summ,
              start: item.start,
              end: item.end,
              loc: item.loc,
              desc: item.desc
            })}><Text style={styles.eventSummaryText}>{item.summ}</Text>
                <Ionicons name="ios-arrow-forward" size={20} color="#686868" style={styles.arrowIcon}/>
            </TouchableOpacity>
          </View>
        )}
        /> */}
        
        <FlatList 
          data={eventList[selectedDay]}
          keyExtractor={event => event.id}
          renderItem={({item}) => (
            <Text>{item.summ}</Text>
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
  eventsOnContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2B2B2B',
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 15,
    marginRight: '10%',
    marginLeft: '10%', 
    marginTop: 5 
  },
  eventsOnText: {
    color: '#2B2B2B',
    fontFamily: 'Futura-Book',
    fontWeight: '700',
    padding: 0
  },
  selectedDayText: {
    color: '#686868',
    fontWeight: '700'
  },
  textIconContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  eventSummaryText: {
    fontFamily: 'Futura-Book',
    color: '#2B2B2B',
    fontWeight: '700'
  },
  arrowIcon: {
    marginLeft: 'auto'
  },
  eventListContainer: {
    borderWidth: 1,
    borderColor: '#2B2B2B',
    borderRadius: 30,
    backgroundColor: 'white',
    paddingLeft: 12,
    paddingRight: 12,
    height: '100%',
    marginTop: 12,    
  },
 
});

export default CalendarScreen;
