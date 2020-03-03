import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';

import Event from '../models/event';
import { Calendar } from 'react-native-calendars';

export default class CalendarScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markedItems: {},
      events: [],
      eventList: [],
      selectedDay: undefined,
      isLoading: true
    };
  }

  componentDidMount = () => {
    this.getEvents();
  }

  getEvents = () => {
    // Provo cal id = encircletogether.org_3739393730353231353232@resource.calendar.google.com
    // SLC cal id = encircletogether.org_3231333930393634323835@resource.calendar.google.com
    const CALENDAR_ID = 'encircletogether.org_3739393730353231353232@resource.calendar.google.com';
    const API_KEY = 'AIzaSyDg7_XJNVaiMIOkgSqZfZ6ivpBhnyv6UIQ';
    const DATE = new Date().toISOString();
    let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?maxResults=15&orderBy=startTime&singleEvents=true&timeMin=${DATE}&key=${API_KEY}`;

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

        // for (const event in eventData) {
        //   console.log(eventData[event]);
        // }

        this.setState({ events: eventData });

        this.markItems();
      })
      .catch(err => console.log(err));
  }

  markItems = () => {
    const items = {};
    this.state.events.forEach(e => items[e.start__dateTime.split('T')[0]] = { marked: true });
    this.setState({
      markedItems: items,
      isLoading: false
    });
  }

  render() {
    return (
      <View>
        <View>
          <Calendar
            style={styles.calendar}
            displayLoadingIndicator={this.state.isLoading}
            hideExtraDays
            onDayPress={this.onDayPress}
            markedDates={this.state.markedItems}
          />
        </View>
        <View>
          <FlatList
            data={this.state.eventList[this.state.selectedDay]}
            keyExtractor={event => event.id}
            renderItem={({ item }) => <View style={{ flex: 1, }} key={item.id}><Text>{item.summ}</Text></View>}
          />
        </View>
      </View>
    );
  }

  onDayPress = (day) => {
    const selected = day.dateString;
    this.setState({ selectedDay: selected });

    console.log(selected)

    const list = {};
    this.state.events.forEach(e => {
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
    this.setState({ eventList: list });
  }

  // renderItem(item) {
  //   return (
  //     <View style={[styles.item, { height: item.height }]}>
  //       <Text>Title: {item.summ}</Text>
  //       <Text>Description: {item.desc}</Text>
  //       <Text>Location: {item.loc}</Text>
  //       <Text>Time: {item.start} - {item.end}</Text>
  //     </View>
  //   );
  // }

  // renderEmptyDate() {
  //   return (
  //     <View style={styles.emptyDate}>
  //       <Text>This is an empty date!</Text>
  //     </View>
  //   );
  // }
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
    height: 100,
    flex: 1,
    paddingTop: 30
  },
  calendar: {
    marginBottom: 10
  }
});
