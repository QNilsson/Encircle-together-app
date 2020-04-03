import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from "react-native";

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

  imageHeight = "100%";
  imageWidth = "90%";

  componentDidMount() {
    this.getPublications();
  }

  getPublications() {
    const url = `http://api.issuu.com/1_0?action=issuu.documents.list&apiKey=bmcyheq8ih6qlsr0ktxgzsfppzkjruw2&format=json&pageSize=30&signature=ce7ab9c425b8c58767948e25cd5d5a92`;

    fetch(url)
      .then(res => res.json())
      .then(resData => {
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
              publications[key].document.publishDate
            )
          );
        }

        for (const i in publicationData) {
          // console.log(publicationData[i])
        }

        this.setState({
          publications: publicationData
        });
      })
      .catch(err => console.log(err));
  }

  selectedResource(name) {
    this.props.navigation.navigate("ResourceScreen", {
      resourceName: name
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.resources}>Resources</Text>
        <Text style={styles.paragraph}>
          Publications and resources produced by Encircle.
        </Text>
        {
          <FlatList
            contentContainerStyle={{ margin: 10 }}
            numColumns={2}
            style={styles.flatlist}
            data={this.state.publications}
            keyExtractor={publication => publication.docId}
            renderItem={({ item }) => (
              <View style={styles.item} key={item.docId}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("Resource", {
                      resourceName: item.name
                    })
                  }
                >
                  {
                    <Image
                      style={{
                        height: 300,
                        width: '99%',
                        alignItems: "center"
                    
                      }}
                      source={{
                        uri: `https://image.issuu.com/${item.docId}/jpg/page_1_thumb_large.jpg`
                      }}
                    />
                  }

                  <Text style={styles.titleText}>{item.title}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  resources: {
    fontSize: 40,
    marginTop: 30,
    textAlign: "center",
    color: "#2B2B2B",
    fontFamily: 'ModernoFB',
  },
  paragraph: {
    fontSize: 20,
    color: "#686868",
    textAlign: "center",
    margin: 8,
    marginBottom: 10,
    alignItems: "center",
    fontFamily: 'Futura-Book'
  },
  item: {
    flex: 1,
    // width: "100%",
    // height: "100%",
    textAlign: "center",
    alignSelf: "center",
    alignContent: "center",
    marginBottom: 30,
    marginTop: 30

  },
  titleText: {
    fontSize: 16,
    width: '98%',
    fontWeight: "500",
    color: "#2B2B2B",
    textAlign: "center",
    fontFamily: 'Futura-Book',
    marginBottom: 0,
    margin: 0,
    paddingTop: 20
  }
});
