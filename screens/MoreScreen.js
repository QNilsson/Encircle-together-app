import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';


const MoreScreen = props => {
// const [productName, setProductName] = useState([]);

  useEffect(() => {
    axios.get('https://ab08f5570806f2750ab286a8c8256e99:1022e7dc7806cc2b88825a76fa7386d1@encircle-lgbtq-family-youth-resource-center.myshopify.com/admin/api/2020-01/products.json')
    .then(response => {
      // console.log(response.data.products); //console log first product object
      // console.log(response.data.products[0].title); //console log single product name
      // console.log('$' + response.data.products[0].variants[0].price); //console log single product price
      // console.log(response.data.products[0].images[0].src);

      productData = response.data.products;
      
      productData.forEach(product => {
        console.log(product.title);
        console.log('IMAGE IS: ' + product.images[0].src);
        console.log('PRICE: ' +  '$' + product.variants[0].price);
        return (
        <Text>{product.title}</Text>
        )
      })
      .catch(err => {
        console.log(err);
      });
  });
});

    

  return (
      <View style={styles.container}>
        <Text>Shop Screen</Text>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MoreScreen;