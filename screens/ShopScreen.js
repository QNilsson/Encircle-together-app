import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Linking,
  SafeAreaView,
  Platform,
  Button,
} from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";

import Product from "../models/product";
// imports static product data array (loaded with product objects)
import { PRODUCTS } from "../constants/products";
import { AntDesign } from "@expo/vector-icons";

const ShopScreen = () => {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(Boolean);
  const [productType, setProductType] = useState(null);

  const setFilter = (productString) => {
    if (productString === productType) {
      setProductType(null);
    } else {
      switch (productString) {
        case "Clothing":
          setProductType(productString);
        case "Accessories":
          setProductType(productString);
        case "Resources":
          setProductType(productString);
        case "Sale":
          setProductType(productString);
        case "Last Chance":
          setProductType(productString);
      }
    }
  };

  const changeOpen = () => {
    if (isOpen) {
      setIsOpen(false);
    }
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      // dynamically loads products using shopify api on ios platform
      if (Platform.OS === "ios") {
        const url = `https://ab08f5570806f2750ab286a8c8256e99:1022e7dc7806cc2b88825a76fa7386d1@encircle-lgbtq-family-youth-resource-center.myshopify.com/admin/api/2020-01/products.json`;

        fetch(url)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            const _products = result.products;
            console.log(_products);
            const productData = [];

            for (const key in _products) {
              if (_products[key].image) {
                /* this is conditionally see if the products have an image. If they don't have an image, then they are used interally for Encirlce */
                console.log(
                  `This product has an image src of: ${_products[key].image.src}`
                );
                productData.push(
                  new Product(
                    _products[key].image.src,
                    _products[key].title,
                    _products[key].variants[0].price
                  )
                );
              } else {
                console.log(`This product has no image src property`);
              }
            }

            for (const i in productData) {
              console.log(productData[i]);
            }

            setProducts([...productData]);
          })
          .catch((err) => console.log(err));
      } else {
        // loads static products on android platform (android receives invalid shopify api response?)

        setProducts([...PRODUCTS]);
      }
    };
    if (products.length === 0) {
      getProducts();
    }
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require("../assets/storeHeader.png")}
        style={styles.headerImage}
      />
      <View style={styles.filter}>
        <Collapse onToggle={changeOpen}>
          <CollapseHeader>
            <View>
              <Text>
                {isOpen ? (
                  <AntDesign name="down" size={24} color="black" />
                ) : (
                  <AntDesign name="up" size={24} color="black" />
                )}
                {productType == null ? "All Products" : productType}
              </Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Button
              onPress={() => setFilter("Clothing")}
              title="Clothing"
              accessibilityLabel="Click this to filter clothing"
            />
            <Button
              onPress={() => setFilter("Accessories")}
              title="Accessories"
              accessibilityLabel="Click this to filter clothing"
            />
            <Button
              onPress={() => setFilter("Resources")}
              title="Resources"
              accessibilityLabel="Click this to filter clothing"
            />
            <Button
              onPress={() => setFilter("Sale")}
              title="Sale"
              accessibilityLabel="Click this to filter clothing"
            />
            <Button
              onPress={() => setFilter("Last Chance")}
              title="Last chances"
              accessibilityLabel="Click this to filter clothing"
            />
          </CollapseBody>
        </Collapse>
      </View>
      <FlatList
        numColumns={2}
        style={styles.items}
        data={products}
        keyExtractor={(product) => product.title}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {<Image source={{ uri: item.image }} />}
            <TouchableOpacity>
              <Text>{item.title}</Text>
              <Text>{item.price}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  headerImage: {
    resizeMode: "contain",
    width: "100%",
    height: 167,
  },
  filter: {},
  items: {},
  item: {},
});
