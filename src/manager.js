function adicionarFanfic(listaAtual, nome, autor, plataforma, link){
  if (!nome || !autor || !link) {
    throw new Error('Erro: Nome, Autor e Link são obrigatórios!');
  }

  const novaFic = {
    id: Date.now(),
    nome,
    autor,
    plataforma: plataforma || 'Não informada',
    link,
    dataAdicao: new Date().toLocaleDateString('pt-BR')
  };

  return [...listaAtual, novaFic]; 
}

module.exports = {adicionarFanfic};