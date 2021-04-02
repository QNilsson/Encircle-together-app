import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from "react-native";

const Resource = (props) => {
  const id = props.id;
  const name = props.name;
  const title = props.title;

  const outsideLink = () => {
    let url = "";

    // points webview uri to issuu publication story url (https://issuu.com/) - cannot pull this url using api (https://developer.issuu.com/)
    switch (name) {
      case "gsatoolkit":
        Linking.openURL(
          "https://issuu.com/encircletogether/docs/gsatoolkit/s/10192081"
        );
        break;
      case "encircle_magazine_draft__2":
        Linking.openURL(
          "https://issuu.com/encircletogether/docs/encircle_magazine_draft__2/s/10297797"
        );
        break;
      case "explanation_of_homosexuality":
        Linking.openURL(
          "https://issuu.com/encircletogether/docs/explanation_of_homosexuality/s/10297790"
        );
        break;
      case "soce_12.9.17":
        Linking.openURL(
          "https://issuu.com/encircletogether/docs/soce_12.9.17/s/10297478"
        );
        break;
      case "gregprince_12.9.17":
        Linking.openURL(
          "https://issuu.com/encircletogether/docs/gregprince_12.9.17/s/10283847"
        );
        break;
      case "_3_admirationoranimosity_12.9.17":
        Linking.openURL(
          "https://issuu.com/encircletogether/docs/_3_admirationoranimosity_12.9.17/s/10224048"
        );
        break;
      case "contrast-series3_final":
        Linking.openURL(
          "https://issuu.com/encircletogether/docs/contrast-series3_final/s/10297880"
        );
        break;
      case "aparentsguide":
        Linking.openURL(
          "https://issuu.com/encircletogether/docs/aparentsguide/s/10224030"
        );
        break;
      case "whataboutgender":
        Linking.openURL(
          "https://issuu.com/encircletogether/docs/whataboutgender/s/10224013"
        );
        break;
      case "admiration_spa":
        Linking.openURL(
          "https://issuu.com/encircletogether/docs/admiration_spa/s/10297809"
        );
        break;
      case "sciencedogma_spa":
        Linking.openURL(
          "https://issuu.com/encircletogether/docs/sciencedogma_spa/s/10297803"
        );
        break;
      case "sexualorientation_spa":
        Linking.openURL(
          "https://issuu.com/encircletogether/docs/sexualorientation_spa/s/10297802"
        );
        break;
      case "explanation_spa":
        Linking.openURL(
          "https://issuu.com/encircletogether/docs/explanation_spa/s/10297801"
        );
        break;
      case "whataboutgender_spa":
        Linking.openURL(
          "https://issuu.com/encircletogether/docs/whataboutgender_spa/s/10297799"
        );
        break;
      default:
        url = "";
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          outsideLink()
        }
      >
        <Image
          style={{
            height: 300,
            width: "99%",
            alignItems: "center",
          }}
          source={{
            uri: `https://image.issuu.com/${id}/jpg/page_1_thumb_large.jpg`,
          }}
        />
        <Text style={styles.titleText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 200,
    paddingHorizontal: 8,
  },
  titleText: {
    fontSize: 16,
    width: "98%",
    color: "#2B2B2B",
    textAlign: "center",
    fontFamily: "Clarendon-Regular",
    paddingTop: 15,
  },
});

export default Resource;
