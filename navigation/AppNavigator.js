import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

import CalendarScreen from '../screens/CalendarScreen';
import DashboardScreen from '../screens/DashboardScreen';
import EncircleLiveScreen from '../screens/EncircleLiveScreen';
import MoreScreen from '../screens/MoreScreen';
import ResourcesScreen from '../screens/ResourcesScreen';
import ResourceScreen from '../screens/ResourceScreen';

const AppNavigator = createBottomTabNavigator({
  Calendar: CalendarScreen,
  Dashboard: DashboardScreen,
  EncircleLive: EncircleLiveScreen,
  More: MoreScreen,
  Resources: ResourcesScreen,
  Resource: ResourceScreen
});

export default createAppContainer(AppNavigator);