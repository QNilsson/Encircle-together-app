import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { Calendar } from 'react-native-calendars';
import Event from '../models/event';
import * as eventActions from '../store/actions/Event';

const CalendarScreen = () => {
  const dispatch = useDispatch();

  let location = useSelector(state => state.location.location);
  let events = useSelector(state => state.events.events);
  
  useEffect(() => {
    if(location === 'Provo') {
      dispatch(eventActions.fetchProvoEvents());
    } else if(location === 'Salt Lake City') {
      dispatch(eventActions.fetchSlcEvents());
    }

    // dispatch(eventActions.markItems());
  }, [dispatch]);

  const markItems = () => {
    let items = {};
    events.forEach(e => items[e.start__dateTime.split('T')[0]] = { marked: true });
    return items;
  }

  return (
    <Calendar
    markedDates={markItems()}
    style={styles.calendar}
    />
  );
};



const styles = StyleSheet.create({
  calendar: {
    marginTop: 50
  }
});

export default CalendarScreen;
