import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Resource = (props) => {
  const id = props.id;
  const name = props.name;
  const title = props.title;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate("Resource", {
            resourceName: name
          })
        }
      >
        <Image
          style={{
            height: 300,
            width: '99%',
            alignItems: "center"

          }}
          source={{
            uri: `https://image.issuu.com/${id}/jpg/page_1_thumb_large.jpg`
          }}
        />
        <Text style={styles.titleText}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: 200
  },
  resources: {
    fontSize: 40,
    marginTop: '20%',
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

export default Resource;
