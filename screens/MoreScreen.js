import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';

import Product from '../models/product';

export default class MoreScreen extends Component {
  static navigationOptions = {
    title: 'More',
  };

  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    axios.get('https://ab08f5570806f2750ab286a8c8256e99:1022e7dc7806cc2b88825a76fa7386d1@encircle-lgbtq-family-youth-resource-center.myshopify.com/admin/api/2020-01/products.json')
    .then(response => {
      const products = response.data.products;
      const productData = [];
      // console.log(products);
      console.log(products[0].image.src);

        /* this is conditionally see if the products have an image. If they don't have an image, then they are used interally for Encirlce */
        for (const key in products) {
          console.log(`key is: ${key}` + products[key].title)
          if (products[key].image) {
            console.log(`This product has an image src of: ${products[key].image.src}`)
            productData.push(
              new Product(
                products[key].image.src,
                products[key].title,
                products[key].variants[0].price,
                )
            );
          } else {
            console.log(`This product has no image src property`)
          }
          
        }

        for (const i in productData) {
          console.log(productData[i])
        }

        this.setState({
          products: productData
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.shop}>Shop</Text>
        <Text style={styles.paragraph}>Show the world what "No sides, only love" means to you</Text>
        {<FlatList
          numColumns={2}
          style={styles.container}
          data={this.state.products}
          keyExtractor={product => product.title}
          renderItem={({ item }) => 
            <View style={styles.item}
              >
              {<Image
                style={{width: 175, height: 250}}
                source={{uri: item.image }}
              />}

              <TouchableOpacity
                style={styles.textBlock}
              >
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.priceText}>${item.price}</Text>
              </TouchableOpacity>

              
            </View>
        }
        />}

       
      </View>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    margin: 20,
    marginTop: 100,
    marginBottom: 50
    // textAlign: "center"
  }, 
  shop: {
    fontSize: 40,
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
  container: {
    /* flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    columnWrapperStyle: '' 
    alignItems: 'center'
    */
    marginBottom: 50,
  }, 
  item: {
    // width: '20%',
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center'
  },
  containerTest: {
    flex: 1,
    // flexDirection: "column"
  },
  textBlock: {
    marginTop: 10,
    marginBottom: 15
  },
  titleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2B2B2B',
    textAlign: 'center',
  },
  priceText: {
    color: '#686868',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 10,
  }

});