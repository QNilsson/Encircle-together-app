import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, SafeAreaView, Dimensions, Linking } from 'react-native';

// imports expo icons
import { Ionicons } from '@expo/vector-icons';

import HTML from "react-native-render-html";

const EventScreen = (props) => {
  // recieved event parameters sent from calendar screen
  const id = props.navigation.getParam('id');
  const summ = props.navigation.getParam('summ');
  const start = props.navigation.getParam('start');
  const startstamp = props.navigation.getParam('startstamp');
  const end = props.navigation.getParam('end');
  const endstamp = props.navigation.getParam('endstamp');
  const loc = props.navigation.getParam('loc');
  const desc = props.navigation.getParam('desc');
  const day = props.navigation.getParam('day');

  // Function to ensure zoom links are properly anchored
  const urlify = (text) => {
      var urlRegex = /( https?:\/\/[^\s | <]+)/g;
      return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '">' + url + '</a>';
      })
    }

  let html = desc
  if(html == undefined) {
    html = ''
  }
  html = urlify(html);
  html = '<div style="color:#2B2B2B; font-family: Clarendon-Regular; margin-bottom: 120px;">'+html+'</div>'

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.calendarButton}
            onPress={() => props.navigation.navigate('Calendar')}
          >
            <Ionicons name="ios-arrow-back" size={20} style={styles.arrowIcon} />
            <Text style={styles.buttonText}>BACK TO EVENTS</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{ marginBottom: 20, paddingBottom: 20 }}>
          <View style={styles.container}>
            {/* <Text>{id}</Text> */}
            <Text style={styles.title}>{summ}</Text>

            <View style={styles.iconContainer}>
              <Ionicons name="md-paper-plane" size={25} style={styles.arrowIcon} />
              <Text style={styles.location}>{loc}</Text>
            </View>

            <View style={styles.iconContainer}>
              <Ionicons name="ios-time" size={25} style={styles.arrowIcon} />
              <Text style={styles.time}>{day} | {start}{startstamp} - {end}{endstamp}</Text>
            </View>
        
            <HTML 
              html={html}
              onLinkPress={ (evt, href) => { Linking.openURL(href); }}
              imagesMaxWidth={Dimensions.get("window").width}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: '15%',
    marginLeft: '5%',
    marginBottom: 20
  },
  calendarButton: {
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    paddingRight: 30,
    paddingLeft: 30,
    backgroundColor: 'white',
    width: 220,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 50,
    textAlign: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: '#2B2B2B',
    fontSize: 16,
    fontFamily: 'Clarendon-Regular',
    marginLeft: '5%',
  },
  arrowIcon: {
    color: '#2B2B2B',
    marginRight: 'auto',
    marginLeft: 'auto',
    fontWeight: '700',
  },

  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 30,
    marginTop: 30,
    // marginRight: '5%',
    // marginLeft: '5%',
    padding: 25,
    minHeight: 700
  },
  title: {
    fontSize: 30,
    textAlign: 'left',
    color: '#2B2B2B',
    fontFamily: 'Garamond-Regular',
    marginTop: 15
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: ""
    marginTop: 15,
    marginBottom: 15,
  },
  location: {
    fontSize: 15,
    textAlign: 'left',
    color: '#2B2B2B',
    fontFamily: 'Din-Regular',
    marginLeft: '5%'
  },
  time: {
    fontSize: 15,
    textAlign: 'left',
    color: '#2B2B2B',
    fontFamily: 'Garamond-Regular',
    marginLeft: '5%'
  },
  description: {
    color: '#2B2B2B',
    fontFamily: 'Din',
    fontSize: 20,
    marginBottom: 70
  }


});

export default EventScreen;