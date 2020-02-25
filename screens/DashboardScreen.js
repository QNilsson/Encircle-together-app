import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class DashboardScreen extends Component {
  static navigationOptions = {
    title: 'Dashboard Screen'
  };

  constructor(props) {
    super(props);

    this.state = {
      items: {},
      markedItems: {},
      events: []
    };
  }

  getEvents = () => {
    // Provo cal id = encircletogether.org_3739393730353231353232@resource.calendar.google.com
    // SLC cal id = encircletogether.org_3231333930393634323835@resource.calendar.google.com
    // const CALENDAR_ID = 'jn.web.developer%40gmail.com'; 
    const CALENDAR_ID = 'encircletogether.org_3739393730353231353232@resource.calendar.google.com';
    const API_KEY = 'AIzaSyDg7_XJNVaiMIOkgSqZfZ6ivpBhnyv6UIQ';
    const DATE = new Date().toISOString();
    let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?maxResults=10&orderBy=startTime&singleEvents=true&timeMin=${DATE}&key=${API_KEY}`;

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
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>dashboard Screen</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
