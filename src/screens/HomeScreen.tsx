import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from '../supabaseClient';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserEmail(user?.email ?? null);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Erro', 'Erro ao sair. Tente novamente.');
    } else {
      navigation.navigate('Login' as never);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {userEmail && (
        <View style={styles.userCard}>
          <MaterialCommunityIcons name="account-circle" size={36} color="#064a92" />
          <View style={styles.userInfo}>
            <Text style={styles.userLabel}>Usuário logado</Text>
            <Text style={styles.userEmail}>{userEmail}</Text>
          </View>
        </View>
      )}

      <Text style={styles.title}>Protocolo TEA</Text>

      <Text style={styles.subtitle}>O que você deseja fazer?</Text>

      <View style={styles.grid}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CadastrarAluno' as never)}>
          <FontAwesome5 name="user-plus" size={32} color="#064a92" />
          <Text style={styles.cardText}>Cadastrar Aluno</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('SelecionarAluno' as never)}>
          <MaterialIcons name="event" size={32} color="#064a92" />
          <Text style={styles.cardText}>Montar Cronograma</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('SelecionarDia' as never)}>
          <MaterialIcons name="assignment" size={32} color="#064a92" />
          <Text style={styles.cardText}>Registrar Atividades</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Relatorios' as never)}>
          <MaterialIcons name="insights" size={32} color="#064a92" />
          <Text style={styles.cardText}>Ver Relatórios</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialCommunityIcons name="logout" size={20} color="#fff" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#e1eaf7',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#064a92',
    textAlign: 'center',
    marginBottom: 10,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d5e3f3',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  userInfo: {
    marginLeft: 12,
  },
  userLabel: {
    fontSize: 14,
    color: '#064a92',
    fontWeight: '500',
  },
  userEmail: {
    fontSize: 16,
    color: '#064a92',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#064a92',
    textAlign: 'center',
    marginBottom: 30,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    backgroundColor: '#c9daef',
    borderRadius: 12,
    width: '45%',
    paddingVertical: 24,
    paddingHorizontal: 12,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 2,
  },
  cardText: {
    marginTop: 12,
    fontSize: 16,
    color: '#064a92',
    textAlign: 'center',
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 30,
    backgroundColor: '#064a92',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    gap: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
