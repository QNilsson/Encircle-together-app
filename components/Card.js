import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = props => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  today = dd;

  let time = props.time.split('T')[1];
  const hour = time.split('-')[0];
  return (
    <View style={styles.card}>
      <View style={styles.dateBox}>
        <Text style={styles.date}>{ today }</Text>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.time}>{ hour }</Text>
        <Text style={styles.summary} numberOfLines={2}>{ props.summary }</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 250,
    width: 325,
    borderWidth: 1,
    borderColor: 'black'
  },
  dateBox: {
    backgroundColor: 'black',
    width: 35,
  },
  date: {
    color: 'white',
    fontSize: 25
  },
  textBox: {

  },
  time: {
    color: '#ccc',
    fontSize: 16
  },
  summary: {
    fontSize: 15
  }
})

export default Card;
