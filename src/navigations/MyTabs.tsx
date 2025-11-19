import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../pages/Home';
import ProfileScreen from '../pages/ProfileScreen';
import { AppTabParamList } from '../types/navigation';
import { Calendar, Home, List, User } from 'lucide-react-native';
import ListScreen from '../pages/ListScreen';
import EventScreen from '../pages/EventScreen';

const Tab = createBottomTabNavigator<AppTabParamList>();

// ⭐ ICON MAP — OUTSIDE COMPONENT
const TAB_ICONS: Record<keyof AppTabParamList, any> = {
  Home: Home,
  Profile: User,
  List: List,
  Event: Calendar,
};

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const IconComponent = TAB_ICONS[route.name];

        return {
          headerShown: false,
          tabBarActiveTintColor: '#2563EB',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color, size }) => (
            <IconComponent color={color} size={size ?? 24} />
          ),
        };
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="List" component={ListScreen} />
      <Tab.Screen name="Event" component={EventScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
