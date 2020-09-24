import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Ionicons } from "@expo/vector-icons";

import Dashboard from '../screens/Dashboard';
import EncircleLiveScreen from "../screens/EncircleLiveScreen";
import MoreScreen from "../screens/MoreScreen";
import ResourcesScreen from "../screens/ResourcesScreen";
import ResourceScreen from "../screens/ResourceScreen";
import DonateScreen from "../screens/DonateScreen";
import LocationScreen from "../screens/LocationScreen";
import ShopScreen from "../screens/ShopScreen";
import Calendar from "../screens/Calendar";
import EventScreen from "../screens/EventScreen";
// import { DynamicStyleSheet, DynamicValue, useDynamicStyleSheet } from "react-native-dark-mode";

// more screen stack
const MoreNavigator = createStackNavigator(
  {
    More: MoreScreen,
    Location: LocationScreen,
    Donate: DonateScreen,
    Shop: ShopScreen,
  },
  {
    header: null,
    headerMode: "none",
  }
);

// resource screen stack
const ResourceNavigator = createStackNavigator(
  {
    Resources: ResourcesScreen,
    Resource: ResourceScreen,
  },
  {
    header: null,
    headerMode: "none",
  }
);

// calendar screen stack
const CalendarNavigator = createStackNavigator(
  {
    Calendar: Calendar,
    Event: EventScreen,
  },
  {
    header: null,
    headerMode: "none",
  }
);

// dark mode
// const DynamicStyles = new DynamicStyleSheet( {
//   container: {
//     backgroundColor: new DynamicValue('white', 'black')
//   },
//   text: {
//     color: new DynamicValue('black', 'white')
//   }
// })

// app bottom tab stack
const AppNavigator = createBottomTabNavigator(
  {
    Dashboard: Dashboard,
    Calendar: CalendarNavigator,
    Resources: ResourceNavigator,
    EncircleLive: EncircleLiveScreen,
    More: MoreNavigator,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        // const styles = useDynamicStyleSheet(DynamicStyles); //dark mode
        let IconComponent = Ionicons;
        let iconName;

        // sets tab icon based on values in AppNavigator
        if (routeName === "Dashboard") {
          iconName = focused ? "home" : "home";
        } else if (routeName === "Calendar") {
          iconName = focused ? "calendar" : "calendar";
        } else if (routeName === "Resources") {
          iconName = focused ? "book" : "book";
        } else if (routeName === "EncircleLive") {
          iconName = focused ? "analytics" : "analytics";
        } else if (routeName === "More") {
          iconName = focused ? "more" : "more";
        } else if (routeName === "Donate") {
          iconName = focused ? "gift" : "gift";
        } else if (routeName === "Shop") {
          iconName = focused ? "cart" : "cart";
        }

        return (
          <IconComponent
            // sets icon based on platform
            // style={styles.container} //dark mode
            name={Platform.OS === "ios" ? "ios-" + iconName : "md-" + iconName}
            size={25}
            color={tintColor}
          />
        );
      },
    }),
    // bottom tab bar styling
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray",
      showLabel: false,
      style: {
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: '#BABDC1',
        paddingTop: 5,
        paddingBottom: 30,
        height: 100,
        position: 'relative'
      },
    },
  }
);

export default createAppContainer(AppNavigator);
