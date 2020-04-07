import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';

import { connect } from 'react-redux';
import Event from '../models/event';
import Publication from '../models/publication';
import Card from '../components/Card';
import DashboardWelcome from '../components/DashboardWelcome';

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

         //for(const event in eventData) {
           //console.log(eventData[event]);
         //}

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
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          {/* <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subTitle}>Make today a great day.</Text>
          </View> */}
          <DashboardWelcome />
          <View style={styles.eventContainter}>
            <Text style={styles.location}>LATER TODAY IN <Text style={styles.locationText}>{this.state.location.toUpperCase()}</Text></Text>
            {this.state.events.map(event => <Card style={styles.event} key={event.id} time={event.start__dateTime} summary={event.summary}></Card>)}
          </View>

          <View style={styles.publicationContainter}>

          </View>
        </View>
      </View>
    );
  }
};
 /*
{this.state.publications.map(publication => <View style={styles.publication} key={publication.docId}><Text>{publication.name}</Text></View>)}
 */
const mapStateToProps = state => {
  return {
    location: state.events.location
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // margin: 20,
    // marginTop: 100,
    // marginBottom: 50,
    backgroundColor: '#F5F5F5'
  },
  titleContainer: {
    backgroundColor: 'white',
    width:'100%',
    padding: 20,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2B2B2B',

    paddingLeft: 12,
    paddingRight: 12,
    top: 0,
    // height: '100%',
   
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    color: '#2B2B2B',
    marginTop: '20%'
    // fontFamily: 'ModernoFB',
  },
  subTitle: {
    fontSize: 18,
    color: '#686868',
    textAlign: 'center',
    margin: 8,
    marginBottom: 20,
    alignItems: 'center',
    // fontFamily: 'Futura-Book'
  },
  eventContainter: {
    flex: 1,
    alignItems: 'center'
  },
  location: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 15
  },
  locationText: {
    color: '#686868'
  },

  event: {
    marginBottom: 10
  },
  publicationContainter: {
    flex: 1,
    alignItems: 'center'
  },
  publication: {

  }
});

export default connect(mapStateToProps)(DashboardScreen);
