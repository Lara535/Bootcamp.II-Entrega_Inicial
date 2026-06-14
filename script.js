let minhasFanfics = [];
let obraEncontradaTemporaria = null;

// Ao carregar a página, puxa os dados salvos no navegador
window.onload = function() {
    const dadosSalvos = localStorage.getItem('fos_database');
    if(dadosSalvos) {
        minhasFanfics = JSON.parse(dadosSalvos);
        renderizarEstante();
    }
};

function validarLinkFanfic(linkDigitado) {
    // 1. Verifica se a pessoa deixou o campo vazio
    if (!linkDigitado || linkDigitado.trim() === "") {
        alert("Por favor, insira o link da fanfic!");
        return false;
    }

    // 2. Lista das plataformas aceitas (Vírgula corrigida aqui!)
    const plataformasPermitidas = [
        "archiveofourown.org",
        "wattpad.com",
        "spiritfanfiction.com",
        "fanfiction.net",
        "tumblr.com",
        "x.com"
    ];

    // 3. Verifica se o texto digitado contém o nome de alguma das plataformas
    const linkEhValido = plataformasPermitidas.some(plataforma => 
        linkDigitado.toLowerCase().includes(plataforma)
    );

    if (!linkEhValido) {
        alert("Ops! O link precisa ser de uma plataforma válida (AO3, Wattpad, Spirit, Fanfiction.net, Tumblr ou X (Twitter)).");
        return false;
    }

    return true; // Link é válido!
}

function adicionarFanfic() {
    const nome = document.getElementById('nome').value;
    const autor = document.getElementById('autor').value;
    const plataforma = document.getElementById('plataforma').value;
    const link = document.getElementById('link').value;

    if(!nome || !autor) return alert("Nome e Autor são obrigatórios!");

    // Chama a nossa nova validação de link aqui!
    // Se a função retornar false, a execução para e a fanfic não é salva.
    if (!validarLinkFanfic(link)) {
        return; 
    }

    const novaFanfic = { nome, autor, plataforma, link };
    minhasFanfics.push(novaFanfic);
    
    salvarERenderizar();
    
    // Limpa os campos
    document.getElementById('nome').value = '';
    document.getElementById('autor').value = '';
    document.getElementById('plataforma').value = '';
    document.getElementById('link').value = '';
}

