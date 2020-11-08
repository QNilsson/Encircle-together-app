import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

const Card = props => {
  let today = new Date ();
  let month = '';
  const dd = String (today.getDate ()).padStart (2, '0');
  today = dd;
  

  // As of April 2020, toLocaleDateString doesn't work on android. So for now I just removed the month from the card on android.
  if (Platform.OS === 'ios') {
    month = new Date ().toLocaleDateString ('en-US', {month: 'short'});
  } else if (Platform.OS === 'android') {
    month = null;
  }

  

  let time = props.start
  // const hour = time.split ('-')[0];
  return (
    <View style={styles.card}>
      <View style={styles.dateBox}>
        <View><span className={styles.dateBox}>{time}</span><span className={styles.dateBox}>{time}</span> </View>

      </View>
      <View style={styles.textBox}>

        <Text style={styles.summary} numberOfLines={2}>{props.summary}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create ({
  card: {
    flex: 1,
    flexDirection: 'row',
    height: 84,
    width: 375,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'white',
    borderBottomWidth: 0,
    shadowColor: 'grey',
    shadowOffset: {
      width:5, height:5
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 4,
    marginBottom:25,
    overflow: 'hidden',
    minHeight: 84,
    backgroundColor: 'white',
  },
  dateBox: {
    backgroundColor: 'white',
    borderRightWidth: 1.5,
    borderRightColor: '#b6acab',
    maxWidth: 70,
    height: 60,
    alignContent:'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign:'center',
    margin:'auto',
    padding:6
  },

  time: {
    textAlign: 'center',
  },
  // date: {
  //   color: 'white',
  //   fontFamily: 'ModernoFB',
  //   fontSize: 36,
  //   textAlign: 'center',
  //   marginBottom: -10
  // },
  textBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 12,
  },
  // time: {
  //   color: '#8C8C8C',
  //   fontSize: 15,
  //   fontFamily:'Futura-Book',
  // },
  summary: {
    fontSize: 18,
    fontFamily: 'clarendon',
    textTransform: 'capitalize',
    padding:5
  },
  month: {
    fontSize: 15,
    fontFamily: 'Futura-Book',
    textTransform: 'uppercase',
    color: '#828282',
    textAlign: 'center',
    margin: 0,
  },
});

export default Card;
