import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EventScreen = (props) => {
    const id = props.navigation.getParam('id');
    const summ = props.navigation.getParam('summ');
    const start = props.navigation.getParam('start');
    const end = props.navigation.getParam('end');
    const loc = props.navigation.getParam('loc');
    const desc = props.navigation.getParam('desc');

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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default EventScreen;