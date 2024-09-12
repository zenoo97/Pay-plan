import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeComponent from '../../components/home/HomeComponent';
import ListComponent from '../../components/list/ListComponent';
import ChartComponent from '../../components/chart/ChartComponent';
import MoreComponent from '../../components/more/MoreComponent';

const Tab = createBottomTabNavigator();
function HomeScreen() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={HomeComponent} />
      <Tab.Screen name="List" component={ListComponent} />
      <Tab.Screen name="Chart" component={ChartComponent} />
      <Tab.Screen name="more" component={MoreComponent} />
    </Tab.Navigator>
  );
}

export default HomeScreen;
