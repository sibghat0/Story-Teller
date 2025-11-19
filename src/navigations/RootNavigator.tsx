import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack';
import MyTabs from './MyTabs';
import authService from '../services/authService';

export default function RootNavigator() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      const token = await authService.loadToken();

      if (token) {
        // Optional: Load user profile automatically
        await authService.getProfile(); // only if you want
      }

      setLoggedIn(!!token);
      setLoading(false);
    };

    init();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {loggedIn ? <MyTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
