import React from "react";
import {Platform} from "react-native";
import {createBottomTabNavigator} from "react-navigation-tabs";
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {Ionicons} from "@expo/vector-icons";

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

const AppNavigator = createBottomTabNavigator(
	{
    Dashboard: Dashboard,
		Calendar: CalendarNavigator,
		Resources: ResourceNavigator,
		EncircleLive: EncircleLiveScreen,
		More: MoreNavigator,
	},
	{
		defaultNavigationOptions: ({navigation}) => ({
			tabBarIcon: ({focused, horizontal, tintColor}) => {
				const {routeName} = navigation.state;
				let IconComponent = Ionicons;
				let iconName;

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
						name={Platform.OS === "ios" ? "ios-" + iconName : "md-" + iconName}
						size={25}
						color={tintColor}
					/>
				);
			},
		}),
		tabBarOptions: {
			activeTintColor: "tomato",
			inactiveTintColor: "gray",
			showLabel: false,
			style: {
				marginBottom: 30,
				marginTop: 10,
			},
		},
	}
);

export default createAppContainer(AppNavigator);
