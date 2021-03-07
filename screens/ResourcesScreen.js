import React, { Component } from "react";
import { Dimensions, StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ImageBackground, SafeAreaView, ScrollView } from "react-native";

// imports publication model used to load publicationData array
import Publication from '../models/publication';

export default class ResourcesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      publications: []
    };
  }

  imageHeight = "100%";
  imageWidth = "90%";

  // component will load with resources from issuu api (https://developer.issuu.com/)
  componentDidMount() {
    this.getPublications();
  }

  getPublications() {
    const url = `http://api.issuu.com/1_0?action=issuu.documents.list&apiKey=bmcyheq8ih6qlsr0ktxgzsfppzkjruw2&format=json&pageSize=30&signature=ce7ab9c425b8c58767948e25cd5d5a92`;

    fetch(url)
      .then(res => res.json())
      .then(resData => {
        // stores unpackaged response data
        const publications = resData.rsp._content.result._content;
        // stores publication objects
        const publicationData = [];

        // loads array with publication objects
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

        // use this to see loaded publication objects
        for (const i in publicationData) {
          // console.log(publicationData[i])
        }

        this.setState({
          publications: publicationData
        });
      })
      .catch(err => console.log(err));
  }

  // navigates to resource screen - sends resource name as parameter
  selectedResource(name) {
    this.props.navigation.navigate("ResourceScreen", {
      resourceName: name
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          {
            <FlatList
              contentContainerStyle={{ margin: 10 }}
              numColumns={2}
              style={styles.flatlist}
              data={this.state.publications}
              keyExtractor={publication => publication.docId}
              ListHeaderComponent={
                <View>
                  <ImageBackground
                    style={styles.backgroundImage}
                    source={require("../assets/resource.jpg")}
                  />
                </View>
              }
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

                        // points to resource cover image (see issuu api docs)
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
      </View>
    );
  }
}

let screenWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '20%',
    backgroundColor: "#fff",
  },
  resources: {
    fontSize: 34,
    marginBottom: '20%',
    marginTop: '25%',
    textAlign: "center",
    color: "#fff",
    fontFamily: 'Clarendon-Regular',
  },
  backgroundImage: {
    resizeMode: "contain",
    width: "100%",
    height: 167,
  },
  paragraph: {
    fontSize: 20,
    color: "#686868",
    textAlign: "center",
    margin: 8,
    marginBottom: 10,
    alignItems: "center",
    fontFamily: 'Garamond-Regular'
  },
  item: {
    flex: 1,
    textAlign: "center",
    alignContent: "center",
    marginBottom: 10,
    marginTop: 10

  },
  titleText: {
    fontSize: 16,
    width: '98%',
    fontWeight: "500",
    color: "#2B2B2B",
    textAlign: "center",
    fontFamily: 'Garamond-Regular',
    marginBottom: 0,
    margin: 0,
    paddingTop: 5
  }
});
