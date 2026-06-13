// PASSO 1: MOCKS GLOBAIS (Precisam existir ANTES de chamar o script.js)
global.window = { onload: null };
global.document = { getElementById: jest.fn() };
global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
};
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve([]) }));
global.alert = jest.fn();

// PASSO 2: IMPORTAÇÃO (SÓ AGORA chamamos o arquivo, pois o ambiente falso já está seguro)
const { validarLinkFanfic } = require('./script.js');

// PASSO 3: TESTES
describe('Testes da Função validarLinkFanfic', () => {
    afterEach(() => {
        global.alert.mockClear();
    });

    // --- TESTES DE SUCESSO ---
    it('Deve retornar true para um link válido do AO3', () => {
        const resultado = validarLinkFanfic('https://archiveofourown.org/works/123456');
        expect(resultado).toBe(true);
        expect(global.alert).not.toHaveBeenCalled();
    });

    it('Deve retornar true para um link válido do Wattpad', () => {
        const resultado = validarLinkFanfic('https://www.wattpad.com/story/987654');
        expect(resultado).toBe(true);
    });

    it('Deve retornar true para um link válido do Spirit', () => {
        const resultado = validarLinkFanfic('https://www.spiritfanfiction.com/historia/exemplo');
        expect(resultado).toBe(true);
    });

    // --- TESTES DE FALHA ---
    it('Deve retornar false e exibir alert para um link não permitido', () => {
        const resultado = validarLinkFanfic('https://www.youtube.com/watch?v=video');
        expect(resultado).toBe(false);
        expect(global.alert).toHaveBeenCalledWith(expect.stringContaining('plataforma válida'));
    });

    it('Deve retornar false e exibir alert quando o usuário enviar um link vazio', () => {
        const resultado = validarLinkFanfic('');
        expect(resultado).toBe(false);
        expect(global.alert).toHaveBeenCalledWith('Por favor, insira o link da fanfic!');
    });
});