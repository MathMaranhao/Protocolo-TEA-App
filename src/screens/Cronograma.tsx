import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { supabase } from "../supabaseClient";
import { Picker } from "@react-native-picker/picker";

interface Atividade {
  id: string;
  nome: string;
}

interface CronogramaParams {
  alunoId: string;
  cronogramaId: string | null;
  data: string | null;
}

export default function EditarCronogramaScreen({ route, navigation }: any) {
  const { alunoId, cronogramaId, data } = route.params as CronogramaParams;

  const [dataAula, setDataAula] = useState<string>(
    data ?? new Date().toISOString().slice(0, 10)
  );
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [atividade1, setAtividade1] = useState<string | null>(null);
  const [atividade2, setAtividade2] = useState<string | null>(null);
  const [atividade3, setAtividade3] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    carregarAtividades();
    if (cronogramaId) carregarCronograma();
  }, []);

  async function carregarAtividades() {
    const { data, error } = await supabase
      .from("atividades")
      .select("id, nome")
      .order("nome", { ascending: true });

    if (error) {
      Alert.alert("Erro ao carregar atividades", error.message);
    } else if (data) {
      setAtividades(data);
    }
  }

  async function carregarCronograma() {
    if (!cronogramaId) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("cronogramas")
      .select("data, atividade1_id, atividade2_id, atividade3_id")
      .eq("id", cronogramaId)
      .single();

    if (data) {
      setDataAula(data.data.slice(0, 10));
      setAtividade1(data.atividade1_id);
      setAtividade2(data.atividade2_id);
      setAtividade3(data.atividade3_id);
    }
    if (error) {
      Alert.alert("Erro ao buscar cronograma", error.message);
    }
    setLoading(false);
  }

  const marcarData = {
    [dataAula]: { selected: true, selectedColor: "#4B9CD3" },
  };

  function onDayPress(day: { dateString: string }) {
    setDataAula(day.dateString);
  }

  async function salvarCronograma() {
    if (!atividade1 || !atividade2 || !atividade3) {
      Alert.alert("Erro", "Selecione as três atividades.");
      return;
    }

    setSalvando(true);

    const payload = {
      aluno_id: alunoId,
      data: dataAula,
      atividade1_id: atividade1,
      atividade2_id: atividade2,
      atividade3_id: atividade3,
    };

    const res = cronogramaId
      ? await supabase.from("cronogramas").update(payload).eq("id", cronogramaId)
      : await supabase.from("cronogramas").insert(payload);

    if (res.error) {
      Alert.alert("Erro", "Erro ao salvar cronograma.");
      console.log("Erro salvar:", res.error);
    } else {
      Alert.alert("Sucesso", "Cronograma salvo com sucesso.");
      navigation.goBack();
    }
    setSalvando(false);
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.container, styles.centered]}>
          <Text style={styles.loadingText}>Carregando cronograma...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.section}>
            <Text style={styles.label}>Selecione a data da aula</Text>
            <Calendar
              current={dataAula}
              markedDates={marcarData}
              onDayPress={onDayPress}
              style={styles.calendar}
              theme={{
                backgroundColor: "#fff",
                calendarBackground: "#fff",
                textSectionTitleColor: "#064a92",
                selectedDayBackgroundColor: "#4B9CD3",
                selectedDayTextColor: "#fff",
                todayTextColor: "#4B9CD3",
                dayTextColor: "#333",
                textDisabledColor: "#ccc",
                arrowColor: "#4B9CD3",
                monthTextColor: "#064a92",
                indicatorColor: "#064a92",
                textDayFontWeight: "500",
                textMonthFontWeight: "bold",
                textDayHeaderFontWeight: "600",
              }}
            />
          </View>

          {[1, 2, 3].map((slot) => (
            <View key={slot} style={styles.section}>
              <Text style={styles.subLabel}>Atividade {slot}</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={
                    slot === 1 ? atividade1 : slot === 2 ? atividade2 : atividade3
                  }
                  onValueChange={(itemValue) => {
                    if (slot === 1) setAtividade1(itemValue);
                    if (slot === 2) setAtividade2(itemValue);
                    if (slot === 3) setAtividade3(itemValue);
                  }}
                  dropdownIconColor="#064a92"
                  style={styles.picker}
                >
                  <Picker.Item label="Selecione uma atividade" value={null} />
                  {atividades.map((a) => (
                    <Picker.Item key={a.id} label={a.nome} value={a.id} />
                  ))}
                </Picker>
              </View>
            </View>
          ))}

          <TouchableOpacity
            style={[styles.botao, salvando && styles.botaoDisabled]}
            onPress={salvarCronograma}
            disabled={salvando}
            activeOpacity={0.8}
          >
            <Text style={styles.botaoTexto}>
              {salvando ? "Salvando..." : "Salvar Cronograma"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f8ff",
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 25,
  },
  label: {
    fontWeight: "700",
    fontSize: 18,
    color: "#064a92",
    marginBottom: 12,
  },
  subLabel: {
    fontWeight: "600",
    fontSize: 16,
    color: "#064a92",
    marginBottom: 8,
  },
  calendar: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#a9c0df",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#a9c0df",
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  picker: {
    color: "#064a92",
    fontSize: 16,
  },
  botao: {
    backgroundColor: "#4B9CD3",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
    elevation: 4,
    shadowColor: "#4B9CD3",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
  },
  botaoDisabled: {
    backgroundColor: "#9bbbe2",
  },
  botaoTexto: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#064a92",
  },
});
