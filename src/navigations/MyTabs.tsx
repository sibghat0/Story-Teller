import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../pages/Home';
import ProfileScreen from '../pages/ProfileScreen';
import { AppTabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<AppTabParamList>();

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { height: 60, paddingBottom: 8, paddingTop: 8 },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
