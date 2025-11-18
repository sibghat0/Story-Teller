import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import authService from '../services/authService';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  AppTabParamList,
  AuthStackParamList,
  RootStackParamList,
} from '../types/navigation';
import { CompositeNavigationProp } from '@react-navigation/native';

type LoginScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AuthStackParamList, 'Login'>,
  CompositeNavigationProp<
    StackNavigationProp<RootStackParamList>,
    StackNavigationProp<AppTabParamList>
  >
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const res = await authService.login(email, password);
    setLoading(false);

    if (res.ok) {
      navigation.replace('MainApp');
    } else {
      Alert.alert('Signup Error', res.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Create an account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#fff' },
  input: {
    borderWidth: 1,
    padding: 12,
    paddingLeft: 16,
    color: '#fff',
    marginBottom: 12,
    borderRadius: 8,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  link: { color: '#2563EB', textAlign: 'center', marginTop: 16 },
});
