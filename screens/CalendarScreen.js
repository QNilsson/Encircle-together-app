import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Event from '../models/event';
import { Calendar } from 'react-native-calendars';
import GlobalStyles from '../constants/GlobalStyles';

class CalendarScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markedItems: {},
      events: [],
      eventList: [],
      selectedDay: undefined,
      isLoading: true,
      location: ''
    };
  }

  componentDidMount = () => {
    this.getEvents();
    this.setState({ location: this.props.location });
  }

  getEvents = () => {
    console.log(this.state.location)
    // Provo cal id = encircletogether.org_3739393730353231353232@resource.calendar.google.com
    // SLC cal id = encircletogether.org_3231333930393634323835@resource.calendar.google.com
    const CALENDAR_ID = 'encircletogether.org_3739393730353231353232@resource.calendar.google.com';
    const API_KEY = 'AIzaSyDg7_XJNVaiMIOkgSqZfZ6ivpBhnyv6UIQ';
    const DATE = new Date().toISOString();
    console.log(DATE);
    const splitDATE = DATE.split('-', 2);
    const yearMonth = `${splitDATE[0]}-${splitDATE[1]}`;

    // show events for todays date
    this.setState({selectedDay: DATE.dateString});

    let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?maxResults=150&orderBy=startTime&singleEvents=true&timeMin=${yearMonth}-01T00:00:00.000Z&key=${API_KEY}`;

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
    let dateTitle = '';
    if(this.state.selectedDay === undefined) {
      dateTitle = (<View style={styles.eventListHeading}><Text style={styles.selectedDayTxt}>Select a date to see events!</Text></View>);
    } else {
      dateTitle = (<View style={styles.eventListHeading}><Text style={styles.selectedDayTxt}>Events on {this.state.selectedDay}</Text></View>);
    }
    return (
      <View>
        <View>
          <Calendar
            style={styles.calendar}
            displayLoadingIndicator={this.state.isLoading}
            hideExtraDays
            onDayPress={this.onDayPress}
            markedDates={this.state.markedItems}
            /*theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: 'orange',
              disabledArrowColor: '#d9e1e8',
              monthTextColor: 'blue',
              indicatorColor: 'blue',
              textDayFontFamily: 'monospace',
              textMonthFontFamily: GlobalStyles.h1,
              textDayHeaderFontFamily: 'monospace',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16
            }}*/
          />
        </View>

        <View style={styles.container}>
          {dateTitle}
        </View>

        <View style={styles.eventListContainer}>
          <FlatList
            data={this.state.eventList[this.state.selectedDay]}
            keyExtractor={event => event.id}
            renderItem={({ item }) => <View style={styles.item} key={item.id}><Text>{item.summ}</Text></View>}
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

const mapStateToProps = state => {
  return {
    location: state.location
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    backgroundColor: '#f1f1f1',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 100,
    flex: 1,
    paddingTop: 30
  },
  calendar: {
    marginBottom: 10
  },
  selectedDayTxt: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2B2B2B',
    textAlign: 'center',
  },
  eventListContainer: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 16,
    backgroundColor: '#ddd',
    paddingLeft: 12,
    paddingRight: 12,
    height: '100%'
  },
  eventListHeading: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 16,
    width: '50%',
    textAlign: 'center',
    paddingTop: 8,
    paddingBottom: 8
  }
});

export default connect(mapStateToProps)(CalendarScreen);
