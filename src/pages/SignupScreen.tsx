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
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  AppTabParamList,
  AuthStackParamList,
  RootStackParamList,
} from '../types/navigation';

type SignupNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AuthStackParamList, 'Signup'>,
  CompositeNavigationProp<
    StackNavigationProp<RootStackParamList>,
    StackNavigationProp<AppTabParamList>
  >
>;

type Props = {
  navigation: SignupNavigationProp;
};

export default function SignupScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    const res = await authService.signup(name, email, password);
    setLoading(false);

    if (res.ok) {
      navigation.replace('MainApp');
    } else {
      Alert.alert('Signup Error', res.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
      />
      <TextInput
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Signup</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
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
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
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
