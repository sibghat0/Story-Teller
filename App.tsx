import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigator from './src/navigations/RootNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootNavigator />
    </GestureHandlerRootView>
  );
}
