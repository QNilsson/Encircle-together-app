import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const EventScreen = (props) => {
    const id = props.navigation.getParam('id');
    const summ = props.navigation.getParam('summ');
    const start = props.navigation.getParam('start');
    const end = props.navigation.getParam('end');
    const loc = props.navigation.getParam('loc');
    const desc = props.navigation.getParam('desc');
    const day = props.navigation.getParam('day');

    return (
        <View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                style={styles.calendarButton}
                onPress={() => props.navigation.navigate('Calendar')}
                >
                <Ionicons name="ios-arrow-back" size={45} style={styles.arrowIcon}/>
                <Text style={styles.buttonText}>BACK TO EVENTS</Text>
                </TouchableOpacity>
            </View> 
            <View style={styles.container}>
                {/* <Text>{id}</Text> */}
                <Text style={styles.title}>{summ}</Text>

                <View style={styles.iconContainer}>
                    <Ionicons name="md-paper-plane" size={35} style={styles.arrowIcon}/>
                    <Text style={styles.location}>{loc}</Text>
                </View>

                <View style={styles.iconContainer}>
                    <Ionicons name="md-clock" size={35} style={styles.arrowIcon}/>
                    <Text style={styles.location}>{day} | {start} - {end}</Text>
                </View>
                
                <Text style={styles.description}>{desc}</Text>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: '15%',
        marginLeft: '5%'
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
        fontFamily: 'Futura-Book',
        marginLeft: '15%',
        fontWeight: '700'
      },
      arrowIcon: {
        color: '#2B2B2B',
        marginRight: 'auto',
        marginLeft: 'auto',
        fontWeight: '700',
        fontSize: 20,
      }, 

    container: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
        borderRadius: 30,
        marginTop: 50,
        // marginRight: '5%',
        // marginLeft: '5%',
        padding: 25,
    },
    title: {
        fontSize: 30,
        textAlign: 'left',
        color: '#2B2B2B',
        fontFamily: 'Futura-Book',
    },
    iconContainer: {
        display: 'flex',
        flexDirection: 'row', 
        // justifyContent: ""
        marginTop: 15,
        marginBottom: 15,
    },
    location: {
        fontSize: 17,
        textAlign: 'left',
        color: '#2B2B2B',
        fontFamily: 'Futura-Book',
        marginLeft: 15
    },
    description: {
        color: '#2B2B2B',
        fontFamily: 'Futura-Book',
        fontSize: 17 
    }


});

export default EventScreen;