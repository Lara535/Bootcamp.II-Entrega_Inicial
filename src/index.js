const readline = require('readline-sync');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'fics.json');

function loadFics(){
  if (fs.existsSync(dbPath)){
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  }
  return [];
}

function saveFics(fics){
  fs.writeFileSync(dbPath, JSON.stringify(fics, null, 2));
}

function main(){
  console.log('\n=======================================================');
  console.log('💜😸 Bem-vindo(a) ao FOS CLI - Sua Estante de Fanfics!');
  console.log('=======================================================\n');

  const nome = readline.question('\n> Nome da Fanfic: ');
  const autor = readline.question('\n> Autor: ');
  const plataforma = readline.question('\n> Plataforma (ex: AO3, Wattpad): ');
  const link = readline.question('\n> Link: ');

  if (!nome || !autor || !link){
    console.log('\n❌😿 Erro: Nome, Autor e Link são obrigatórios!');
    return;
  }

  const newFic = {
    id: Date.now(),
    nome,
    autor,
    plataforma: plataforma || 'Não informada',
    link,
    dataAdicao: new Date().toLocaleDateString('pt-BR')
  };

  const fics = loadFics();
  fics.push(newFic);
  saveFics(fics);

  console.log('\n✅😼 Fanfic salva com sucesso na sua prateleira!');
}

main();