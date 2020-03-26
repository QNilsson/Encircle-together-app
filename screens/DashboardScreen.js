import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';

import { connect } from 'react-redux';
import Event from '../models/event';
import Publication from '../models/publication';

class DashboardScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markedItems: {},
      events: [],
      publications: [],
      location: ''
    };
  }

  componentDidMount() {
    this.getEvents();
    this.getPublications();
    this.setState({ location: this.props.location });
  }

  getEvents = () => {
    console.log(this.state.location)
    // Provo cal id = encircletogether.org_3739393730353231353232@resource.calendar.google.com
    // SLC cal id = encircletogether.org_3231333930393634323835@resource.calendar.google.com
    const CALENDAR_ID = 'encircletogether.org_3739393730353231353232@resource.calendar.google.com';
    const API_KEY = 'AIzaSyDg7_XJNVaiMIOkgSqZfZ6ivpBhnyv6UIQ';
    const DATE = new Date().toISOString();
    let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?maxResults=3&orderBy=startTime&singleEvents=true&timeMin=${DATE}&key=${API_KEY}`;

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

  getPublications() {
    const url = `http://api.issuu.com/1_0?action=issuu.documents.list&apiKey=bmcyheq8ih6qlsr0ktxgzsfppzkjruw2&format=json&pageSize=3&signature=e77d6d7be1cc2ababc1494319f9a0743`

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

  selectedResource(name) {
    this.props.navigation.navigate('ResourceScreen', {
      resourceName: name
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subTitle}>Make today a great day.</Text>
        </View>
        <View style={styles.eventContainter}>
          <Text>Later today in {this.state.location}</Text>
          {this.state.events.map(event => <View style={styles.event} key={event.id}><Text>{ event.summary }</Text></View>)}
        </View>
        <View style={styles.publicationContainter}>
          {this.state.publications.map(publication => <View style={styles.publication} key={publication.docId}><Text>{publication.name}</Text></View>)}
        </View>
      </View>
    );
  }
};

const mapStateToProps = state => {
  return {
    location: state.location
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    marginTop: 100,
    marginBottom: 50
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    color: '#2B2B2B'
  },
  subTitle: {
    fontSize: 18,
    color: '#686868',
    textAlign: 'center',
    margin: 8,
    marginBottom: 20,
    alignItems: 'center'
  },
  eventContainter: {
    flex: 1,
    alignItems: 'center'
  },
  event: {

  },
  publicationContainter: {
    flex: 1,
    alignItems: 'center'
  },
  publication: {

  }
});

export default connect(mapStateToProps)(DashboardScreen);
