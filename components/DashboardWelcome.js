import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class DashboardWelcome extends Component {
    // trying to get fonts to load

    /* state={
        isReady: false
      }
    
      async componentWillMount() {
      await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      });
      this.setState({isReady:true})
    }
    
      render() {
        if (!this.state.isReady) {
          return <Expo.AppLoading />;
        }
    } */
        render() {
          return (
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subTitle}>Make today a great day.</Text>
            </View>
          )
    }       
}

const styles = StyleSheet.create({
    titleContainer: {
      backgroundColor: 'white',
      width:'100%',
      padding: 20,
      borderBottomEndRadius: 30,
      borderBottomStartRadius: 30,
      marginBottom: 20,
  
      paddingLeft: 12,
      paddingRight: 12,
      top: 0,
      // height: '100%',
     
    },
    title: {
      fontSize: 40,
      textAlign: 'center',
      color: '#2B2B2B',
      marginTop: '20%',
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
});

export default DashboardWelcome;