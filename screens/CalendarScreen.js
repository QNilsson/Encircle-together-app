import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import * as calendarActions from '../store/actions/calendar';
import { Agenda } from 'react-native-calendars';

const CalendarScreen = props => {
  const events = useSelector(state => state.calendar.events);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calendarActions.getEvents());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text>Calendar Screen</Text>
      <Agenda
        // the list of items that have to be displayed in agenda. If you want to render item as empty date
        // the value of date key kas to be an empty array []. If there exists no value for date key it is
        // considered that the date in question is not yet loaded
        items={{
          // '2012-05-22': [{ text: 'item 1 - any js object' }],
          // '2012-05-23': [{ text: 'item 2 - any js object' }],
          // '2012-05-24': [],
          // '2012-05-25': [{ text: 'item 3 - any js object' }, { text: 'any js object' }]
        }}
        // callback that gets called when items for a certain month should be loaded (month became visible)
        loadItemsForMonth={(month) => { console.log('trigger items loading') }}
        // initially selected day
        selected={Date()}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        //minDate={}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        //maxDate={}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={12}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={12}
        // specify how each item should be rendered in agenda
        renderItem={renderItem.bind(this)}
        // specify how empty date content with no items should be rendered
        renderEmptyDate={renderEmptyDate.bind(this)}
        // specify your item comparison function for increased performance
        rowHasChanged={rowHasChanged.bind(this)}
        // By default, agenda dates are marked if they have at least one item, but you can override this if needed
        markedDates={{
          // '2012-05-16': { selected: true, marked: true },
          // '2012-05-17': { marked: true },
          // '2012-05-18': { disabled: true }
        }}
        // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
        onRefresh={() => console.log('refreshing...')}
        // Set this true while waiting for new data from a refresh
        refreshing={false}
        // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
        refreshControl={null}
        // agenda theme
        theme={{
          //...calendarTheme,
          agendaDayTextColor: 'yellow',
          agendaDayNumColor: 'green',
          agendaTodayColor: 'red',
          agendaKnobColor: 'blue'
        }}
        // agenda container style
        style={{}}
      />
    </View>
  );
};

const loadItems = (day) => {
  setTimeout(() => {
    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time);
      if (!this.state.items[strTime]) {
        this.state.items[strTime] = [];
        const numItems = Math.floor(Math.random() * 5);
        for (let j = 0; j < numItems; j++) {
          this.state.items[strTime].push({
            name: 'Item for ' + strTime,
            height: Math.max(50, Math.floor(Math.random() * 150))
          });
        }
      }
    }
    //console.log(this.state.items);
    const newItems = {};
    Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
    this.setState({
      items: newItems
    });
  }, 1000);
  // console.log(`Load Items for ${day.year}-${day.month}`);
}

const renderItem = (item) => {
  return (
    <View style={[styles.item, { height: item.height }]}><Text>{item.name}</Text></View>
  );
}

const renderEmptyDate = () => {
  return (
    <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
  );
}

const rowHasChanged = (r1, r2) => {
  return r1.name !== r2.name;
}

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
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

CalendarScreen.navigationOptions = {
  headerTitle: 'Calendar'
}

export default CalendarScreen;

// import React, { Component } from 'react';
// import {
//   Text,
//   View,
//   StyleSheet
// } from 'react-native';
// import { Agenda } from 'react-native-calendars';

// export default class AgendaScreen extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       items: {},
//       events: [],
//       dataSource: []
//     };
//   }

//   componentDidMount() {
//     this.getEvents();
//   }

//   getEvents = () => {
//     const CALENDAR_ID = '10528790%40my.uvu.edu';
//     const API_KEY = 'AIzaSyCTJREaL9fmCPHR0uC4m0q05l9npRVnK_I';
//     let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;
//     console.log(url)

//     fetch(url)
//       .then((response) => response.json())
//       .then((responseJson) => {
//         this.setState({
//           dataSource: [...this.state.dataSource, ...responseJson.items],
//         });
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   render() {
//     for(i = 0; i <= this.state.events; i++) {
//       console.log(this.state.dataSource);
//     }
//     return (
//       <Agenda
//         items={this.state.items}
//         loadItemsForMonth={this.loadItems.bind(this)}
//         selected={Date()}
//         renderItem={this.renderItem.bind(this)}
//         renderEmptyDate={this.renderEmptyDate.bind(this)}
//         rowHasChanged={this.rowHasChanged.bind(this)}
//       // markingType={'period'}
//       // markedDates={{
//       //    '2017-05-08': {textColor: '#666'},
//       //    '2017-05-09': {textColor: '#666'},
//       //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
//       //    '2017-05-21': {startingDay: true, color: 'blue'},
//       //    '2017-05-22': {endingDay: true, color: 'gray'},
//       //    '2017-05-24': {startingDay: true, color: 'gray'},
//       //    '2017-05-25': {color: 'gray'},
//       //    '2017-05-26': {endingDay: true, color: 'gray'}}}
//       // monthFormat={'yyyy'}
//       // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
//       //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
//       />
//     );
//   }

//   loadItems(day) {
//     setTimeout(() => {
//       for (let i = -15; i < 85; i++) {
//         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//         const strTime = this.timeToString(time);
//         if (!this.state.items[strTime]) {
//           this.state.items[strTime] = [];
//           const numItems = Math.floor(Math.random() * 5);
//           for (let j = 0; j < numItems; j++) {
//             this.state.items[strTime].push({
//               name: 'Item for ' + strTime,
//               height: Math.max(50, Math.floor(Math.random() * 150))
//             });
//           }
//         }
//       }
//       //console.log(this.state.items);
//       const newItems = {};
//       Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
//       this.setState({
//         items: newItems
//       });
//     }, 1000);
//     // console.log(`Load Items for ${day.year}-${day.month}`);
//   }

//   renderItem(item) {
//     return (
//       <View style={[styles.item, { height: item.height }]}><Text>{item.name}</Text></View>
//     );
//   }

//   renderEmptyDate() {
//     return (
//       <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
//     );
//   }

//   rowHasChanged(r1, r2) {
//     return r1.name !== r2.name;
//   }

//   timeToString(time) {
//     const date = new Date(time);
//     return date.toISOString().split('T')[0];
//   }
// }

// const styles = StyleSheet.create({
//   item: {
//     backgroundColor: 'white',
//     flex: 1,
//     borderRadius: 5,
//     padding: 10,
//     marginRight: 10,
//     marginTop: 17
//   },
//   emptyDate: {
//     height: 15,
//     flex: 1,
//     paddingTop: 30
//   }
// });