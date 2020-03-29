import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { Calendar } from 'react-native-calendars';
import Event from '../models/event';
import * as eventActions from '../store/actions/Event';

const CalendarScreen = (props) => {
  const location = useSelector(state => state.location.location);
  console.log(location);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(eventActions.fetchProvoEvents());
  })

  return (
    <Calendar
    />
  );
};

const styles = StyleSheet.create({

});

export default CalendarScreen;
