import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from '../supabaseClient';
import { colors } from '../constants/colors'; // Certifique-se de que esse arquivo existe

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  async function handleLogin() {
    if (!email.trim() || !senha) {
      Alert.alert('Erro', 'Por favor, preencha email e senha.');
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });
    setLoading(false);

    if (error) {
      Alert.alert('Erro no login', error.message);
      return;
    }

    navigation.navigate('Home' as never);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.header}>
            <MaterialCommunityIcons name="puzzle" size={32} color={colors.strongBlue} />
            <Text style={styles.title}>Protocolo TEA</Text>
          </View>

          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons
              name="email-outline"
              size={22}
              color={colors.secondary}
              style={styles.icon}
            />
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={colors.placeholder}
            />
          </View>

          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={22}
              color={colors.secondary}
              style={styles.icon}
            />
            <TextInput
              placeholder="Senha"
              style={styles.input}
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
              placeholderTextColor={colors.placeholder}
            />
          </View>

          {loading ? (
            <ActivityIndicator size="large" color={colors.strongBlue} style={{ marginVertical: 12 }} />
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.strongBlue,
    marginLeft: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: colors.textDark,
  },
  button: {
    backgroundColor: colors.strongBlue,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: colors.textLight,
    fontWeight: '600',
    fontSize: 18,
  },
});
