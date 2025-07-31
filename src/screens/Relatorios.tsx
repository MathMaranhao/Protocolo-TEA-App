import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { supabase } from '../supabaseClient';
import { LineChart } from 'react-native-chart-kit';

interface Aluno {
  id: string;
  nome: string;
}

interface Atividade {
  id: string;
  nome: string;
  atividade_numero: number;
}

interface Registro {
  data: string; // 'YYYY-MM-DD'
  pontuacao: number;
  intercorrencias: number;
}

const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth - 32;
const chartHeight = 280;

export default function RelatorioAtividadeScreen() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [atividadesComRegistros, setAtividadesComRegistros] = useState<Atividade[]>([]);
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [buscaAluno, setBuscaAluno] = useState('');
  const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null);
  const [atividadeSelecionada, setAtividadeSelecionada] = useState<Atividade | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarAlunos();
  }, []);

  useEffect(() => {
    if (alunoSelecionado) {
      carregarAtividadesDoAluno(alunoSelecionado.id);
      setAtividadeSelecionada(null);
      setRegistros([]);
      setAtividadesComRegistros([]);
    } else {
      setAtividades([]);
      setAtividadeSelecionada(null);
      setRegistros([]);
      setAtividadesComRegistros([]);
    }
  }, [alunoSelecionado]);

  useEffect(() => {
    if (alunoSelecionado && atividadeSelecionada) {
      carregarRegistros(alunoSelecionado.id, atividadeSelecionada);
    } else {
      setRegistros([]);
    }
  }, [atividadeSelecionada]);

  async function carregarAlunos() {
    const { data, error } = await supabase.from('alunos').select('id, nome');
    if (error) {
      console.error('Erro ao carregar alunos:', error);
      return;
    }
    setAlunos(data || []);
  }

  async function carregarAtividadesDoAluno(alunoId: string) {
    const { data: cronogramas, error: errorCrono } = await supabase
      .from('cronogramas')
      .select('atividade1_id, atividade2_id, atividade3_id')
      .eq('aluno_id', alunoId);

    if (errorCrono || !cronogramas) {
      console.error('Erro ao carregar cronogramas:', errorCrono);
      setAtividades([]);
      return;
    }

    const atividadeIdsSet = new Set<string>();
    cronogramas.forEach((c) => {
      if (c.atividade1_id) atividadeIdsSet.add(c.atividade1_id);
      if (c.atividade2_id) atividadeIdsSet.add(c.atividade2_id);
      if (c.atividade3_id) atividadeIdsSet.add(c.atividade3_id);
    });

    const atividadeIds = Array.from(atividadeIdsSet);

    if (atividadeIds.length === 0) {
      setAtividades([]);
      return;
    }

    const { data: atividadesData, error: errorAtividades } = await supabase
      .from('atividades')
      .select('id, nome')
      .in('id', atividadeIds);

    if (errorAtividades || !atividadesData) {
      console.error('Erro ao carregar atividades:', errorAtividades);
      setAtividades([]);
      return;
    }

    const atividadesComNumero: Atividade[] = [];

    atividadeIds.forEach((id) => {
      const crono = cronogramas.find(
        (c) =>
          c.atividade1_id === id ||
          c.atividade2_id === id ||
          c.atividade3_id === id
      );
      if (!crono) return;

      let numero = 0;
      if (crono.atividade1_id === id) numero = 1;
      else if (crono.atividade2_id === id) numero = 2;
      else if (crono.atividade3_id === id) numero = 3;

      const atividadeInfo = atividadesData.find((a) => a.id === id);
      if (!atividadeInfo) return;

      atividadesComNumero.push({
        id,
        nome: atividadeInfo.nome,
        atividade_numero: numero,
      });
    });

    setAtividades(atividadesComNumero);

    await filtrarAtividadesComRegistros(alunoId, atividadesComNumero);
  }

  async function filtrarAtividadesComRegistros(alunoId: string, atividadesLista: Atividade[]) {
    const { data: cronogramas, error: errorCrono } = await supabase
      .from('cronogramas')
      .select('id')
      .eq('aluno_id', alunoId);

    if (errorCrono || !cronogramas) {
      setAtividadesComRegistros([]);
      return;
    }

    const cronogramaIds = cronogramas.map((c) => c.id);

    const { data: tentativasData, error: errTent } = await supabase
      .from('tentativas')
      .select('cronograma_id, atividade_numero')
      .in('cronograma_id', cronogramaIds);

    if (errTent || !tentativasData) {
      setAtividadesComRegistros([]);
      return;
    }

    const atividadeIdsComRegistros = new Set<string>();

    atividadesLista.forEach((atividade) => {
      const temRegistro = tentativasData.some(
        (t) => t.atividade_numero === atividade.atividade_numero
      );
      if (temRegistro) atividadeIdsComRegistros.add(atividade.id);
    });

    const filtered = atividadesLista.filter((a) =>
      atividadeIdsComRegistros.has(a.id)
    );

    setAtividadesComRegistros(filtered);

    if (
      atividadeSelecionada &&
      !atividadeIdsComRegistros.has(atividadeSelecionada.id)
    ) {
      setAtividadeSelecionada(null);
      setRegistros([]);
    }
  }

  async function carregarRegistros(alunoId: string, atividade: Atividade) {
    setLoading(true);
    const { data: cronogramas, error: errorCrono } = await supabase
      .from('cronogramas')
      .select('id, data')
      .eq('aluno_id', alunoId)
      .order('data', { ascending: true });

    if (errorCrono || !cronogramas) {
      console.error('Erro ao carregar cronogramas:', errorCrono);
      setRegistros([]);
      setLoading(false);
      return;
    }

    const registrosData: Registro[] = [];

    for (const crono of cronogramas) {
      const { data: tentativas, error: errTent } = await supabase
        .from('tentativas')
        .select('pontuacao')
        .eq('cronograma_id', crono.id)
        .eq('atividade_numero', atividade.atividade_numero);

      if (errTent) {
        console.error('Erro ao carregar tentativas:', errTent);
        continue;
      }

      const { data: intercorrencias, error: errInter } = await supabase
        .from('intercorrencias')
        .select('frequencia, intensidade')
        .eq('cronograma_id', crono.id)
        .eq('atividade_numero', atividade.atividade_numero);

      if (errInter) {
        console.error('Erro ao carregar intercorrencias:', errInter);
      }

      const pontuacaoTotal = (tentativas || []).reduce((acc, t) => acc + (t.pontuacao || 0), 0);
      const pontuacaoFinal = pontuacaoTotal > 50 ? 50 : pontuacaoTotal;

      const totalIntercorrencias = (intercorrencias || []).reduce(
        (acc, i) => acc + (i.frequencia || 0) + (i.intensidade || 0),
        0
      );

      registrosData.push({
        data: crono.data,
        pontuacao: pontuacaoFinal,
        intercorrencias: totalIntercorrencias,
      });
    }

    setRegistros(registrosData);
    setLoading(false);
  }

  // Dados para gráfico
  const labels = registros.map((r) => {
    const [y, m, d] = r.data.split('-');
    return `${d}/${m}`;
  });

  const pontuacoes = registros.map((r) => r.pontuacao);
  const intercorrencias = registros.map((r) => r.intercorrencias);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Relatório de Atividade</Text>

      <TextInput
        placeholder="Buscar aluno"
        value={buscaAluno}
        onChangeText={setBuscaAluno}
        style={styles.input}
      />

      <FlatList
        data={alunos.filter((a) =>
          a.nome.toLowerCase().includes(buscaAluno.toLowerCase())
        )}
        keyExtractor={(item) => item.id}
        style={{ maxHeight: 150 }}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.item,
              alunoSelecionado?.id === item.id && styles.itemSelecionado,
            ]}
            onPress={() => setAlunoSelecionado(item)}
          >
            <Text style={alunoSelecionado?.id === item.id ? { color: 'white' } : {}}>
              {item.nome}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>Nenhum aluno encontrado.</Text>}
      />

      {alunoSelecionado && (
        <>
          <Text style={{ marginTop: 20, fontWeight: 'bold' }}>
            Atividades do aluno (com registros):
          </Text>

          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 8,
              marginTop: 8,
              borderWidth: 1,
              borderColor: '#ccc',
            }}
          >
            <Picker
              selectedValue={atividadeSelecionada?.id}
              onValueChange={(itemValue) => {
                const atividade = atividadesComRegistros.find((a) => a.id === itemValue) || null;
                setAtividadeSelecionada(atividade);
              }}
              mode="dropdown"
            >
              <Picker.Item label="Selecione uma atividade..." value={null} />
              {atividadesComRegistros.map((a) => (
                <Picker.Item key={a.id} label={a.nome} value={a.id} />
              ))}
            </Picker>
          </View>
        </>
      )}

      {loading && (
        <ActivityIndicator
          style={{ marginTop: 20 }}
          size="large"
          color="#064a92"
        />
      )}

      {registros.length > 0 && !loading && (
        <View style={{ marginTop: 30 }}>
          <Text style={{ textAlign: 'center', marginBottom: 10 }}>
            Pontuação máxima por dia: 50
          </Text>
          <LineChart
            data={{
              labels,
              datasets: [
                {
                  data: pontuacoes,
                  color: () => 'blue',
                  strokeWidth: 2,
                },
                {
                  data: intercorrencias,
                  color: () => 'red',
                  strokeWidth: 2,
                },
              ],
              legend: ['Pontuação', 'Intercorrências'],
            }}
            width={chartWidth}
            height={chartHeight}
            chartConfig={{
              backgroundColor: '#e1eaf7',
              backgroundGradientFrom: '#e1eaf7',
              backgroundGradientTo: '#f8faff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#ffffff',
              },
            }}
            bezier
            style={{
              borderRadius: 16,
            }}
          />
        </View>
      )}

      {!loading && alunoSelecionado && atividadeSelecionada && registros.length === 0 && (
        <Text style={{ marginTop: 30, textAlign: 'center', color: 'gray' }}>
          Nenhum registro encontrado para essa atividade.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f4fb',
    minHeight: '100%',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0b3d91',
    marginBottom: 24,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#a3bffa',
    shadowColor: '#5b7de9',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  item: {
    padding: 14,
    backgroundColor: '#dbe7fb',
    borderRadius: 12,
    marginVertical: 6,
    marginHorizontal: 2,
    shadowColor: '#4285f4',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  itemSelecionado: {
    backgroundColor: '#0b3d91',
  },
  itemText: {
    fontSize: 17,
    color: '#0b3d91',
    fontWeight: '600',
  },
  itemTextSelecionado: {
    color: '#fff',
  },
  emptyText: {
    fontStyle: 'italic',
    color: '#7a7a7a',
    paddingLeft: 12,
    marginTop: 8,
  },
  atividadesTitulo: {
    marginTop: 24,
    fontWeight: '700',
    fontSize: 18,
    color: '#0b3d91',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#a3bffa',
    overflow: 'hidden',
    shadowColor: '#5b7de9',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  loadingIndicator: {
    marginTop: 24,
  },
  chartWrapper: {
    marginTop: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 12,
    shadowColor: '#3052ce',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  chartTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1e40af',
  },
  noDataText: {
    marginTop: 40,
    textAlign: 'center',
    color: '#999999',
    fontStyle: 'italic',
    fontSize: 16,
  },
});

