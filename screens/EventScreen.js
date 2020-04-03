import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EventScreen = (props) => {
    return (
        <View style={styles.container}>
            <Text>Event Screen</Text>
        </View>
    );
    // const selectedEvent = (name) => {
    //     this.props.navigation.navigate("EventScreen", {
    //       eventName: name
    //     });
    // };
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default EventScreen;