import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

import Event from '../models/event';
import { Agenda } from 'react-native-calendars';

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {},
      events: []
    };
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents = () => {
    // let url = 'https://zappier-test.firebaseio.com/cal-events.json';
    const CALENDAR_ID = 'jn.web.developer%40gmail.com';
    const API_KEY = 'AIzaSyDg7_XJNVaiMIOkgSqZfZ6ivpBhnyv6UIQ';
    //const date = new Date();
    let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?maxResults=1&orderBy=startTime&singleEvents=true&timeMin=2020-01-01T00%3A00%3A00Z&key=${API_KEY}`;
    fetch(url)
      .then((res) => res.json())
      .then((resData) => {
        //console.log(resData.items);
        const eventData = [];
        for (const key in resData.items) {
          eventData.push(
            new Event(
              resData.items[key].id,
              resData.items[key].creator.email,
              resData.items[key].description,
              resData.items[key].end.dateTime,
              resData.items[key].start.dateTime,
              resData.items[key].summary,
              resData.items[key].location)
          );
        }
        this.setState({
          events: eventData
        });
        console.log(eventData);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={Date()}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        pastScrollRange={1}
        futureScrollRange={1}
        markedDates={{
          '2020-01-08': { marked: true },
          '2020-01-09': { marked: true },
          '2020-01-14': { marked: true },
          '2020-01-21': { marked: true },
          '2020-01-22': { marked: true },
        }}
      // monthFormat={'yyyy'}
      // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
      //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      />
    );
  }

  loadItems() {
    const newItems = {};

    this.state.events.forEach(e => newItems[e.start__dateTime.split('T')[0]] = []);

    this.setState({
      items: newItems
    });
  }

  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}><Text>{item.name}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split(' ')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});