import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { supabase } from '../supabaseClient';
import { Ionicons } from '@expo/vector-icons';

interface Cronograma {
  id: string;
  data: string;
}

export default function ListaCronogramasScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { alunoId, alunoNome } = route.params;

  const [cronogramas, setCronogramas] = useState<Cronograma[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregarCronogramas() {
    setLoading(true);
    const { data, error } = await supabase
      .from('cronogramas')
      .select('id, data')
      .eq('aluno_id', alunoId)
      .order('data', { ascending: true });

    if (!error && data) {
      setCronogramas(data);
    }
    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      carregarCronogramas();
    }, [alunoId])
  );

  function formatarData(dataString: string) {
    if (!dataString) return '';
    const partes = dataString.split('-');
    if (partes.length !== 3) return dataString;
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }

  function irParaEditarCronograma(cronogramaId: string, data: string) {
    navigation.navigate('Cronograma', {
      alunoId,
      cronogramaId,
      data,
    });
  }

  function irParaNovoCronograma() {
    navigation.navigate('CadastrarCronogramaMultiplo', {
      alunoId,
    });
  }

  async function excluirCronograma(id: string) {
    Alert.alert(
      'Confirmar exclusão',
      'Deseja realmente excluir este cronograma?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const { error } = await supabase.from('cronogramas').delete().eq('id', id);
            if (error) {
              Alert.alert('Erro', 'Não foi possível excluir o cronograma.');
              console.log('Erro excluir cronograma:', error);
            } else {
              carregarCronogramas();
              Alert.alert('Sucesso', 'Cronograma excluído.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  }

  function renderItem({ item }: { item: Cronograma }) {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => irParaEditarCronograma(item.id, item.data)}
          activeOpacity={0.75}
        >
          <Text style={styles.itemTexto}>Dia: {formatarData(item.data)}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => excluirCronograma(item.id)} style={styles.botaoExcluir} activeOpacity={0.7}>
          <Ionicons name="trash-outline" size={26} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cronogramas de {alunoNome}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#064a92" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={cronogramas}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.vazio}>Nenhum cronograma cadastrado.</Text>}
          contentContainerStyle={cronogramas.length === 0 && { flexGrow: 1, justifyContent: 'center' }}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity style={styles.botao} onPress={irParaNovoCronograma} activeOpacity={0.85}>
        <Ionicons name="add-circle" size={24} color="#FFF" />
        <Text style={styles.botaoTexto}>Adicionar Novo Dia</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 30,
    backgroundColor: '#f5f9ff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#064a92',
    marginBottom: 18,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#064a92',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  item: {
    flex: 1,
  },
  itemTexto: {
    fontSize: 17,
    color: '#064a92',
    fontWeight: '600',
  },
  botaoExcluir: {
    marginLeft: 14,
    padding: 6,
  },
  vazio: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
  botao: {
    backgroundColor: '#064a92',
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 26,
    shadowColor: '#064a92',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 8,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
  },
});
