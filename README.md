# ⚛️ Av. Bom Jesus - Frontend (React + PrimeReact)

[![React](https://img.shields.io/badge/React-18.x-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)
[![PrimeReact](https://img.shields.io/badge/PrimeReact-10.x-purple?logo=primereact)](https://primereact.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)

Interface moderna e responsiva para o gerenciamento de Alunos e Professores do sistema **Av. Bom Jesus**. Este projeto utiliza componentes de alta performance e integração fluida com APIs REST.

---

## ✨ Funcionalidades

* **Cadastro Polimórfico:** Formulários inteligentes que lidam com diferentes tipos de usuários (Student/Professor).
* **Gestão de Imagens:** Upload de fotos de perfil com preview em tempo real e integração com API externa (ImgBB).
* **Endereços Dinâmicos:** Sistema de adição/remoção de múltiplos endereços em lote no mesmo formulário.
* **Validação em Tempo Real:** Botões de ação habilitados apenas após o preenchimento dos requisitos mínimos.
* **Navegação Fluida:** Utilização de `react-router-dom` para transições sem recarregamento de página.

---

## 🛠️ Tecnologias Utilizadas

* **[PrimeReact](https://primereact.org/):** Biblioteca de componentes de UI (Inputs, Buttons, FileUpload, Spinners).
* **[Tailwind CSS](https://tailwindcss.com/):** Estilização utilitária para layout responsivo.
* **[Axios](https://axios-http.com/):** Cliente HTTP para comunicação com o backend Spring Boot.
* **[Lucide React](https://lucide.dev/):** Pacote de ícones leves e modernos.



---

## 📂 Estrutura do Projeto

O código está organizado seguindo as melhores práticas de separação de responsabilidades:

```text
src/
├── components/     # Componentes compartilhados (Ex: AddressField)
├── dto/            # Definições de tipos e interfaces (Data Transfer Objects)
├── pages/          # Telas da aplicação
│   ├── student/    # Listagem, Criação e Edição de Alunos
│   └── professor/  # Listagem, Criação e Edição de Professores
├── services/       # Configuração do Axios e chamadas à API
└── App.tsx         # Configuração de rotas e Provedores
