import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Telas
import LoginScreen from './src/screens/LoginScreen';
import CadastrarUsuarioScreen from './src/screens/CadastrarUsuario';
import HomeScreen from './src/screens/HomeScreen';
import CadastrarAlunoScreen from './src/screens/CadastrarAluno';
import RelatoriosScreen from './src/screens/Relatorios';
import SelecionarAluno from './src/screens/SelecionarAluno';
import ListaCronogramas from './src/screens/ListaCronogramas';
import Cronograma from './src/screens/Cronograma';
import CadastrarCronogramaMultiplo from './src/screens/CadastrarCronogramaMultiplo'
import SelecionarDia from './src/screens/SelecionarDia'
import AlunosPorDia from './src/screens/AlunosPorDia'
import AtividadesAluno from './src/screens/CronogramaAluno'
import RegistroAtividades from './src/screens/RegiostroAtividades'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Entrar' }} />
        <Stack.Screen name="CadastrarUsuario" component={CadastrarUsuarioScreen} options={{ title: 'Cadastrar Usuário' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
        <Stack.Screen name="CadastrarAluno" component={CadastrarAlunoScreen} options={{ title: 'Cadastrar Aluno' }} />
        <Stack.Screen name="Relatorios" component={RelatoriosScreen} options={{ title: 'Relatórios' }} />
        <Stack.Screen name="SelecionarAluno" component={SelecionarAluno} options={{ title: 'Selecionar Aluno' }} />
        <Stack.Screen name="ListaCronogramas" component={ListaCronogramas} options={{ title: 'Cronogramas do Aluno' }} />
        <Stack.Screen name="Cronograma" component={Cronograma} options={{ title: 'Criar / Editar Cronograma' }} />
        <Stack.Screen name="CadastrarCronogramaMultiplo" component={CadastrarCronogramaMultiplo} options={{ title: 'Criar / Editar Cronograma' }} />
        <Stack.Screen name="SelecionarDia" component={SelecionarDia} options={{ title: 'Registro de Atividades' }} />
        <Stack.Screen name="AlunosDia" component={AlunosPorDia} options={{ title: 'Registro de Atividades' }} />
        <Stack.Screen name="AtividadesAluno" component={AtividadesAluno} options={{ title: 'Registro de Atividades' }} />
        <Stack.Screen name="RegistroAtividades" component={RegistroAtividades} options={{ title: 'Registro de Atividades' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
