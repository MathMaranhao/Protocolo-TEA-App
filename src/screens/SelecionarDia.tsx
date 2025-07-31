import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { supabase } from '../supabaseClient';
import { format, isSameDay } from 'date-fns';
import { MaterialIcons } from '@expo/vector-icons';

import { RootStackParamList } from '../types/types'; // ajuste caminho conforme seu projeto

function parseDateLocal(dateString: string) {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export default function SelecionarDia() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [datas, setDatas] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    buscarDatas();
  }, []);

  async function buscarDatas() {
    setLoading(true);

    const { data, error } = await supabase
      .from('cronogramas')
      .select('data')
      .order('data', { ascending: false });

    if (error) {
      console.error('Erro ao buscar datas:', error);
      setLoading(false);
      return;
    }

    const unicas = Array.from(new Set(data.map((item: any) => item.data))).map(
      (dataStr: string) => parseDateLocal(dataStr)
    );

    setDatas(unicas);
    setLoading(false);
  }

  function filtrarDatas(): Date[] {
    return datas
      .filter((data) => {
        if (!filtro) return true;
        const texto = format(data, 'dd/MM/yyyy');
        return texto.includes(filtro);
      })
      .sort((a, b) => {
        const hoje = new Date();
        const isHojeA = isSameDay(a, hoje);
        const isHojeB = isSameDay(b, hoje);
        if (isHojeA) return -1;
        if (isHojeB) return 1;
        return b.getTime() - a.getTime();
      });
  }

  function abrirAlunosPorDia(data: Date) {
    const diaISO = format(data, 'yyyy-MM-dd');
    navigation.navigate('AlunosDia', { dia: diaISO });
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#064a92" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecionar Dia</Text>

      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#777" style={styles.searchIcon} />
        <TextInput
          placeholder="Buscar por data (ex: 28/07/2025)"
          value={filtro}
          onChangeText={setFiltro}
          style={styles.input}
          placeholderTextColor="#999"
          keyboardType="numeric"
          clearButtonMode="while-editing"
        />
      </View>

      <FlatList
        data={filtrarDatas()}
        keyExtractor={(item) => item.toISOString()}
        renderItem={({ item }) => {
          const formatted = format(item, 'dd/MM/yyyy');
          return (
            <TouchableOpacity
              style={styles.item}
              activeOpacity={0.7}
              onPress={() => abrirAlunosPorDia(item)}
            >
              <Text style={styles.itemText}>{formatted}</Text>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma data encontrada</Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f8ff',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#064a92',
    textAlign: 'center',
    marginBottom: 25,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3eaf7',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: '#333',
  },
  item: {
    backgroundColor: '#c9daef',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  itemText: {
    fontSize: 18,
    color: '#064a92',
    fontWeight: '600',
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 40,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