async function buscarNaAPI() {
    const termo = document.getElementById('busca-api').value;
    const resultadoDiv = document.getElementById('resultado-api');
    
    if(!termo) return alert("Digite um título para buscar!");
    
    resultadoDiv.innerHTML = "🔍 Buscando na Open Library...";

    try {
        const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(termo)}&limit=1`);
        const data = await response.json();

        if(data.docs && data.docs.length > 0) {
            const livro = data.docs[0];
            
            obraEncontradaTemporaria = {
                nome: livro.title,
                autor: livro.author_name ? livro.author_name[0] : "Autor Desconhecido",
                plataforma: "Open Library (Livro)",
                link: "#"
            };

            resultadoDiv.innerHTML = `
                <div style="background: rgba(147, 51, 234, 0.1); padding: 10px; border-radius: 8px; border: 1px solid var(--roxo-vibrante);">
                    <strong>Obra encontrada!</strong><br>
                    📖 ${obraEncontradaTemporaria.nome}<br>
                    ✍️ ${obraEncontradaTemporaria.autor}<br>
                    <button class="btn-secundario" onclick="confirmarAdicaoDaAPI()">✅ Adicionar à Minha Estante</button>
                </div>
            `;
        } else {
            resultadoDiv.innerHTML = "❌ Nenhuma obra encontrada.";
            obraEncontradaTemporaria = null;
        }
    } catch (error) {
        resultadoDiv.innerHTML = "⚠️ Erro ao conectar com a API.";
        console.error(error);
    }
}

function confirmarAdicaoDaAPI() {
    if(obraEncontradaTemporaria) {
        minhasFanfics.push(obraEncontradaTemporaria);
        salvarERenderizar();
        document.getElementById('resultado-api').innerHTML = "✨ Adicionado com sucesso!";
        obraEncontradaTemporaria = null;
    }
}

function salvarERenderizar() {
    localStorage.setItem('fos_database', JSON.stringify(minhasFanfics));
    renderizarEstante();
}

function renderizarEstante() {
    const estante = document.getElementById('estante');
    estante.innerHTML = '';

    document.getElementById('total-obras').textContent = minhasFanfics.length;

    if(minhasFanfics.length === 0) {
        estante.innerHTML = "<p style='color: var(--texto-secundario);'>Sua estante local está vazia.</p>";
        return;
    }

    minhasFanfics.forEach((fic, index) => {
        const card = document.createElement('div');
        card.className = 'fanfic-card';
        card.innerHTML = `
            <h3>${fic.nome}</h3>
            <p><strong>Autor(a):</strong> ${fic.autor}</p>
            <p><strong>Plataforma:</strong> ${fic.plataforma}</p>
            ${fic.link && fic.link !== '#' ? `<a href="${fic.link}" target="_blank">Acessar Obra ↗</a>` : ''}
        `;
        estante.appendChild(card);
    });
}

function exportarParaPDF() {
    if(minhasFanfics.length === 0) return alert("Sua estante está vazia!");

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const roxo = [147, 51, 234];
    const roxoClaro = [192, 132, 252];
    const fundoCard = [26, 18, 46];
    const cinza = [156, 163, 175];
    const branco = [243, 244, 246];

    doc.setFillColor(11, 7, 20);
    doc.rect(0, 0, 210, 297, 'F');

    doc.setFillColor(...roxo);
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Fics On Shelf', 105, 13, { align: 'center' });
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(220, 200, 255);
    doc.text('Fanfic Organizer System - Backup da Estante', 105, 22, { align: 'center' });

    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString('pt-BR') + ' às ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    doc.setFontSize(8);
    doc.setTextColor(...cinza);
    doc.text(`Gerado em: ${dataFormatada}  |  Total: ${minhasFanfics.length} obra(s)`, 105, 38, { align: 'center' });

    let y = 48;
    const margemEsq = 14;
    const larguraCard = 182;

    minhasFanfics.forEach((fic, i) => {
        const alturaCard = fic.link && fic.link !== '#' ? 32 : 27;

        if (y + alturaCard > 280) {
            doc.addPage();
            doc.setFillColor(11, 7, 20);
            doc.rect(0, 0, 210, 297, 'F');
            y = 14;
        }

        doc.setFillColor(...fundoCard);
        doc.roundedRect(margemEsq, y, larguraCard, alturaCard, 3, 3, 'F');

        doc.setFillColor(...roxo);
        doc.rect(margemEsq, y, 3, alturaCard, 'F');

        doc.setFontSize(7);
        doc.setTextColor(...cinza);
        doc.text(`#${String(i + 1).padStart(2, '0')}`, margemEsq + 7, y + 7);

        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...roxoClaro);
        const tituloTruncado = doc.splitTextToSize(fic.nome, larguraCard - 22);
        doc.text(tituloTruncado[0], margemEsq + 20, y + 8);

        doc.setFontSize(8.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...branco);
        doc.text(`Autor(a): `, margemEsq + 7, y + 17);
        doc.setTextColor(...cinza);
        doc.text(fic.autor || '—', margemEsq + 26, y + 17);

        doc.setTextColor(...branco);
        doc.text(`Plataforma: `, margemEsq + 90, y + 17);
        doc.setTextColor(...cinza);
        doc.text(fic.plataforma || '—', margemEsq + 115, y + 17);

        if (fic.link && fic.link !== '#') {
            doc.setFontSize(7.5);
            doc.setTextColor(...roxo);
            const linkTruncado = fic.link.length > 70 ? fic.link.substring(0, 67) + '...' : fic.link;
            doc.text(`Link: ${linkTruncado}`, margemEsq + 7, y + 26);
        }

        y += alturaCard + 5;
    });

    const totalPaginas = doc.getNumberOfPages();
    for (let p = 1; p <= totalPaginas; p++) {
        doc.setPage(p);
        doc.setFillColor(11, 7, 20);
        doc.rect(0, 287, 210, 10, 'F');
        doc.setFontSize(7);
        doc.setTextColor(...cinza);
        doc.text(`FOS - Fics On Shelf  |  Página ${p} de ${totalPaginas}`, 105, 293, { align: 'center' });
    }

    doc.save('minha_estante_FOS.pdf');
}

function limparEstante() {
    if(confirm('⚠️ ATENÇÃO: Isso apagará TODAS as fanfics da sua estante permanentemente. Tem certeza?')) {
        minhasFanfics = [];
        salvarERenderizar();
        alert('🗑️ Estante limpa com sucesso!');
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { validarLinkFanfic };
}