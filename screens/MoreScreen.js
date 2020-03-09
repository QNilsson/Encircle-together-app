import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Button, View, FlatList } from 'react-native';
import axios from 'axios';


const MoreScreen = props => {
  let titleArr = [];
  let [test, setTest] = useState([]);

  useEffect(() => {
    axios.get('https://ab08f5570806f2750ab286a8c8256e99:1022e7dc7806cc2b88825a76fa7386d1@encircle-lgbtq-family-youth-resource-center.myshopify.com/admin/api/2020-01/products.json')
    .then(response => {
      // console.log(response.data.products); //console log first product object
      // console.log(response.data.products[0].title); //console log single product name
      // console.log('$' + response.data.products[0].variants[0].price); //console log single product price
      // console.log(response.data.products[0].images[0].src);

      productData = response.data.products;
      console.log(productData); // this gets all product data
      setTest('Hello');

      productData.forEach(product => {
        // i believe this is where each product needs to get a set state, I could be completely wrong though
        // I've tried many different things and this is where I'm stuck

        /* console.log(product.title);
        console.log('IMAGE IS: ' + product.images[0].src);
        console.log('PRICE: ' +  '$' + product.variants[0].price);
        titleArr.push(product.title);
        console.log(titleArr); */
        
      })
      
  })
  .catch(err => {
    console.log(err);
  });
});


  return (
      <View style={styles.container}>
      <Text>test: {test}</Text>
        <View>
          <Button title="Locations" onPress={() => props.navigation.navigate('Location')}/>
        </View>
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