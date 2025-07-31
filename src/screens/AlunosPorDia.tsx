import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { RouteProp, useNavigation, useRoute, NavigationProp } from '@react-navigation/native';
import { supabase } from '../supabaseClient';
import { format } from 'date-fns';

type RootStackParamList = {
  AlunosDia: { dia: string };
  AtividadesAluno: { alunoId: string; alunoNome: string; dia: string };
};

type AlunosPorDiaRouteProp = RouteProp<RootStackParamList, 'AlunosDia'>;

interface Aluno {
  id: string;
  nome: string;
}

function parseDateLocal(dateString: string) {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export default function AlunosPorDia() {
  const route = useRoute<AlunosPorDiaRouteProp>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { dia } = route.params;
  const dataLocal = parseDateLocal(dia);

  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarAlunos();
  }, []);

  async function carregarAlunos() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cronogramas')
        .select('aluno_id, alunos (id, nome)')
        .eq('data', dia);

      if (error) {
        Alert.alert('Erro', 'Não foi possível carregar os alunos.');
        setLoading(false);
        return;
      }

      const alunosUnicosMap = new Map<string, Aluno>();

      data?.forEach((item: any) => {
        if (item.alunos) {
          alunosUnicosMap.set(item.alunos.id, { id: item.alunos.id, nome: item.alunos.nome });
        }
      });

      setAlunos(Array.from(alunosUnicosMap.values()));
    } catch (err) {
      Alert.alert('Erro', 'Falha ao carregar alunos.');
      console.log(err);
    }
    setLoading(false);
  }

  function abrirCronogramaAluno(alunoId: string, alunoNome: string) {
    navigation.navigate('AtividadesAluno', {
      alunoId,
      alunoNome,
      dia,
    });
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#064a92" />
      </View>
    );
  }

  if (alunos.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.empty}>Nenhum aluno com atividades neste dia.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alunos com atividades em {format(dataLocal, 'dd/MM/yyyy')}</Text>

      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            activeOpacity={0.7}
            onPress={() => abrirCronogramaAluno(item.id, item.nome)}
          >
            <Text style={styles.itemText}>{item.nome}</Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f8ff',
    padding: 24,
    paddingTop: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#064a92',
    textAlign: 'center',
    marginBottom: 30,
  },
  item: {
    backgroundColor: '#c9daef',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  itemText: {
    fontSize: 18,
    color: '#064a92',
    fontWeight: '600',
  },
  empty: {
    color: '#888',
    fontSize: 17,
    textAlign: 'center',
    marginTop: 30,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
