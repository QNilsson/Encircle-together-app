import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ResourcesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {}
    }
  }

  componentDidMount() {
    this.getPublications();
  }

  getPublications() {
    const url = `http://api.issuu.com/1_0?action=issuu.documents.list&apiKey=bmcyheq8ih6qlsr0ktxgzsfppzkjruw2&format=json&signature=f85ca64d5f1ac9b0c18e12eb1c23cf7e`
    
    fetch(url)
    .then((res) => res.json())
    .then((resData) => console.log(resData));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Resources Screen</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});