const { buscarCitacao } = require('./api');

describe('Testes de Integração com API Externa', () => {
  test('Deve retornar uma citação válida da API (ou fallback)', async () => {
    const citacao = await buscarCitacao();

    expect(typeof citacao).toBe('string');
    expect(citacao.length).toBeGreaterThan(5);
  });
});