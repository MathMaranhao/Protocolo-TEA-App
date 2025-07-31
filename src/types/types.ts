export type RootStackParamList = {
  Login: undefined;
  CadastrarUsuario: undefined;
  Home: undefined;
  CadastrarAluno: undefined;
  AtividadesHoje: undefined;
  Relatorios: undefined;
  SelecionarAluno: undefined;
  ListaCronogramas: undefined;
  Cronograma: { alunoId: string; cronogramaId?: string | null; data?: string | null };
  CadastrarCronogramaMultiplo: { alunoId: string };
  SelecionarDia: undefined;
  AlunosDia: { dia: string };
  AtividadesAluno: { alunoId: string; dia: string };
  RegistroAtividades: { atividadeId: string; alunoId: string; dia: string };
};
