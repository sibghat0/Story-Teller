import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import authService from '../services/authService';

export default function ProfileScreen() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await authService.logout();
  };

  const loadProfile = async () => {
    const res = await authService.getProfile();
    if (res.ok) {
      setProfile(res.user);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {profile && (
        <Text style={styles.userInfo}>
          {profile.name} | {profile.email}
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
