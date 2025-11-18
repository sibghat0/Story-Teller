import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import authService from '../services/authService';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppTabParamList, RootStackParamList } from '../types/navigation';

type ProfileNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<AppTabParamList, 'Profile'>,
  StackNavigationProp<RootStackParamList>
>;

type Props = {
  navigation: ProfileNavProp;
};

export default function ProfileScreen({ navigation }: Props) {
  const [profile, setProfile] = useState<any>(null);
  const handleLogout = async () => {
    await authService.logout();
    navigation.replace('AuthStack');
  };

  const handleShowProfile = async () => {
    const prof = await authService.getProfile();
    setProfile(prof);
  };

  useEffect(() => {
    handleShowProfile();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {authService.user && (
        <Text style={styles.userInfo}>
          {profile.user.name} | {profile.user.email}
        </Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '700' },
  userInfo: { marginBottom: 10 },
  button: {
    marginTop: 20,
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 8,
    width: 150,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});
