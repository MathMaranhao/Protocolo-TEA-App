import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../supabaseClient';

interface RegistroAtividadesParams {
  alunoId: string;
  alunoNome: string;
  dia: string;
  atividadeId: string;
  atividadeNome: string;
}

interface IntercorrenciaSelecionada {
  nome: string;
  frequencia: number | null;
  intensidade: number | null;
}

const tentativasPossiveis = [0, 2, 4, 8, 10];
const listaIntercorrencias = [
  'Fuga/Esquiva',
  'Birra/Choro',
  'Destruição',
  'Autolesão',
  'Agressividade',
];

export default function RegistroAtividades() {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    alunoId,
    alunoNome,
    dia,
    atividadeId,
    atividadeNome,
  } = route.params as RegistroAtividadesParams;

  const [tentativas, setTentativas] = useState<(number | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [intercorrenciasSelecionadas, setIntercorrenciasSelecionadas] = useState<
    IntercorrenciaSelecionada[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    setLoading(true);
    try {
      // Buscar o cronograma para pegar o cronograma_id e numero da atividade
      const { data: cronograma, error: erroCronograma } = await supabase
        .from('cronogramas')
        .select('id, atividade1_id, atividade2_id, atividade3_id')
        .eq('aluno_id', alunoId)
        .eq('data', dia)
        .limit(1)
        .single();

      if (erroCronograma || !cronograma) {
        Alert.alert('Erro', 'Cronograma não encontrado.');
        setLoading(false);
        return;
      }

      const cronogramaId = cronograma.id;

      let atividadeNumero = 0;
      if (cronograma.atividade1_id === atividadeId) atividadeNumero = 1;
      else if (cronograma.atividade2_id === atividadeId) atividadeNumero = 2;
      else if (cronograma.atividade3_id === atividadeId) atividadeNumero = 3;

      if (atividadeNumero === 0) {
        Alert.alert('Erro', 'Atividade não encontrada no cronograma.');
        setLoading(false);
        return;
      }

      // Buscar tentativas salvas
      const { data: tentativasDB, error: erroTentativas } = await supabase
        .from('tentativas')
        .select('tentativa_numero, pontuacao')
        .eq('cronograma_id', cronogramaId)
        .eq('atividade_numero', atividadeNumero);

      if (erroTentativas) {
        console.error('Erro ao buscar tentativas:', erroTentativas);
      } else if (tentativasDB && tentativasDB.length > 0) {
        // Mapear para o estado: índice tentativas é tentativa_numero - 1
        const tentativasEstado = [null, null, null, null, null];
        tentativasDB.forEach(({ tentativa_numero, pontuacao }) => {
          if (
            tentativa_numero >= 1 &&
            tentativa_numero <= 5 &&
            pontuacao !== null
          ) {
            tentativasEstado[tentativa_numero - 1] = pontuacao;
          }
        });
        setTentativas(tentativasEstado);
      }

      // Buscar intercorrências salvas
      const { data: intercorrenciasDB, error: erroIntercorrencias } =
        await supabase
          .from('intercorrencias')
          .select('tipo, frequencia, intensidade')
          .eq('cronograma_id', cronogramaId)
          .eq('atividade_numero', atividadeNumero);

      if (erroIntercorrencias) {
        console.error('Erro ao buscar intercorrências:', erroIntercorrencias);
      } else if (intercorrenciasDB && intercorrenciasDB.length > 0) {
        const intercorrenciasEstado: IntercorrenciaSelecionada[] = intercorrenciasDB.map(
          (item) => ({
            nome: item.tipo || '',
            frequencia: item.frequencia,
            intensidade: item.intensidade,
          })
        );
        setIntercorrenciasSelecionadas(intercorrenciasEstado);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      Alert.alert('Erro', 'Erro ao carregar dados do registro.');
    }
    setLoading(false);
  }

  function toggleIntercorrencia(nome: string) {
    const existe = intercorrenciasSelecionadas.find((i) => i.nome === nome);
    if (existe) {
      setIntercorrenciasSelecionadas((prev) =>
        prev.filter((i) => i.nome !== nome)
      );
    } else {
      setIntercorrenciasSelecionadas((prev) => [
        ...prev,
        { nome, frequencia: null, intensidade: null },
      ]);
    }
  }

  function setFrequencia(nome: string, valor: number) {
    setIntercorrenciasSelecionadas((prev) =>
      prev.map((i) =>
        i.nome === nome
          ? {
              ...i,
              frequencia: valor,
            }
          : i
      )
    );
  }

  function setIntensidade(nome: string, valor: number) {
    setIntercorrenciasSelecionadas((prev) =>
      prev.map((i) =>
        i.nome === nome
          ? {
              ...i,
              intensidade: valor,
            }
          : i
      )
    );
  }

  async function salvarRegistro() {
    if (tentativas.some((t) => t === null)) {
      Alert.alert('Erro', 'Por favor, registre todas as 5 tentativas.');
      return;
    }

    for (const i of intercorrenciasSelecionadas) {
      if (i.frequencia === null || i.intensidade === null) {
        Alert.alert(
          'Erro',
          `Informe frequência e intensidade para a intercorrência: ${i.nome}`
        );
        return;
      }
    }

    try {
      // Repetir lógica de busca cronograma para garantir dados consistentes no save
      const { data: cronograma, error: erroCronograma } = await supabase
        .from('cronogramas')
        .select('id, atividade1_id, atividade2_id, atividade3_id')
        .eq('aluno_id', alunoId)
        .eq('data', dia)
        .limit(1)
        .single();

      if (erroCronograma || !cronograma) {
        Alert.alert('Erro', 'Cronograma não encontrado para salvar registros.');
        return;
      }

      const cronogramaId = cronograma.id;

      let atividadeNumero = 0;
      if (cronograma.atividade1_id === atividadeId) atividadeNumero = 1;
      else if (cronograma.atividade2_id === atividadeId) atividadeNumero = 2;
      else if (cronograma.atividade3_id === atividadeId) atividadeNumero = 3;

      if (atividadeNumero === 0) {
        Alert.alert('Erro', 'Atividade não encontrada no cronograma.');
        return;
      }

      // Deletar tentativas antigas
      await supabase
        .from('tentativas')
        .delete()
        .eq('cronograma_id', cronogramaId)
        .eq('atividade_numero', atividadeNumero);

      // Inserir tentativas novas
      const tentativasInsert = tentativas.map((pontuacao, index) => ({
        cronograma_id: cronogramaId,
        atividade_numero: atividadeNumero,
        tentativa_numero: index + 1,
        pontuacao: pontuacao!,
      }));

      const { error: erroTentativas } = await supabase
        .from('tentativas')
        .insert(tentativasInsert);

      if (erroTentativas) {
        Alert.alert('Erro', 'Falha ao salvar tentativas.');
        console.error(erroTentativas);
        return;
      }

      // Deletar intercorrencias antigas
      await supabase
        .from('intercorrencias')
        .delete()
        .eq('cronograma_id', cronogramaId)
        .eq('atividade_numero', atividadeNumero);

      // Inserir intercorrências novas
      const intercorrenciasInsert = intercorrenciasSelecionadas.map((i) => ({
        cronograma_id: cronogramaId,
        atividade_numero: atividadeNumero,
        tipo: i.nome,
        frequencia: i.frequencia!,
        intensidade: i.intensidade!,
      }));

      const { error: erroIntercorrencias } = await supabase
        .from('intercorrencias')
        .insert(intercorrenciasInsert);

      if (erroIntercorrencias) {
        Alert.alert('Erro', 'Falha ao salvar intercorrências.');
        console.error(erroIntercorrencias);
        return;
      }

      Alert.alert('Sucesso', 'Registro salvo com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Erro inesperado ao salvar registro.');
      console.error(error);
    }
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#064a92" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Registrar Atividades</Text>
        <Text style={styles.subtitle}>
          {alunoNome} - {atividadeNome}
        </Text>
        <Text style={styles.subtitle}>{dia}</Text>

        <Text style={styles.sectionTitle}>5 Tentativas</Text>
        {tentativas.map((valor, index) => (
          <View key={index} style={styles.tentativaRow}>
            <Text style={styles.tentativaLabel}>Tentativa {index + 1}</Text>
            <View style={styles.pontuacoesRow}>
              {tentativasPossiveis.map((pontuacao) => (
                <TouchableOpacity
                  key={pontuacao}
                  style={[
                    styles.pontuacaoButton,
                    valor === pontuacao && styles.pontuacaoButtonSelected,
                  ]}
                  onPress={() => {
                    const novasTentativas = [...tentativas];
                    novasTentativas[index] = pontuacao;
                    setTentativas(novasTentativas);
                  }}
                >
                  <Text
                    style={[
                      styles.pontuacaoText,
                      valor === pontuacao && styles.pontuacaoTextSelected,
                    ]}
                  >
                    {pontuacao}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Intercorrências</Text>
        {listaIntercorrencias.map((nome) => {
          const selecionada = intercorrenciasSelecionadas.find(
            (i) => i.nome === nome
          );
          return (
            <View key={nome} style={styles.intercorrenciaContainer}>
              <TouchableOpacity
                style={[
                  styles.intercorrenciaButton,
                  selecionada && styles.intercorrenciaButtonSelected,
                ]}
                onPress={() => toggleIntercorrencia(nome)}
              >
                <Text
                  style={[
                    styles.intercorrenciaText,
                    selecionada && styles.intercorrenciaTextSelected,
                  ]}
                >
                  {nome}
                </Text>
              </TouchableOpacity>

              {selecionada && (
                <View style={styles.frequenciaIntensidadeRow}>
                  <View style={styles.pontuacoesColumn}>
                    <Text style={styles.subLabel}>Frequência</Text>
                    <View style={styles.pontuacoesRow}>
                      {[1, 2, 3, 4].map((n) => (
                        <TouchableOpacity
                          key={`freq-${nome}-${n}`}
                          style={[
                            styles.pontuacaoButton,
                            selecionada.frequencia === n &&
                              styles.pontuacaoButtonSelected,
                          ]}
                          onPress={() => setFrequencia(nome, n)}
                        >
                          <Text
                            style={[
                              styles.pontuacaoText,
                              selecionada.frequencia === n &&
                                styles.pontuacaoTextSelected,
                            ]}
                          >
                            {n}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  <View style={styles.pontuacoesColumn}>
                    <Text style={styles.subLabel}>Intensidade</Text>
                    <View style={styles.pontuacoesRow}>
                      {[1, 2, 3, 4].map((n) => (
                        <TouchableOpacity
                          key={`intens-${nome}-${n}`}
                          style={[
                            styles.pontuacaoButton,
                            selecionada.intensidade === n &&
                              styles.pontuacaoButtonSelected,
                          ]}
                          onPress={() => setIntensidade(nome, n)}
                        >
                          <Text
                            style={[
                              styles.pontuacaoText,
                              selecionada.intensidade === n &&
                                styles.pontuacaoTextSelected,
                            ]}
                          >
                            {n}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </View>
              )}
            </View>
          );
        })}

        <TouchableOpacity style={styles.saveButton} onPress={salvarRegistro}>
          <Text style={styles.saveButtonText}>Salvar Registro</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e1eaf7',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#064a92',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#064a92',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#064a92',
    marginVertical: 10,
  },
  tentativaRow: {
    marginBottom: 14,
  },
  tentativaLabel: {
    fontSize: 16,
    marginBottom: 6,
    color: '#064a92',
  },
  pontuacoesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pontuacaoButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#c9daef',
    borderRadius: 6,
    marginHorizontal: 4,
  },
  pontuacaoButtonSelected: {
    backgroundColor: '#064a92',
  },
  pontuacaoText: {
    color: '#064a92',
    fontWeight: '600',
  },
  pontuacaoTextSelected: {
    color: '#fff',
  },
  intercorrenciaContainer: {
    marginBottom: 14,
  },
  intercorrenciaButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#c9daef',
    borderRadius: 8,
  },
  intercorrenciaButtonSelected: {
    backgroundColor: '#064a92',
  },
  intercorrenciaText: {
    color: '#064a92',
    fontWeight: '600',
    textAlign: 'center',
  },
  intercorrenciaTextSelected: {
    color: '#fff',
  },
  frequenciaIntensidadeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  pontuacoesColumn: {
    flex: 1,
    marginHorizontal: 4,
  },
  subLabel: {
    fontWeight: '600',
    color: '#064a92',
    marginBottom: 4,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#064a92',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
