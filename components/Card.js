import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {block} from 'react-native-reanimated';


const Card = props => {
  let today = new Date ();
  let month = '';
  const dd = String (today.getDate ()).padStart (2, '0');
  today = dd;

  const timeConversion = (start_) => {
    let output = []
    start_ = start_.split(':');
    if (Number(start_[0]) == 24) {
      start_[0] = '12'
      output.push((start_[0]+':'+start_[1]))
      output.push('AM')
    } else if (Number(start_[0]) == 12) {
      output.push((start_[0]+':'+start_[1]))
      output.push('PM')
    } else if (Number(start_[0]) > 12) {
      start_[0] = Number(start_[0]) - 12
      start_[0] = start_[0].toString()
      output.push((start_[0]+':'+start_[1]))
      output.push('PM')
    } else {
      output.push((start_[0]+':'+start_[1]))
      output.push('AM')
    }
    return output
  }

  useEffect(() => {
    console.log(props.start)
  })



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
          <Text style={styles.timeBoxText} numberOfLines={2}>{timeConversion(props.time)}</Text>
        
        </View>
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
    height: 15,
    width: 375,
    paddingHorizontal:20,
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.09,
    elevation: 4,
    marginBottom: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
  },

  timeBox: {
    maxWidth: 80,
    width: 80,
    padding: 8,
    alignItems:'center',
    alignContent:'center',
    textAlign:'center',
    marginTop:18,
    marginBottom:15,
    color:'black',
    fontFamily:'Garamond-Bold',
    borderRightColor:'#D4D6D8',
    borderRightWidth:2,
  },
  timeBoxText:{
    fontFamily:'Garamond-Bold'
  },

  textBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
   
    paddingLeft: 12,
  },
 
  summary: {
    fontSize: 18,
    fontFamily: 'Clarendon',
    
    padding: 5,
   
  },
  
});

export default Card;
