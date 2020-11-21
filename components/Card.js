import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {block} from 'react-native-reanimated';

const Card = props => {
  let today = new Date ();
  let month = '';
  const dd = String (today.getDate ()).padStart (2, '0');
  today = dd;

   const timeConversion = (x) => {
    let output = []
    x = x.split(':')
    if (Number(x[0]) == 24) {
      x[0] = '12'
      output.push((x[0]+':'+x[1]))
      output.push('AM')
    } else if (Number(x[0]) == 12) {
      output.push((x[0]+':'+x[1]))
      output.push('        PM')
    } else if (Number(x[0]) > 12) {
      x[0] = Number(x[0]) - 12
      x[0] = x[0].toString()
      output.push((x[0]+':'+x[1]))
      output.push('        PM')
    } else {
      output.push((x[0]+':'+x[1]))
      output.push('AM')
    }
    return output
  }

  



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
          <Text style={styles.timeBoxText} numberOfLines={2}>{timeConversion(props.start)}</Text>
        
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
    maxWidth: 70,
    width: 70,
    padding: 7,
    alignItems:'center',
    alignContent:'center',
    textAlign:'center',
    marginTop:23,
    color:'black',
    fontFamily:'Garamond-Bold'
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
