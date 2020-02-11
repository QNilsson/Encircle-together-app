import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CalendarScreen from '../screens/CalendarScreen';
import DashboardScreen from '../screens/DashboardScreen';
import EncircleLiveScreen from '../screens/EncircleLiveScreen';
import MoreScreen from '../screens/MoreScreen';
import ResourcesScreen from '../screens/ResourcesScreen';
import ResourceScreen from '../screens/ResourceScreen';

const ResourceNavigator = createStackNavigator({
  Resources: ResourcesScreen,
  Resource: ResourceScreen
})

const AppNavigator = createBottomTabNavigator({
  Calendar: CalendarScreen,
  Dashboard: DashboardScreen,
  EncircleLive: EncircleLiveScreen,
  More: MoreScreen,
  Resources: ResourceNavigator
});

export default createAppContainer(AppNavigator);
