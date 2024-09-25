import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeComponent from '../../components/home/HomeComponent';
import ListComponent from '../../components/list/ListComponent';
import ChartComponent from '../../components/chart/ChartComponent';
import MoreComponent from '../../components/more/MoreComponent';

const Tab = createBottomTabNavigator();

function HomeScreen({route}) {
  const {userData} = route?.params; // userData를 가져옵니다

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="HomeTab"
        children={() => <HomeComponent userData={userData} />} // userData를 전달
      />
      <Tab.Screen
        name="ListTab"
        children={() => <ListComponent userData={userData} />} // userData를 전달
      />
      <Tab.Screen
        name="ChartTab"
        children={() => <ChartComponent userData={userData} />} // userData를 전달
      />
      <Tab.Screen
        name="MoreTab"
        children={() => <MoreComponent userData={userData} />} // userData를 전달
      />
    </Tab.Navigator>
  );
}

export default HomeScreen;
