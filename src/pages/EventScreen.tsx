import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EventScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event</Text>
      <Text>Welcome to the app. You are logged in.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
});
