import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { Calendar } from 'react-native-calendars';
import Event from '../models/event';
import * as eventActions from '../store/actions/Event';

const CalendarScreen = (props) => {
  const location = useSelector(state => state.location.location);
  const events = useSelector(state => state.events.events);
  const [markedItems, setMarkedItems] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    location === 'Provo' ?
    dispatch(eventActions.fetchProvoEvents()) :
    dispatch(eventActions.fetchSlcEvents());

    markItems(events);
  }, [dispatch, markItems]);

  const markItems = (eventsArray) => {
    const items = {};
    eventsArray.forEach(e => items[e.start__dateTime.split('T')[0]] = { marked: true });
    setMarkedItems(items);
    for(const i in items) {
      console.log(items[i]);
    }
  }

  return (
    <Calendar
    markedDates={markedItems}
    />
  );
};



const styles = StyleSheet.create({

});

export default CalendarScreen;
