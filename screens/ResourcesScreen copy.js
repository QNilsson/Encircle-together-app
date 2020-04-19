import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

import Publication from '../models/publication';
// import * as FileSystem from 'expo-file-system';

export default class ResourcesScreen extends Component {
  static navigationOptions = {
    title: 'Resources',
  };

  constructor(props) {
    super(props);

    this.state = {
      publications: []
    };
  }

  componentDidMount() {
    this.getPublications();
  }

  getPublications() {
    const url = `http://api.issuu.com/1_0?action=issuu.documents.list&apiKey=bmcyheq8ih6qlsr0ktxgzsfppzkjruw2&format=json&signature=f85ca64d5f1ac9b0c18e12eb1c23cf7e`

    fetch(url)
      .then((res) => res.json())
      .then((resData) => {
        const publications = resData.rsp._content.result._content;
        const publicationData = [];

        for (const key in publications) {
          publicationData.push(
            new Publication(
              publications[key].document.documentId,
              publications[key].document.publicationId,
              publications[key].document.title,
              publications[key].document.name,
              publications[key].document.description,
              publications[key].document.publishDate)
          );
        }

        for (const i in publicationData) {
          console.log(publicationData[i])
        }

        this.setState({
          publications: publicationData
        });
      })
      .catch((err) => console.log(err));
  }

  selectedResource(name) {
    this.props.navigation.navigate('ResourceScreen', {
      resourceName: name
    });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <FlatList
            data={this.state.publications}
            keyExtractor={publication => publication.docId}
            renderItem={({ item }) => <View key={item.docId}><TouchableOpacity onPress={() => this.props.navigation.navigate('Resource', { resourceName: item.name })}><Text>{item.title}</Text></TouchableOpacity></View>}
          />
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
