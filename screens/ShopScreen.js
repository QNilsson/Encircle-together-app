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
  Pressable,
  ImageBackground,
} from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import { Divider } from "react-native-elements";

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
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.headerContainer}>
        <ImageBackground
          source={require("../assets/storeHeader.png")}
          style={styles.headerImage}
        />
      </View>

      <View style={styles.filter}>
        <Collapse onToggle={changeOpen}>
          <CollapseHeader>
            <View style={styles.filter}>
              <Text style={styles.filterHeader}>
                {productType == null ? "All Products" : productType}
                {isOpen ? (
                  <AntDesign
                    style={styles.icon}
                    name="down"
                    size={22}
                    color="black"
                  />
                ) : (
                  <AntDesign
                    style={styles.icon}
                    name="up"
                    size={22}
                    color="black"
                  />
                )}
              </Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Divider style={styles.divider} />
            <Pressable
              style={styles.filterButton}
              onPress={() => setFilter("Clothing")}
              accessibilityLabel="Click this to filter clothing"
            >
              <Text style={styles.filterText}>Clothing</Text>
            </Pressable>
            <Divider style={styles.divider} />
            <Pressable
              style={styles.filterButton}
              onPress={() => setFilter("Accessories")}
              accessibilityLabel="Click this to filter clothing"
            >
              <Text style={styles.filterText}>Accessories</Text>
            </Pressable>
            <Divider style={styles.divider} />
            <Pressable
              style={styles.filterButton}
              onPress={() => setFilter("Resources")}
              accessibilityLabel="Click this to filter clothing"
            >
              <Text style={styles.filterText}>Resources</Text>
            </Pressable>
            <Divider style={styles.divider} />
            <Pressable
              style={styles.filterButton}
              onPress={() => setFilter("Sale")}
              accessibilityLabel="Click this to filter clothing"
            >
              <Text style={styles.filterText}>Sale</Text>
            </Pressable>
            <Divider style={styles.divider} />
            <Pressable
              style={styles.filterButton}
              onPress={() => setFilter("Last Chance")}
              accessibilityLabel="Click this to filter clothing"
            >
              <Text style={styles.filterText}>Last Chance</Text>
            </Pressable>
          </CollapseBody>
        </Collapse>
        <Divider style={styles.divider} />
      </View>
      <Text style={styles.itemsHeader}>{productType === null ? "All Products" : productType}</Text>
      <FlatList
        numColumns={2}
        style={styles.items}
        data={products}
        keyExtractor={(product) => product.title}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {<Image style={styles.itemImage} source={{url: item.url}} />}
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
    resizeMode: "cover",
    justifyContent: "center",
    height: 197,
    width: "100%",
  },
  headerContainer: {
    width: "100%",
    top: 0,
  },
  filterHeader: {
    padding: 15,
    alignContent: "center",
    paddingTop: 20,
    fontSize: 22,
  },
  filterButton: {
    backgroundColor: "white",
    padding: 15,
  },
  filterText: {
    fontSize: 22,
  },
  filter: {
    width: "100%",
  },
  itemsHeader: {
    fontSize: 24,
    margin: 25,
  },
  items: {},
  item: {},
  itemImage: {
    resizeMode: "contain",
  },
  icon: {
    marginLeft: 5,
  },
  divider: {
    backgroundColor: "#F2F2F2",
    height: 2,
    marginRight: 15,
    marginLeft: 15,
  },
});
