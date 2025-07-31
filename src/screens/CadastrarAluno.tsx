import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { supabase } from '../supabaseClient';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import MaskInput, { Masks } from 'react-native-mask-input';

export default function CadastrarAluno() {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [telefone, setTelefone] = useState('');
  const [diagnostico, setDiagnostico] = useState('');

  async function handleSalvarAluno() {
    if (!nome.trim() || !dataNascimento.trim()) {
      Alert.alert('Atenção', 'Preencha os campos obrigatórios.');
      return;
    }

    const dataFormatada = moment(dataNascimento, 'DD/MM/YYYY', true);
    if (!dataFormatada.isValid()) {
      Alert.alert('Data inválida', 'Use o formato dd/mm/aaaa');
      return;
    }

    const dataIso = dataFormatada.format('YYYY-MM-DD');

    const { error } = await supabase.from('alunos').insert([
      {
        nome: nome.trim(),
        data_nascimento: dataIso,
        responsavel: responsavel.trim() || null,
        telefone_responsavel: telefone.trim() || null,
        diagnostico: diagnostico.trim() || null,
      },
    ]);

    if (error) {
      Alert.alert('Erro ao salvar', error.message);
    } else {
      Alert.alert('Sucesso', 'Aluno cadastrado com sucesso!');
      navigation.goBack();
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#e1eaf7' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Cadastro de Aluno</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome completo*"
          value={nome}
          onChangeText={setNome}
          placeholderTextColor="#8c9bb3"
        />

        <MaskInput
          style={styles.input}
          placeholder="Data de nascimento (dd/mm/aaaa)*"
          value={dataNascimento}
          onChangeText={setDataNascimento}
          mask={Masks.DATE_DDMMYYYY}
          keyboardType="numeric"
          placeholderTextColor="#8c9bb3"
        />

        <TextInput
          style={styles.input}
          placeholder="Nome do responsável"
          value={responsavel}
          onChangeText={setResponsavel}
          placeholderTextColor="#8c9bb3"
        />

        <TextInput
          style={styles.input}
          placeholder="Telefone do responsável"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
          placeholderTextColor="#8c9bb3"
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Diagnóstico (opcional)"
          value={diagnostico}
          onChangeText={setDiagnostico}
          multiline
          placeholderTextColor="#8c9bb3"
        />

        <TouchableOpacity style={styles.button} onPress={handleSalvarAluno} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Salvar Aluno</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 40,
    backgroundColor: '#e1eaf7',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#064a92',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#a1b0d8',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#364a72',
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#064a92',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 10,
    alignItems: 'center',
    shadowColor: '#0b3a6e',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
