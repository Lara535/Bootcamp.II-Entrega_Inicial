# 💜 🐱 BootCamp II: Fics On Shelf 

🟢 **Link de Deploy (GitHub Pages):** [Clique aqui para testar a aplicação na nuvem](https://lara535.github.io/Bootcamp.II-Entrega_Inicial/)

---

## 👤 Membros

* **Ana Julia Pereira Silva**
* **Beatriz Dezotti de Souza**
* **Grazielle Santana dos Santos**
* **Lara Abreu Costa de Freitas**

---

## 🎯 Objetivo

Usuários que consomem fanfics e literatura digital assiduamente reconhecem o caos que é gerenciar dezenas de histórias ao mesmo tempo. Hoje, o consumo literário digital sofre com:

* **Fragmentação:** Suas histórias favoritas estão espalhadas por plataformas concorrentes (AO3, Wattpad, Spirit, Tumblr), sem um catálogo universal para unificá-las.
* **Sobrecarga Digital:** Para não perder o fio da meada, leitores acumulam dezenas (às vezes centenas) de abas abertas no navegador do celular ou PC, consumindo memória e gerando ansiedade visual.

**A solução:** O **FOS** evoluiu de uma aplicação de terminal para uma **interface web amigável** integrada a um servidor próprio e banco de dados, atuando como sua estante virtual definitiva. O projeto oferece:

* **Centralização em Nuvem:** Todas as suas histórias são salvas de forma segura em um banco de dados, permitindo que você feche todas as abas em paz e mantenha suas fanfics e livros organizados em um só lugar.
* **Inserção Manual Flexível:** Cadastre rapidamente o Nome, Autor, Plataforma e Link da fanfic, garantindo que você nunca mais perca aquela história incrível.
* **Integração com API (Busca Global):** Além de fanfics, você pode buscar livros de todo o mundo usando a barra de pesquisa integrada com a **Open Library API**, adicionando obras famosas à sua estante com apenas um clique.

---

## 🛠️ Tecnologias Utilizadas
* **HTML5 & CSS3** (Estrutura e Estilização Visual)
* **JavaScript Vanilla** (Lógica de interface e manipulação do DOM)
* **Node.js & Express** (Construção da API e ambiente Back-end)
* **PostgreSQL & Neon** (Banco de dados relacional hospedado na nuvem AWS)
* **Fetch API** (Integração assíncrona com a Open Library API e comunicação com o Back-end)
* **GitHub Pages** (Hospedagem e Deploy do Front-end)
* **Jest & GitHub Actions** (Testes de integração e Pipeline CI)

---

## 🗄️ Arquitetura e Banco de Dados

O projeto utiliza uma arquitetura cliente-servidor. A persistência de dados foi migrada do armazenamento local para um banco de dados relacional **PostgreSQL** hospedado na nuvem via **Neon (AWS)**, garantindo segurança através de conexão SSL e isolamento de credenciais por variáveis de ambiente (`.env`).

### Rotas Principais da API (Back-end):
* `GET /api/fanfics`: Busca as obras diretamente do banco de dados na nuvem de forma ordenada.
* `POST /api/fanfics`: Insere novas obras (tanto fanfics manuais quanto livros vindos da busca global).
* `DELETE /api/fanfics`: Remove todas as obras da estante de forma remota.

### Estrutura do Banco de Dados (SQL)
```sql
CREATE TABLE fanfics (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255),
    plataforma VARCHAR(100),
    link TEXT
);
```
---

## ⚙️ Como Acessar e Rodar

A maneira mais fácil de usar o FOS é acessando a versão online no link no topo deste README. Porém, se você quiser rodar o código na sua própria máquina, o processo é super simples (não requer Node.js para a interface web):

1. Clone o repositório:
```bash
git clone [https://github.com/Lara535/Bootcamp.II-Entrega_Inicial.git](https://github.com/Lara535/Bootcamp.II-Entrega_Inicial.git)
```

2. Certifique-se de criar um arquivo `.env` na raiz do projeto contendo a sua string de conexão com o banco de dados Neon:
```env
DATABASE_URL=sua_string_de_conexao_aqui
```

3. Instale as dependências rodando no terminal:
```bash
npm install
```

4. Inicie o servidor Back-end:
```bash
node server.js
```

5. Abra o arquivo `index.html` no seu navegador para utilizar a aplicação e testar a persistência dos dados.