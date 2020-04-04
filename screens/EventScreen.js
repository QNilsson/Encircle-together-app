import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EventScreen = (props) => {
    const id = props.navigation.getParam(event.id);
    const summ = props.navigation.getParam(event.summ);
    const start = props.navigation.getParam(event.start);
    const end = props.navigation.getParam(event.end);
    const loc = props.navigation.getParam(event.loc);
    const desc = props.navigation.getParam(event.desc);

    return (
        <View style={styles.container}>
            <Text>{id}</Text>
            <Text>{summ}</Text>
            <Text>{start}</Text>
            <Text>{end}</Text>
            <Text>{loc}</Text>
            <Text>{desc}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default EventScreen;