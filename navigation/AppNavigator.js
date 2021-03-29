import React, { useContext } from "react";
import { Text, Platform } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Ionicons } from "@expo/vector-icons";

import Dashboard from "../screens/Dashboard";
import MoreScreen from "../screens/MoreScreen";
import ResourcesScreen from "../screens/ResourcesScreen";
import ResourceScreen from "../screens/ResourceScreen";
import DonateScreen from "../screens/DonateScreen";
import LocationScreen from "../screens/LocationScreen";
import Calendar from "../screens/Calendar";
import EventScreen from "../screens/EventScreen";
import VolunteerScreen from "../screens/Volunteer"

// more screen stack
const MoreNavigator = createStackNavigator(
  {
    More: MoreScreen,
    Location: LocationScreen,
    Volunteer: VolunteerScreen,
    Donate: DonateScreen,
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
    Calendar: CalendarNavigator,
    Resources: ResourceNavigator,
    More: MoreNavigator,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        // const styles = useDynamicStyleSheet(DynamicStyles); //dark mode
        let IconComponent = Ionicons;
        let iconName;

        let iconStyle = {fontFamily: 'Icomoon', fontSize: 28}
        let iconColor = {color: 'tomato'}

        // sets tab icon based on values in AppNavigator
        if (routeName === "Dashboard") {
          return <Text style={[iconStyle, focused ? iconColor : null]}></Text>
        } else if (routeName === "Calendar") {
          return <Text style={[iconStyle, focused ? iconColor : null]}></Text>
        } else if (routeName === "Resources") {
          return <Text style={[iconStyle, focused ? iconColor : null]}></Text>
        } else if (routeName === "EncircleLive") {
          return <Text style={[iconStyle, focused ? iconColor : null]}></Text>
        } else if (routeName === "More") {
          return <Text style={[iconStyle, focused ? iconColor : null]}></Text>
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
        borderColor: "#BABDC1",
        paddingTop: 5,
        paddingBottom: 30,
        height: 90,
        position: "relative",
      },
    },
  }
);

export default createAppContainer(AppNavigator);
