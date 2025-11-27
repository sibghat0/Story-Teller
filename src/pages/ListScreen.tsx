import React from 'react';
import { View, StyleSheet } from 'react-native';
import ListView from '../components/ListView/ListView';

export default function ListScreen() {
  return (
    <View style={styles.container}>
      <ListView />
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
});
