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

interface CadastroCronogramaParams {
  alunoId: string;
}

export default function CadastrarCronogramaMultiploScreen({ route, navigation }: any) {
  const { alunoId } = route.params as CadastroCronogramaParams;

  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [atividade1, setAtividade1] = useState<string | null>(null);
  const [atividade2, setAtividade2] = useState<string | null>(null);
  const [atividade3, setAtividade3] = useState<string | null>(null);
  const [datasSelecionadas, setDatasSelecionadas] = useState<{ [key: string]: any }>({});
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    carregarAtividades();
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

  const toggleData = (date: string) => {
    setDatasSelecionadas((prev) => {
      const nova = { ...prev };
      if (nova[date]) {
        delete nova[date];
      } else {
        nova[date] = { selected: true, selectedColor: "#064a92" };
      }
      return nova;
    });
  };

  async function salvarCronogramas() {
    if (!atividade1 || !atividade2 || !atividade3) {
      Alert.alert("Erro", "Selecione as três atividades.");
      return;
    }

    const datas = Object.keys(datasSelecionadas);
    if (datas.length === 0) {
      Alert.alert("Erro", "Selecione ao menos uma data.");
      return;
    }

    setSalvando(true);

    try {
      for (const data of datas) {
        const { error } = await supabase.from("cronogramas").insert({
          aluno_id: alunoId,
          data,
          atividade1_id: atividade1,
          atividade2_id: atividade2,
          atividade3_id: atividade3,
        });
        if (error) throw error;
      }
      Alert.alert("Sucesso", "Cronogramas cadastrados com sucesso.");
      setDatasSelecionadas({});
      setAtividade1(null);
      setAtividade2(null);
      setAtividade3(null);
      navigation.goBack();
    } catch (error: any) {
      Alert.alert("Erro ao salvar cronogramas", error.message);
    } finally {
      setSalvando(false);
    }
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
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.label}>Selecione as datas</Text>
            <Calendar
              onDayPress={(day) => toggleData(day.dateString)}
              markedDates={datasSelecionadas}
              style={styles.calendar}
              theme={{
                selectedDayBackgroundColor: "#064a92",
                selectedDayTextColor: "#ffffff",
                todayTextColor: "#064a92",
                arrowColor: "#064a92",
                monthTextColor: "#064a92",
                textDayFontWeight: "600",
                textMonthFontWeight: "700",
                textDayHeaderFontWeight: "600",
              }}
              markingType={"multi-dot"}
            />
          </View>

          {[1, 2, 3].map((slot) => (
            <View key={slot} style={styles.section}>
              <Text style={styles.subLabel}>Atividade {slot}</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  dropdownIconColor="#064a92"
                  selectedValue={
                    slot === 1 ? atividade1 : slot === 2 ? atividade2 : atividade3
                  }
                  onValueChange={(itemValue) => {
                    if (slot === 1) setAtividade1(itemValue);
                    if (slot === 2) setAtividade2(itemValue);
                    if (slot === 3) setAtividade3(itemValue);
                  }}
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
            style={[styles.botao, salvando && { backgroundColor: "#999" }]}
            onPress={salvarCronogramas}
            disabled={salvando}
            activeOpacity={0.8}
          >
            <Text style={styles.botaoTexto}>
              {salvando ? "Salvando..." : "Salvar Cronogramas"}
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
    backgroundColor: "#e1eaf7",
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 26,
  },
  label: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 12,
    color: "#064a92",
  },
  subLabel: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 6,
    color: "#064a92",
  },
  calendar: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#a5badf",
    backgroundColor: "#f0f4fb",
    elevation: 3,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#a5badf",
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 2,
  },
  picker: {
    color: "#064a92",
  },
  botao: {
    backgroundColor: "#064a92",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#064a92",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  botaoTexto: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },
});
