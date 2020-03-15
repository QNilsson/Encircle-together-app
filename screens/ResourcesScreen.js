import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';

import GlobalStyles from '../constants/GlobalStyles';
import Publication from '../models/publication';
// import * as FileSystem from 'expo-file-system';

export default class ResourcesScreen extends Component {
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
          // console.log(publicationData[i])
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
      <View style={styles.mainContainer}>
        <Text style={GlobalStyles.h1}>Resources</Text>
        <Text style={GlobalStyles.p}>Publications and resources produced by Encircle.</Text>
        {<FlatList
          numColumns={2}
          style={styles.container}
          data={this.state.publications}
          keyExtractor={publication => publication.docId}
          renderItem={({ item }) =>
            <View style={styles.item} key={item.docId}>
              {<Image
                style={{width: 175, height: 250}}
                source={{uri: item.image }}
              />}

              <TouchableOpacity
                // onPress={() => this.props.navigation.navigate('Resource', { resourceName: item.name })}
                style={styles.textBlock}
              >
                <Image style={{ width: 50, height: 100 }} source={{ uri: `https://image.issuu.com/${item.docId}/jpg/page_1_thumb_large.jpg` }} />
                <Text style={styles.titleText}>{item.title}</Text>
              </TouchableOpacity>


            </View>
          }
          />}


        </View>
      /* <View style={styles.container}>
        <Text style={styles.resources}>Resources</Text>
        <Text style={styles.paragraph}>Publications and resources produced by Encircle.</Text>
        {<FlatList
          // numColumns={2}
          contentContainerStyle={{margin: 10}}
    //horizontal={false}
    numColumns={2}
          data={this.state.publications}
          keyExtractor={publication => publication.docId}
          renderItem={({ item }) =>
          <View style={styles.item} key={item.docId}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Resource', { resourceName: item.name })}>
              {<Image style={{ width: 50, height: 100 }} source={{ uri: `https://image.issuu.com/${item.docId}/jpg/page_1_thumb_large.jpg` }} />}

              <Text style={styles.titleText}>{item.title}</Text>
            </TouchableOpacity>
          </View>
          }
        />}
      </View> *//* }
    ); */
  )};
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  resources: {
    fontSize: 40,
    marginTop: 30,
    textAlign: 'center',
    color: '#2B2B2B'
  },
  paragraph: {
    fontSize: 20,
    color: '#686868',
    textAlign: 'center',
    margin: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  item: {
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center'
  },
  titleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2B2B2B',
    textAlign: 'center',
  },
});
