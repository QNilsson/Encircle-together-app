import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Linking,
  SafeAreaView,
  Platform
} from "react-native";

import Product from "../models/product";
// imports static product data array (loaded with product objects)
import { PRODUCTS } from '../constants/products';
import { Ionicons } from "@expo/vector-icons";

export default class ShopScreen extends Component {
  static navigationOptions = {
    title: "Shop"
  };

  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }

  imageHeight = 250;
  imageWidth = "100%";

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    // dynamically loads products using shopify api on ios platform
    if(Platform.OS === 'ios'){
      const url = `https://ab08f5570806f2750ab286a8c8256e99:1022e7dc7806cc2b88825a76fa7386d1@encircle-lgbtq-family-youth-resource-center.myshopify.com/admin/api/2020-01/products.json`;

      fetch(url)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          const products = result.products;
          console.log(products);
          const productData = [];
  
          for (const key in products) {
            if (products[key].image) {
              /* this is conditionally see if the products have an image. If they don't have an image, then they are used interally for Encirlce */
              console.log(
                `This product has an image src of: ${products[key].image.src}`
              );
              productData.push(
                new Product(
                  products[key].image.src,
                  products[key].title,
                  products[key].variants[0].price
                )
              );
            } else {
              console.log(`This product has no image src property`);
            }
          }
  
          for (const i in productData) {
            console.log(productData[i]);
          }
  
          this.setState({
            products: productData
          });
        })
        .catch(err => console.log(err));
    } else {
      // loads static products on android platform (android receives invalid shopify api response?)
      this.setState({
        products: PRODUCTS
      })
    }
    
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.mainContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.shop}>Shop</Text>
            <Text style={styles.paragraph}>
              Show the world what "No sides, only love" means to you
            </Text>
            <TouchableOpacity
              style={styles.calendarButton}
              onPress={() => Linking.openURL("https://encirclestore.org/")}
            >
              <Text style={styles.buttonText}>VIST FULL SHOP</Text>
              <Ionicons
                name="ios-arrow-round-forward"
                size={35}
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
          </View>

          <FlatList
            numColumns={2}
            style={styles.container}
            data={this.state.products}
            keyExtractor={product => product.title}
            renderItem={({ item }) => (
              <View style={styles.item}>
                {
                  <Image
                    style={{ width: "99%", height: 300 }}
                    source={{ uri: item.image }}
                  />
                }
                <TouchableOpacity style={styles.textBlock}>
                  <Text style={styles.titleText}>{item.title}</Text>
                  <Text style={styles.priceText}>{item.price}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    margin: 20,
    marginTop: '10%',
    marginBottom: 50
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  shop: {
    fontSize: 40,
    textAlign: "center",
    color: "#2B2B2B",
    fontFamily: "Garamond-Regular",
    marginTop: "20%"
  },
  paragraph: {
    fontSize: 18,
    color: "#686868",
    textAlign: "center",
    margin: 8,
    marginBottom: 20,
    alignItems: "center",
    fontFamily: "Clarendon-Regular"
  },
  calendarButton: {
    display: "flex",
    flexDirection: "row",
    padding: 8,
    paddingRight: 30,
    paddingLeft: 30,
    backgroundColor: "black",
    minWidth: 250,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18
  },
  arrowIcon: {
    color: "white",
    marginLeft: "auto",
    fontWeight: "700"
  },
  container: {
    marginBottom: 50
  },
  item: {
    flex: 1,
    textAlign: "center",
  },
  containerTest: {
    flex: 1
  },
  textBlock: {
    marginTop: 10,
    marginBottom: 15
  },
  titleText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2B2B2B",
    textAlign: "center",
    fontFamily: "Clarendon-Regular"
  },
  priceText: {
    color: "#686868",
    fontStyle: "italic",
    textAlign: "center",
    padding: 10,
    fontFamily: "Garamond-Regular"
  }
});
