```markdown
# Protocolo TEA App

Aplicativo mobile desenvolvido para facilitar o registro e acompanhamento de comportamentos de alunos com Transtorno do Espectro Autista (TEA) no ambiente escolar. Voltado principalmente para professores, o app permite cadastrar alunos, definir cronogramas de observação e registrar eventos do dia a dia com base em protocolos estruturados.

## 🧠 Objetivo

Oferecer uma ferramenta prática e acessível para auxiliar no monitoramento de crianças com TEA, promovendo intervenções mais eficazes baseadas em dados reais.

## 📱 Tecnologias Utilizadas

- React Native com TypeScript
- Expo para desenvolvimento multiplataforma
- Supabase como backend e banco de dados
- Organização modular com componentes e telas reutilizáveis

## 📂 Estrutura do Projeto

```

Protocolo-TEA-App-main/
├── App.tsx                  # Componente principal do aplicativo
├── app.json                 # Configurações do Expo
├── package.json             # Dependências e scripts
├── tsconfig.json            # Configuração do TypeScript
├── assets/                  # Ícones e imagens do app
├── src/
│   ├── supabaseClient.ts    # Conexão com o Supabase
│   ├── constants/colors.ts  # Cores padrão da aplicação
│   └── screens/             # Telas da aplicação
│       ├── HomeScreen.tsx
│       ├── CadastrarAluno.tsx
│       ├── Cronograma.tsx
│       └── ...

```

## ✅ Funcionalidades

- Cadastro de usuários (professores)
- Cadastro e listagem de alunos com TEA
- Criação e visualização de cronogramas
- Registro de comportamentos por dia/aluno
- Interface simples, responsiva e acessível

## 🚀 Como Executar

1. Clone o repositório:

```

git clone [https://github.com/seu-usuario/Protocolo-TEA-App.git](https://github.com/seu-usuario/Protocolo-TEA-App.git)
cd Protocolo-TEA-App

```

2. Instale as dependências:

```

npm install

```

3. Execute com o Expo:

```

npx expo start

```

> **Atenção:** configure suas chaves e URLs do Supabase corretamente no arquivo `src/supabaseClient.ts`.

## 🧰 Requisitos

- Node.js 18 ou superior
- Expo CLI
- Conta no [Supabase](https://supabase.io)

## 👨‍🏫 Público-Alvo

Professores e profissionais da educação inclusiva que lidam com alunos diagnosticados com TEA.

## 🛡️ Licença

Este projeto está licenciado sob a Licença MIT.
```
