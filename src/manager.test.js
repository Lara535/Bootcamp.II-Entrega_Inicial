const {adicionarFanfic} = require('./manager');

describe('Testes do Gerenciador de Fanfics (FOS CLI)', () => {

  test('Deve adicionar uma nova fanfic corretamente (Caminho Feliz)', () => {
    const listaVazia = [];
    const novaLista = adicionarFanfic(listaVazia, 'Manacled', 'SenLinYu', 'AO3', 'https://link.com');

    expect(novaLista.length).toBe(1); 
    expect(novaLista[0].nome).toBe('Manacled'); 
    expect(novaLista[0].plataforma).toBe('AO3'); 
  });

  test('Deve lançar erro se faltar dados obrigatórios (Tratamento de Erro)', () => {
    const listaVazia = [];
    
    expect(() => {
      adicionarFanfic(listaVazia, 'Manacled', 'SenLinYu', 'AO3', '');
    }).toThrow('Erro: Nome, Autor e Link são obrigatórios!');
  });

});