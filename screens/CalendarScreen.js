import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Event from '../models/event';
import { Agenda } from 'react-native-calendars';

export default class CalendarScreen extends Component {
  static navigationOptions = {
    title: 'Calendar'
  };

  constructor(props) {
    super(props);

    this.state = {
      items: {},
      markedItems: {},
      events: []
    };
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents = () => {
    // Provo cal id = encircletogether.org_3739393730353231353232@resource.calendar.google.com
    // SLC cal id = encircletogether.org_3231333930393634323835@resource.calendar.google.com
    // const CALENDAR_ID = 'jn.web.developer%40gmail.com'; 
    const CALENDAR_ID = 'encircletogether.org_3739393730353231353232@resource.calendar.google.com';
    const API_KEY = 'AIzaSyDg7_XJNVaiMIOkgSqZfZ6ivpBhnyv6UIQ';
    const DATE = new Date().toISOString();
    let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?maxResults=20&orderBy=startTime&singleEvents=true&timeMin=${DATE}&key=${API_KEY}`;

    fetch(url)
      .then((res) => res.json())
      .then((resData) => {
        const events = resData.items;
        const eventData = [];
        
        for (const key in events) {
          eventData.push(
            new Event(
              events[key].id,
              events[key].creator.email,
              events[key].description,
              events[key].end.dateTime,
              events[key].start.dateTime,
              events[key].summary,
              events[key].location)
          );
        }

        for(const event in eventData) {
          console.log(eventData[event]);
        }

        this.setState({
          events: eventData
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={Date()}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        renderEmptyData={() => { return null }}
        rowHasChanged={this.rowHasChanged.bind(this)}
        pastScrollRange={0}
        futureScrollRange={2}
        markedDates={this.state.markedItems}
      />
    );
  }

  loadItems() {
    const items = {};
    const markedItems = {};

    this.state.events.forEach(e => items[e.start__dateTime.split('T')[0]] = [{ summ: e.summary, desc: e.description, loc: e.location, start: e.start__dateTime.split('T')[1].split('-')[0].slice(0,5), end: e.end__dateTime.split('T')[1].split('-')[0].slice(0,5), height: 115 }]);

    this.state.events.forEach(e => markedItems[e.start__dateTime.split('T')[0]] = { marked: true });

    this.setState({
      items: items,
      markedItems: markedItems
    });
  }

  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}>
        <Text>Title: {item.summ}</Text>
        <Text>Description: {item.desc}</Text>
        <Text>Location: {item.loc}</Text>
        <Text>Time: {item.start} - {item.end}</Text>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is an empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }
};

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
    height: 100,
    flex: 1,
    paddingTop: 30
  }
});
