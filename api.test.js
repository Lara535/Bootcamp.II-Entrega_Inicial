describe("Teste de Integração - Open Library API", () => {
    it("Deve conseguir se comunicar com a API e buscar o livro Harry Potter", async () => {
        // Dispara uma requisição real para a API
        const resposta = await fetch("https://openlibrary.org/search.json?title=harry+potter&limit=1");
        const dados = await resposta.json();

        // 1. Valida se a conexão não quebrou (Status 200 OK significa sucesso)
        expect(resposta.status).toBe(200);
        
        // 2. Valida se o fluxo de dados retornou a lista de documentos (livros)
        expect(dados.docs).toBeDefined();
        expect(dados.docs.length).toBeGreaterThan(0);
        
        // 3. Valida se o livro retornado realmente tem um título definido
        expect(dados.docs[0].title).toBeDefined();
    });
});