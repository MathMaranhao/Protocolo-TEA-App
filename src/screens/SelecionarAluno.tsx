import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../supabaseClient'; // ajuste o caminho se necessário

interface Aluno {
  id: string;
  nome: string;
}

export default function SelecionarAlunoScreen() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  useEffect(() => {
    carregarAlunos();
  }, []);

  async function carregarAlunos() {
    setLoading(true);
    const { data, error } = await supabase.from('alunos').select('id, nome');
    if (!error && data) {
      setAlunos(data);
    }
    setLoading(false);
  }

  const alunosFiltrados = alunos.filter(aluno =>
    aluno.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  const navegarParaCronogramas = (aluno: Aluno) => {
    navigation.navigate('ListaCronogramas', { alunoId: aluno.id, alunoNome: aluno.nome });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Selecione um aluno</Text>

      <TextInput
        placeholder="Buscar aluno..."
        value={filtro}
        onChangeText={setFiltro}
        style={styles.input}
        placeholderTextColor="#9BB1D4"
        autoCapitalize="words"
        autoCorrect={false}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#064a92" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={alunosFiltrados}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.aluno}
              onPress={() => navegarParaCronogramas(item)}
              activeOpacity={0.7}
            >
              <Text style={styles.alunoTexto}>{item.nome}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.vazio}>Nenhum aluno encontrado.</Text>
          }
          contentContainerStyle={alunosFiltrados.length === 0 && { flexGrow: 1, justifyContent: 'center' }}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1eaf7',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 30,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#064a92',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    fontSize: 16,
    color: '#064a92',
    marginBottom: 24,
    shadowColor: '#064a92',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  aluno: {
    backgroundColor: '#c9daef',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: '#064a92',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  alunoTexto: {
    fontSize: 18,
    fontWeight: '600',
    color: '#064a92',
  },
  vazio: {
    textAlign: 'center',
    fontSize: 16,
    color: '#7a8ba6',
    fontStyle: 'italic',
    marginTop: 40,
  },
});
