import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeComponent from '../../components/home/HomeComponent';
import ListComponent from '../../components/list/ListComponent';
import ChartComponent from '../../components/chart/ChartComponent';
import MoreComponent from '../../components/more/MoreComponent';

const Tab = createBottomTabNavigator();

function HomeScreen({route}) {
  const {userData} = route.params; // userData를 가져옵니다

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        children={() => <HomeComponent userData={userData} />} // userData를 전달
      />
      <Tab.Screen
        name="List"
        children={() => <ListComponent userData={userData} />} // userData를 전달
      />
      <Tab.Screen
        name="Chart"
        children={() => <ChartComponent userData={userData} />} // userData를 전달
      />
      <Tab.Screen
        name="More"
        children={() => <MoreComponent userData={userData} />} // userData를 전달
      />
    </Tab.Navigator>
  );
}

export default HomeScreen;
