async function buscarCitacao() {
  try {
    const resposta = await fetch('https://dummyjson.com/quotes/random');
    const dados = await resposta.json();
    return `"${dados.quote}" - ${dados.author}`;
  } catch {
    return '"A leitura é uma viagem de descobertas." - FOS CLI';
  }
}

module.exports = { buscarCitacao };