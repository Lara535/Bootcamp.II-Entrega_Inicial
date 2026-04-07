# 💜😸 BootCamp II: Fics On Shelf (FOS CLI)

**Um gerenciador de linha de comando para organizar fanfics e criar uma estante local.**

---

## 👤 Autor
**Lara Abreu Costa de Freitas**

---

## 🎯 Objetivo

Usuários que consomem fanfics assiduamente reconhecem o caos que é gerenciar dezenas de histórias ao mesmo tempo. Hoje, o consumo literário digital sofre com:

* **Fragmentação:** Suas histórias favoritas estão espalhadas por plataformas concorrentes (AO3, Wattpad, Spirit, Tumblr), sem um catálogo universal para unificá-las.
* **Sobrecarga Digital:** Para não perder o fio da meada, leitores acumulam dezenas (às vezes centenas) de abas abertas no navegador do celular ou PC, consumindo memória e gerando ansiedade visual.

**A solução:** O **FOS CLI** atua como uma estante local, onde através de um terminal simples, o usuário é o dono dos seus dados. O projeto oferece:

* **Inserção Direta e Estável:** Sem depender de robôs que quebram quando os sites atualizam, você mesmo cadastra rapidamente o Nome, Autor, Plataforma e Link da fanfic.
* **Centralização Offline:** Todas as suas histórias são salvas em um banco de dados local (um arquivo `.json` no seu computador). Você pode fechar todas as abas do navegador em paz e ter todas as fanfics de fontes diferentes em um lugar só!

---

## 🛠️ Tecnologias Utilizadas
* **JavaScript** (Linguagem)
* **Node.js**
* **Jest** (Testes Automatizados)
* **ESLint** (Linting / Análise Estática)
* **GitHub Actions** (CI Pipeline)

---

## ⚙️ Como Instalar

Para rodar o FOS CLI na sua máquina, é necessário ter o **Node.js** instalado. Siga os passos abaixo no seu terminal:

1. Clone o repositório:
```bash
git clone https://github.com/Lara535/Bootcamp.II-Entrega_Inicial.git
```
2. Entre na pasta do projeto:
```bash
cd Bootcamp.II-Entrega_Inicial
````
3. Instale as dependências (o projeto utiliza a biblioteca `readline-sync`):
```bash
npm install
```
---

## 🚀 Como Usar

Com tudo instalado, você poderá usar o FOS CLI de forma rápida e fácil!

1. Inicie a aplicação no terminal digitando o seguinte comando:
```bash
npm start
```
ou
```bash
node src/index.js
```

2. Para preencher as informações, o sistema fará 4 perguntas rápidas. Basta digitar ou colar os dados da fanfic que você deseja salvar e apertar `Enter` após cada uma:

- `> Nome da Fanfic:`

- `> Autor:`

- `> Plataforma (ex: AO3, Wattpad):`

- `> Link:`

### ✅😼 Pronto! Sua fanfic será salva automaticamente no seu computador.
