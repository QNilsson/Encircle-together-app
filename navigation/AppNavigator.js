import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Ionicons } from "@expo/vector-icons";
import CustomIcon from "../constants/Icon";

import Dashboard from "../screens/Dashboard";
import EncircleLiveScreen from "../screens/EncircleLiveScreen";
import MoreScreen from "../screens/MoreScreen";
import ResourcesScreen from "../screens/ResourcesScreen";
import ResourceScreen from "../screens/ResourceScreen";
import DonateScreen from "../screens/DonateScreen";
import LocationScreen from "../screens/LocationScreen";
import ShopScreen from "../screens/ShopScreen";
import Calendar from "../screens/Calendar";
import EventScreen from "../screens/EventScreen";

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

// app bottom tab stack
const AppNavigator = createBottomTabNavigator(
  {
    Dashboard: Dashboard,
    Resources: ResourceNavigator,
    Calendar: CalendarNavigator,
    EncircleLive: EncircleLiveScreen,
    More: MoreNavigator,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;

        // sets tab icon based on values in AppNavigator
        if (routeName === "Dashboard") {
          iconName = focused ? "Home" : "Home";
        } else if (routeName === "Calendar") {
          iconName = focused ? "Calendar" : "Calendar";
        } else if (routeName === "Resources") {
          iconName = focused ? "Book" : "Book";
        } else if (routeName === "EncircleLive") {
          iconName = focused ? "Analytics" : "Analytics";
        } else if (routeName === "More") {
          iconName = focused ? "More" : "More";
        } else if (routeName === "Donate") {
          iconName = focused ? "gift" : "gift";
        } else if (routeName === "Shop") {
          iconName = focused ? "cart" : "cart";
        }

        return (
          <TouchableOpacity>
            <CustomIcon style={styles.icon} name={iconName} />
          </TouchableOpacity>
        );
      },
    }),
    // bottom tab bar styling
    tabBarOptions: {
      activeTintColor: "black",
      inactiveTintColor: "gray",
      showLabel: false,
      style: {
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: "#BABDC1",
        paddingTop: 5,
        paddingBottom: 15,
        height: 90,
        position: "relative",
      },
    },
  }
);

const styles = StyleSheet.create({
  icon: {
    color: "red",
  },
});

export default createAppContainer(AppNavigator);
