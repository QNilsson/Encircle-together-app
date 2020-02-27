import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';

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
    const url = `http://api.issuu.com/1_0?action=issuu.documents.list&apiKey=bmcyheq8ih6qlsr0ktxgzsfppzkjruw2&format=json&pageSize=30&signature=ce7ab9c425b8c58767948e25cd5d5a92`;

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
    // FileSystem.downloadAsync(
    //   'https://issuu.com/call/publisher-suite/encircletogether/files/190327052247-f7b940939b2ef86154210058d2713711',
    //   FileSystem.documentDirectory + 'GSAToolkit.pdf'
    // )
    //   .then(({ uri }) => {
    //     console.log('Finished downloading to ', uri);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.publications}
          keyExtractor={publication => publication.docId}
          renderItem={({ item }) => <View style={{flex: 1,}} key={item.docId}><TouchableOpacity onPress={() => this.props.navigation.navigate('Resource', { resourceName: item.name })}><Image style={{ width: 50, height: 100 }} source={{ uri: `https://image.issuu.com/${item.docId}/jpg/page_1_thumb_large.jpg` }} /><Text>{item.title}</Text></TouchableOpacity></View>}
        />
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
  }
});
