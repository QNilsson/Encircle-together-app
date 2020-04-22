import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = props => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  today = dd;

  let month = new Date().toLocaleString('default', { month: 'short' });

  let time = props.time.split('T')[1];
  const hour = time.split('-')[0];
  return (
    <View style={styles.card}>
      <View style={styles.dateBox}>
        <Text style={styles.date}>{ today }</Text>
        <Text style={styles.month}>{ month }</Text>
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
    flexDirection: 'row',
    height: 84,
    width: 375,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 10,
    overflow: 'hidden',
    minHeight: 84,
    backgroundColor: 'white'
  },
  dateBox: {
    backgroundColor: 'black',
    width: 60,
    height: 84,
    maxWidth: 60,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  date: {
    color: 'white',
    fontFamily: 'ModernoFB',
    fontSize: 36,
    textAlign: 'center',
    marginBottom: -10
  },
  textBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 12
  },
  time: {
    color: '#8C8C8C',
    fontSize: 15,
    fontFamily:'Futura-Book',
  },
  summary: {
    fontSize: 22,
    fontFamily:'Futura-Book',
    textTransform: 'capitalize'
  },
  month: {
    fontSize: 15,
    fontFamily:'Futura-Book',
    textTransform: 'uppercase',
    color: '#828282',
    textAlign: 'center',
    margin: 0
  }
})

export default Card;
