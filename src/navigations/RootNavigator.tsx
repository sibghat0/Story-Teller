import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

import AuthStack from './AuthStack';
import MyTabs from './MyTabs';

const RootStack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="AuthStack" component={AuthStack} />
        <RootStack.Screen name="MainApp" component={MyTabs} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
