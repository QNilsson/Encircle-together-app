import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {block} from 'react-native-reanimated';

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

  return (
    <View style={styles.card}>
      <View style={styles.timeBox}>
       
        <View>
          <Text className={styles.timeBoxText} numberOfLines={2}>4:30 pm</Text>
        
        </View>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.summary} numberOfLines={3}>{props.summary}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create ({
  card: {
    flex: 1,
    flexDirection: 'row',
    height: 15,
    width: 375,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'white',
    borderBottomWidth: 0,
    shadowColor: 'grey',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 4,
    marginBottom: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  // horline:{
  //   borderRightColor:'#b6acab',
  //   borderRightWidth:1,
  //   alignContent:'center',
  //   width:70,
  //   height:60,
  //   marginTop:60

  // },
  timeBox: {
    maxWidth: 70,
    width: 70,
    padding: 7,
    alignItems:'center',
    alignContent:'center',
    textAlign:'center',
    marginTop:23
    
  },
  timeBoxText: {
    elevation:4,
    color:'white',
    fontFamily: 'Garamond',
    marginRight:'auto',
    marginLeft:'auto',
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
    fontFamily: 'Clarendon',
    
    padding: 5,
   
  },
  
});

export default Card;
