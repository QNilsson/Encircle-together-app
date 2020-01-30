import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Event from '../models/event';
import { Agenda } from 'react-native-calendars';

export default class CalendarScreen extends Component {
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
    let url = 'https://zappier-test.firebaseio.com/cal-events.json';
    // const CALENDAR_ID = 'jn.web.developer%40gmail.com'; Google API
    // const API_KEY = 'AIzaSyDg7_XJNVaiMIOkgSqZfZ6ivpBhnyv6UIQ'; Google API
    // let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?maxResults=3&orderBy=startTime&singleEvents=true&timeMin=2020-01-01T00%3A00%3A00Z&key=${API_KEY}`; Google API

    fetch(url)
      .then((res) => res.json())
      .then((resData) => {
        const eventData = [];
        for (const key in resData) {
          eventData.push(
            new Event(
              resData[key].id,
              resData[key].creator_email,
              resData[key].description,
              resData[key].end__dateTime,
              resData[key].start__dateTime,
              resData[key].summary,
              resData[key].location
            )
          );
        }
        //console.log(resData.items); Google API
        // for (const key in resData.items) {
        //   eventData.push(
        //     new Event(
        //       resData.items[key].id,
        //       resData.items[key].creator.email,
        //       resData.items[key].description,
        //       resData.items[key].end.dateTime,
        //       resData.items[key].start.dateTime,
        //       resData.items[key].summary,
        //       resData.items[key].location)
        //   );
        // }

        this.setState({
          events: eventData
        });

      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <Agenda
        items={this.state.items} //itemsForSelectedDay
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={Date()}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        renderEmptyData={() => { return null }}
        rowHasChanged={this.rowHasChanged.bind(this)}
        pastScrollRange={1}
        futureScrollRange={1}
        markedDates={this.state.markedItems}
      // monthFormat={'yyyy'}
      // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
      //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      />
    );
  }

  loadItems() {
    const newItems = {};
    const marked = {};

    //this.state.events.forEach(e => newItems[e.start__dateTime.split('T')[0]] = []); Google API
    this.state.events.forEach(e => newItems[e.start__dateTime.split(' ')[0]] = [{ summ: e.summary, desc: e.description, loc: e.location, start: e.start__dateTime, end: e.end__dateTime, height: 115 }]);

    this.state.events.forEach(e => marked[e.start__dateTime.split(' ')[0]] = { marked: true });

    this.setState({
      items: newItems,
      markedItems: marked
    });
  }

  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}>
        <Text>{item.summ}</Text>
        <Text>{item.desc}</Text>
        <Text>{item.loc}</Text>
        <Text>{item.start.split(' ')[1]} - {item.end.split(' ')[1]}</Text>
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