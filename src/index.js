const readline = require('readline-sync');
const fs = require('fs');
const path = require('path');
const { adicionarFanfic } = require('./manager'); 
const { buscarCitacao } = require('./api');

const dbPath = path.join(__dirname, '..', 'fics.json');

function loadFics() {
  if (fs.existsSync(dbPath)) {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  }
  return [];
}

function saveFics(fics) {
  fs.writeFileSync(dbPath, JSON.stringify(fics, null, 2));
}

async function main(){
  console.log('\n=======================================================');
  console.log('💜😸 Bem-vindo(a) ao FOS CLI - Sua Estante de Fanfics!');
  console.log('=======================================================\n');  

  console.log('Buscando inspiração do dia...');
  const citacao = await buscarCitacao();
  console.log(`💡 ${citacao}\n`);
  
  const nome = readline.question('> Nome da Fanfic: ');
  const autor = readline.question('> Autor: ');
  const plataforma = readline.question('> Plataforma (ex: AO3, Wattpad): ');
  const link = readline.question('> Link: ');

  try {
    const fics = loadFics();
    const listaAtualizada = adicionarFanfic(fics, nome, autor, plataforma, link);
    saveFics(listaAtualizada);
    console.log('\n✅😼 Fanfic salva com sucesso na sua prateleira!');
  } catch (erro) {
    console.log(`\n❌😿 ${erro.message}`);
  }
}

main();