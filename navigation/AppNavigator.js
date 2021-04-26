import React, { useContext } from "react";
import { Text, Platform, Linking } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Ionicons } from "@expo/vector-icons";
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu'

import Dashboard from "../screens/Dashboard";
import MoreScreen from "../screens/MoreScreen";
import ResourcesScreen from "../screens/ResourcesScreen";
import ResourceScreen from "../screens/ResourceScreen";
import Calendar from "../screens/Calendar";
import EventScreen from "../screens/EventScreen";

// more screen stack
const MoreNavigator = createStackNavigator(
  {
    More: MoreScreen,
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


        // } else if (routeName === "More") {
        //   return 
        // } else if (routeName === "Donate") {
        //   iconName = focused ? "gift" : "gift";
        // } else if (routeName === "Shop") {
        //   iconName = focused ? "cart" : "cart";
        // }

        }else if (routeName === "More"){
          return(
            <Menu>
              <MenuTrigger hitSlop={{top: 65, bottom: 70, left:45, right:100}}>
              <Text style={[iconStyle, focused ? iconColor : null]}></Text>
              </MenuTrigger>
              <MenuOptions customStyles={optionsStyles}>
                <MenuOption  onSelect={() => Linking.openURL("https://encircletogether.org/involved/")} text='Volunteer at Encircle'/>
                <MenuOption  onSelect={() => this.props.navigation.navigate("SupportScreen")} text='Hotlines & Support'/>
                <MenuOption  onSelect={() => Linking.openURL("https://www.encircletherapy.org/")} text='Schedule a Therapy Session'/>
                <MenuOption onSelect={() => Linking.openURL("https://encirclestore.org/")} text='Encircle Store'/>
              </MenuOptions>
            </Menu>
          )
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
    //bottom tab bar styling
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray",
      showLabel: false,
      style: {
        // borderTopStartRadius: 30,
        // borderTopEndRadius: 30,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        // borderColor: "#BABDC1",
        paddingTop: 5,
        paddingBottom: 30,
        height: 90,
        position: "relative",
      },
    },
  }
);

const optionsStyles = {
  optionsContainer: {
    height:253,
    width:'100%',
    marginTop:-97
    
  },

  fontControl: {
    padding: 90,
  },
  
  optionWrapper: {
    backgroundColor: '#ffffff',
    margin: 5,
    // paddingTop:30,
    borderBottomColor:'#F2F2F2',
    borderBottomWidth:1,
    width:'100%'
    
  },
  optionTouchable: {
    
    activeOpacity: 50,
   
  },
  optionText: {
    color: '#3E4144',
    fontFamily:"Garamond-Regular",
    fontSize:22,
    paddingBottom:20,
    paddingTop:10,
    alignItems:'center',
    paddingLeft:5
  },
};




export default createAppContainer(AppNavigator);

