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
      <View style={styles.container}>
        
        {<FlatList
          style={styles.containerTest}
          data={this.state.products}
          keyExtractor={product => product.title}
          renderItem={({ item }) => 
            <View 
              >
              {<Image
                style={{width: 100, height: 100}}
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70,
    flexDirection: "column"
    
  }, 
  containerTest: {
    flex: 1,
    // flexDirection: "column"
  },
  textBlock: {
    marginTop: 10,
    marginBottom: 30
  },
  titleText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  priceText: {
    color: '#A9A9A9',
    fontStyle: 'italic',
  }

});