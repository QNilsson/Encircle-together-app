import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { WebView } from 'react-native-webview';

import Publication from '../models/publication';

export default class ResourcesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      html: `<iframe allowfullscreen allow="fullscreen" style="border:none;width:100%;height:324px;" src="//e.issuu.com/embed.html?d=whataboutgender_spa&u=encircletogether"></iframe>`
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
        const data = [];
        for (const key in resData.rsp._content.result._content) {
          data.push(
            new Publication(
              resData.rsp._content.result._content[key].document.documentId,
              resData.rsp._content.result._content[key].document.publicationId,
              resData.rsp._content.result._content[key].document.title,
              resData.rsp._content.result._content[key].document.description,
              resData.rsp._content.result._content[key].document.publishDate)
          );
        }
        // for(const i in data) {
        //   console.log(data[i])
        // }
        this.setState({
          items: data
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <FlatList
          data={this.state.items}
          keyExtractor={item => item.docId}
          renderItem={({ item }) => <View key={item.docId}><Text>{item.title}</Text></View>}
        /> */}

        <WebView
          source={{ html: this.state.html }}
          style={styles.resource}
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
  },
  resource: {
    width: "100%",
    flex: 1
  }
});