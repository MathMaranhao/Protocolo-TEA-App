import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { supabase } from '../supabaseClient';
import { Picker } from '@react-native-picker/picker'; // precisa instalar: npm i @react-native-picker/picker

export default function CadastrarUsuario() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [papel, setPapel] = useState<'coordenador' | 'professor'>('coordenador');
  const [loading, setLoading] = useState(false);

  const validarCampos = () => {
    if (!nome.trim()) {
      Alert.alert('Erro', 'Por favor, informe o nome.');
      return false;
    }
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Erro', 'Por favor, informe um email válido.');
      return false;
    }
    if (!senha || senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres.');
      return false;
    }
    if (papel !== 'coordenador' && papel !== 'professor') {
      Alert.alert('Erro', 'Selecione um papel válido.');
      return false;
    }
    return true;
  };

  async function handleCadastro() {
  if (!validarCampos()) return;

  setLoading(true);

  const { data, error } = await supabase.auth.signUp({
    email,
    password: senha,
  });

  if (error) {
    setLoading(false);
    Alert.alert('Erro ao cadastrar', error.message);
    return;
  }

  const userId = data.user?.id;

  if (!userId) {
    setLoading(false);
    Alert.alert('Erro inesperado: usuário não retornado');
    return;
  }

  const { error: insertError } = await supabase.from('perfis').insert({
    id: userId,
    nome: nome.trim(),
    papel: papel,
  });

  setLoading(false);

  if (insertError) {
    Alert.alert('Erro ao salvar perfil', insertError.message);
    console.log('Erro insert perfil:', insertError);
  } else {
    Alert.alert('Usuário cadastrado com sucesso!');
    // Aqui, se quiser, pode limpar os campos ou navegar para outra tela
  }
}



  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Text style={styles.title}>Cadastro</Text>

          <TextInput
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
            style={styles.input}
            autoCapitalize="words"
          />

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            style={styles.input}
            secureTextEntry
          />

          <Text style={styles.label}>Papel</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={papel} onValueChange={(value) => setPapel(value)}>
              <Picker.Item label="Coordenador" value="coordenador" />
              <Picker.Item label="Professor" value="professor" />
            </Picker>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 12 }} />
          ) : (
            <Button title="Cadastrar" onPress={handleCadastro} />
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 12,
    borderRadius: 6,
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 24,
  },
});
