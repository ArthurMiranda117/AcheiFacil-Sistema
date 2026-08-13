# AcheiFacil — Sistema Web de Achados e Perdidos

> Sistema web desenvolvido para gerenciar achados e perdidos em ambientes escolares, permitindo o registro, controle e devolução de itens encontrados nas dependências da instituição.

---

## Sobre o Projeto

O **AcheiFacil** é um sistema web fullstack desenvolvido como Trabalho de Conclusão de Curso do Técnico em Desenvolvimento de Sistemas da Escola Técnica do Guará Professora Teresa Ondina Maltese (ETG).

O sistema permite que atendentes registrem itens encontrados, controlem o status de cada item e registrem as retiradas realizadas pelos proprietários, substituindo métodos manuais e informais de registro por uma solução digital organizada e eficiente.

---

## Funcionalidades

### Módulo de Itens
- ✅ Cadastrar itens encontrados (categoria, descrição, cor, data e local)
- ✅ Listar todos os itens com status atual
- ✅ Editar informações de um item
- ✅ Excluir itens com confirmação
- ✅ Controle de status: **disponível** ou **retirado**

### Módulo de Retiradas
- ✅ Registrar retirada vinculada a um item disponível
- ✅ Seleção de item por dropdown (exibe apenas itens disponíveis)
- ✅ Baixa automática no status do item ao confirmar retirada
- ✅ Listar, editar e excluir retiradas

---

## Tecnologias Utilizadas

### Frontend
| Tecnologia | Versão | Função |
|---|---|---|
| React | 18+ | Interface do usuário |
| Vite | 5+ | Servidor de desenvolvimento |
| React Router DOM | 6+ | Navegação entre páginas |
| CSS3 | — | Estilização da interface |

### Backend
| Tecnologia | Versão | Função |
|---|---|---|
| Python | 3+ | Linguagem principal |
| Flask | 3+ | Framework da API REST |
| mysql-connector-python | — | Conexão com o banco de dados |

### Banco de Dados
| Tecnologia | Versão | Função |
|---|---|---|
| MySQL | 8+ | Armazenamento dos dados |

---

## Estrutura do Banco de Dados

```sql
CREATE DATABASE db_acheifacil;

USE db_acheifacil;

CREATE TABLE tb_item (
    ID_itens INT AUTO_INCREMENT PRIMARY KEY,
    categoria VARCHAR(100) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    cor_item VARCHAR(15) NOT NULL,
    data_achado DATE NOT NULL,
    local_achado VARCHAR(200) NOT NULL,
    status VARCHAR(20) DEFAULT 'disponivel'
);

CREATE TABLE tb_retirada (
    ID_retirada INT AUTO_INCREMENT PRIMARY KEY,
    item_ID INT NOT NULL,
    nome_retirada VARCHAR(100) NOT NULL,
    cpf_retirada VARCHAR(14) NOT NULL,
    data_retirada DATE NOT NULL,
    atendente VARCHAR(100) NOT NULL,
    FOREIGN KEY (item_ID) REFERENCES tb_item(ID_itens)
);
```

---

## Estrutura do Projeto

```
AcheiFacil/
├── api/                        # Backend Flask
│   ├── controllers/
│   │   ├── item_controller.py
│   │   └── retirada_controller.py
│   ├── models/
│   │   ├── db_connect.py
│   │   ├── item.py
│   │   └── retirada.py
│   └── app.py
│
└── src/                        # Frontend React
    ├── pages/
    │   ├── Home.jsx
    │   ├── item/
    │   │   ├── listagem_item.jsx
    │   │   ├── cadastro_item.jsx
    │   │   └── editar_item.jsx
    │   └── retirada/
    │       ├── listagem_retirada.jsx
    │       ├── cadastro_retirada.jsx
    │       └── editar_retirada.jsx
    ├── assets/
    │   └── js/
    │       ├── ModalAviso.jsx
    │       └── ModalConfirmacao.jsx
    ├── App.jsx
    ├── index.css
    └── main.jsx
```

---

## Como Rodar o Projeto

### Pré-requisitos

- [Python 3+](https://www.python.org/downloads/)
- [Node.js](https://nodejs.org/)
- [MySQL 8+](https://www.mysql.com/downloads/)

### 1. Clone o repositório

```bash
git clone https://github.com/ArthurMiranda117/AcheiFacil-Sistema.git
cd AcheiFacil-Sistema
```

### 2. Configure o Banco de Dados

Abra o MySQL e execute o script SQL da seção **Estrutura do Banco de Dados** acima.

### 3. Configure o Backend

```bash
cd api
```

Instale as dependências Python:

```bash
pip install flask mysql-connector-python
```

Verifique as configurações de conexão em `models/db_connect.py`:

```python
self.config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'sua_senha',
    'database': 'db_acheifacil'
}
```

Inicie o servidor Flask:

```bash
python app.py
```

O backend estará rodando em: `http://localhost:5000`

### 4. Configure o Frontend

Abra um novo terminal na raiz do projeto:

```bash
npm install
npm run dev
```

O frontend estará disponível em: `http://localhost:5173`

---

## Rotas da API

### Itens
| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/listaItem` | Lista todos os itens |
| POST | `/api/cadastroItem` | Cadastra um novo item |
| GET | `/api/editarItem/<id>` | Busca um item pelo ID |
| PUT | `/api/atualizarItem/<id>` | Atualiza um item |
| DELETE | `/api/excluiItem/<id>` | Remove um item |

### Retiradas
| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/listaRetirada` | Lista todas as retiradas |
| POST | `/api/cadastroRetirada` | Cadastra uma nova retirada |
| GET | `/api/editarRetirada/<id>` | Busca uma retirada pelo ID |
| PUT | `/api/atualizarRetirada/<id>` | Atualiza uma retirada |
| DELETE | `/api/excluiRetirada/<id>` | Remove uma retirada |

---

## Autores

| Nome | GitHub |
|---|---|
| Arthur de Miranda Benis | [@ArthurMiranda117](https://github.com/ArthurMiranda117) |
| Davi Felipe Da Silva Ferreira | — |

---

## Instituição

Desenvolvido como Trabalho de Conclusão de Curso do **Técnico em Desenvolvimento de Sistemas** da:

**Escola Técnica do Guará Professora Teresa Ondina Maltese — ETG**

Orientadores: **Prof. Maico** e **Prof. Renilson**

Brasília – DF, 2026
