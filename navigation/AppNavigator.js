import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CalendarScreen from '../screens/CalendarScreen';
import DashboardScreen from '../screens/DashboardScreen';
import EncircleLiveScreen from '../screens/EncircleLiveScreen';
import MoreScreen from '../screens/MoreScreen';
import ResourcesScreen from '../screens/ResourcesScreen';
import ResourceScreen from '../screens/ResourceScreen';
import DonateScreen from '../screens/DonateScreen';
import LocationScreen from '../screens/LocationScreen';
import ShopScreen from '../screens/ShopScreen';

const MoreNavigator = createStackNavigator({
  More: MoreScreen,
  Location: LocationScreen
})

const ResourceNavigator = createStackNavigator({
  Resources: ResourcesScreen,
  Resource: ResourceScreen
})

const AppNavigator = createBottomTabNavigator({
  Dashboard: DashboardScreen,
  Calendar: CalendarScreen,
  Resources: ResourceNavigator,
  EncircleLive: EncircleLiveScreen,
  More: MoreNavigator,
  Donate: DonateScreen,
  Shop: ShopScreen
});

export default createAppContainer(AppNavigator);
