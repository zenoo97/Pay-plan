import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeComponent from '../../components/home/HomeComponent';
import ListComponent from '../../components/list/ListComponent';
import ChartComponent from '../../components/chart/ChartComponent';
import MoreComponent from '../../components/more/MoreComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();

function HomeScreen({route}) {
  const {userData} = route?.params; // userData를 가져옵니다

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="홈"
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        children={() => <HomeComponent userData={userData} />} // userData를 전달
      />
      <Tab.Screen
        name="리스트"
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="view-list"
              color={color}
              size={size}
            />
          ),
        }}
        children={() => <ListComponent userData={userData} />} // userData를 전달
      />
      <Tab.Screen
        name="차트"
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="chart-areaspline"
              color={color}
              size={size}
            />
          ),
        }}
        children={() => <ChartComponent userData={userData} />} // userData를 전달
      />
      <Tab.Screen
        name="MY"
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="dots-horizontal"
              color={color}
              size={size}
            />
          ),
        }}
        children={() => <MoreComponent userData={userData} />} // userData를 전달
      />
    </Tab.Navigator>
  );
}

export default HomeScreen;
