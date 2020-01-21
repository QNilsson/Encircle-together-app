// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// import { useSelector, useDispatch } from 'react-redux';
// import * as calendarActions from '../store/actions/calendar';
// import { Agenda } from 'react-native-calendars';

// const CalendarScreen = props => {
//   const events = useSelector(state => state.calendar.events);
//   const dispatch = useDispatch();

//   const [event, setEvent] = useState([]);
//   const [items, setItems] = useState({});

//   useEffect(() => {
//     dispatch(calendarActions.getEvents());
//   }, [dispatch]);

//   const loadItems = (day) => {
//     setTimeout(() => {
//       for (let i = -15; i < 85; i++) {
//         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//         const strTime = timeToString(time);
//         if (!items[strTime]) {
//           items[strTime] = [];
//           const numItems = Math.floor(Math.random() * 5);
//           for (let j = 0; j < numItems; j++) {
//             items[strTime].push({
//               name: 'Item for ' + strTime,
//               height: Math.max(50, Math.floor(Math.random() * 150))
//             });
//           }
//         }
//       }

//       const newItems = {};
//       Object.keys(items).forEach(key => { newItems[key] = items[key]; });
//       setItems({
//         newItems
//       });
//     }, 1000);
//     console.log(`Load Items for ${day.year}-${day.month}`);
//   }

//   return (
//     <View style={styles.container}>
//       <Text>Calendar Screen</Text>
//       <Agenda
//         items={items}
//         loadItemsForMonth={loadItems.bind(this)}
//         selected={Date()}
//         renderItem={renderItem.bind(this)}
//         renderEmptyDate={renderEmptyDate.bind(this)}
//         rowHasChanged={rowHasChanged.bind(this)}
//       markingType={'period'}
//       markedDates={{
//          '2017-05-08': {textColor: '#666'},
//          '2017-05-09': {textColor: '#666'},
//          '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
//          '2017-05-21': {startingDay: true, color: 'blue'},
//          '2017-05-22': {endingDay: true, color: 'gray'},
//          '2017-05-24': {startingDay: true, color: 'gray'},
//          '2017-05-25': {color: 'gray'},
//          '2017-05-26': {endingDay: true, color: 'gray'}}}
//       monthFormat={'yyyy'}
//       theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
//       renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
//       />
//     </View>
//   );
// };

// const renderItem = (item) => {
//   return (
//     <View style={[styles.item, { height: item.height }]}><Text>{item.name}</Text></View>
//   );
// }

// const renderEmptyDate = () => {
//   return (
//     <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
//   );
// }

// const rowHasChanged = (r1, r2) => {
//   return r1.name !== r2.name;
// }

// const timeToString = (time) => {
//   const date = new Date(time);
//   return date.toISOString().split('T')[0];
// }

// CalendarScreen.navigationOptions = {
//   headerTitle: 'Calendar'
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
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

// export default CalendarScreen;
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

import { Agenda } from 'react-native-calendars';

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {},
      events: []
    };
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents = () => {
    let url = 'https://zappier-test.firebaseio.com/cal-events.json';
    fetch(url)
      .then((res) => res.json())
      .then((resData) => {
        const eventData = [];
        for(const key in resData) {
          eventData.push(
            key, 
            resData[key].id, 
            resData[key].creator_email, 
            resData[key].description, 
            resData[key].end__dateTime, 
            resData[key].start__dateTime, 
            resData[key].summary, 
            resData[key].location)
        }
        this.setState({
          events: eventData
        });
        console.log(eventData);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={Date()}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        pastScrollRange={1}
        futureScrollRange={1}
      // markingType={'period'}
      // markedDates={{
      //    '2017-05-08': {textColor: '#666'},
      //    '2017-05-09': {textColor: '#666'},
      //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
      //    '2017-05-21': {startingDay: true, color: 'blue'},
      //    '2017-05-22': {endingDay: true, color: 'gray'},
      //    '2017-05-24': {startingDay: true, color: 'gray'},
      //    '2017-05-25': {color: 'gray'},
      //    '2017-05-26': {endingDay: true, color: 'gray'}}}
      // monthFormat={'yyyy'}
      // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
      //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      />
    );
  }

  loadItems() {
    const newItems = {};

    this.state.events.forEach(e => newItems[e.start__dateTime] = []);
    
    this.setState({
      items: newItems
    })

    //console.log(newItems);
    // this.setState({
    //   items: this.state.events.reduce((acc, obj) => {
    //     let key = obj[prop];
    //     if(!acc[key]){
    //       acc[key] = [];
    //     }
    //     acc[key].push([]);
    //     return acc;
    //   }, {})
    // });
  }

  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}><Text>{item.name}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
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