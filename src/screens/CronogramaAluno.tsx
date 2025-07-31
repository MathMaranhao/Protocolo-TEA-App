import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRoute, useNavigation, RouteProp, NavigationProp } from '@react-navigation/native';
import { supabase } from '../supabaseClient';
import { format } from 'date-fns';

// Tipagem do stack para navegação
type RootStackParamList = {
  CronogramaAluno: { alunoId: string; alunoNome: string; dia: string };
  RegistroAtividades: {
    alunoId: string;
    alunoNome: string;
    dia: string;
    atividadeId: string;
    atividadeNome: string;
  };
};

type CronogramaAlunoRouteProp = RouteProp<RootStackParamList, 'CronogramaAluno'>;

interface Atividade {
  id: string;
  nome: string;
}

export default function CronogramaAluno() {
  const route = useRoute<CronogramaAlunoRouteProp>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { alunoId, alunoNome, dia } = route.params;

  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarAtividades();
  }, []);

  async function carregarAtividades() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cronogramas')
        .select(
          `
          atividade1_id, 
          atividade2_id, 
          atividade3_id, 
          atividades1:atividade1_id (id, nome), 
          atividades2:atividade2_id (id, nome), 
          atividades3:atividade3_id (id, nome)
          `
        )
        .eq('aluno_id', alunoId)
        .eq('data', dia)
        .single();

      if (error) {
        Alert.alert('Erro', 'Não foi possível carregar as atividades.');
        console.log(error);
        setLoading(false);
        return;
      }

      if (!data) {
        Alert.alert('Aviso', 'Nenhum cronograma encontrado para este aluno nesta data.');
        setLoading(false);
        return;
      }

      const listaAtividades: Atividade[] = [];

      function addAtividades(atv: Atividade | Atividade[] | undefined) {
        if (!atv) return;
        if (Array.isArray(atv)) {
          listaAtividades.push(...atv);
        } else {
          listaAtividades.push(atv);
        }
      }

      addAtividades(data.atividades1);
      addAtividades(data.atividades2);
      addAtividades(data.atividades3);

      setAtividades(listaAtividades);
    } catch (err) {
      Alert.alert('Erro', 'Falha ao carregar atividades.');
      console.log(err);
    }
    setLoading(false);
  }

  function abrirRegistroAtividades(atividade: Atividade) {
    navigation.navigate('RegistroAtividades', {
      alunoId,
      alunoNome,
      dia,
      atividadeId: atividade.id,
      atividadeNome: atividade.nome,
    });
  }

  // Corrigir timezone, convertendo string "YYYY-MM-DD" para Date local
  function parseDateLocal(dateString: string) {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
  const dataLocal = parseDateLocal(dia);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#064a92" />
      </View>
    );
  }

  if (atividades.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.empty}>Nenhuma atividade cadastrada para este aluno nesta data.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Atividades de {alunoNome} em {format(dataLocal, 'dd/MM/yyyy')}
      </Text>

      <FlatList
        data={atividades}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => abrirRegistroAtividades(item)}
            activeOpacity={0.7}
          >
            <Text style={styles.itemText}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1eaf7',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#064a92',
    marginBottom: 24,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#c9daef',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 14,
    // sombra para iOS
    shadowColor: '#064a92',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    // sombra para Android
    elevation: 4,
  },
  itemText: {
    fontSize: 17,
    color: '#064a92',
    fontWeight: '600',
  },
  empty: {
    fontSize: 17,
    color: '#7a7a7a',
    textAlign: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e1eaf7',
    paddingHorizontal: 20,
  },
});
