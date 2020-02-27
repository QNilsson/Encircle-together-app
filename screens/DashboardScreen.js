import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Event from '../models/event';
import Publication from '../models/publication';

export default class DashboardScreen extends Component {
  static navigationOptions = {
    title: 'Dashboard'
  };

  constructor(props) {
    super(props);

    this.state = {
      items: {},
      markedItems: {},
      events: [],
      publications: []
    };
  }

  componentDidMount() {
    this.getEvents();
    this.getPublications();
  }

  getEvents = () => {
    // Provo cal id = encircletogether.org_3739393730353231353232@resource.calendar.google.com
    // SLC cal id = encircletogether.org_3231333930393634323835@resource.calendar.google.com
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

        // for(const event in eventData) {
        //   console.log(eventData[event]);
        // }

        this.setState({
          events: eventData
        });
      })
      .catch(err => console.log(err));
  }

  getPublications() {
    const url = `http://api.issuu.com/1_0?action=issuu.documents.list&apiKey=bmcyheq8ih6qlsr0ktxgzsfppzkjruw2&format=json&signature=f85ca64d5f1ac9b0c18e12eb1c23cf7e`

    fetch(url)
      .then((res) => res.json())
      .then((resData) => {
        const publications = resData.rsp._content.result._content;
        const publicationData = [];

        for (const key in publications) {
          publicationData.push(
            new Publication(
              publications[key].document.documentId,
              publications[key].document.publicationId,
              publications[key].document.title,
              publications[key].document.name,
              publications[key].document.description,
              publications[key].document.publishDate)
          );
        }

        // for (const i in publicationData) {
        //   console.log(publicationData[i])
        // }

        this.setState({
          publications: publicationData
        });
      })
      .catch((err) => console.log(err));
  }

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
