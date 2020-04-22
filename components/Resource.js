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
    width: 200,
    paddingHorizontal: 8
  },
  titleText: {
    fontSize: 16,
    width: '98%',
    color: "#2B2B2B",
    textAlign: "center",
    fontFamily: 'Futura-Medium',
    paddingTop: 15
  }
});

export default Resource;
