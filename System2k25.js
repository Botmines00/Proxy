javascript:(async function() {
    const token = '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';
    const owner = 'Botmines00';
    const repo = 'Proxy';
    const filePath = 'Resultados.js';
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
    let fileSha = null;
    const results = [];
    let correct = 0, total = 0;

    // Link para Font Awesome
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(link);

    const menu = createMenu();
    document.body.appendChild(menu);
    document.addEventListener('dblclick', (e) => showMenu(menu, e.clientY, e.clientX));

    setInterval(() => captureResult(Math.floor(Math.random() * 15)), 15000);

    // Função para buscar o SHA do arquivo
    async function fetchFileSha() {
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `token ${token}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            fileSha = data.sha;
        } else {
            console.error('Erro ao buscar SHA do arquivo:', await response.text());
        }
    }

    // Função para atualizar ou criar o arquivo no GitHub
    async function saveResultsToGitHub(content) {
        const encodedContent = btoa(content);
        const body = {
            message: 'Atualizando resultados',
            content: encodedContent,
        };
        if (fileSha) {
            body.sha = fileSha;
        }

        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                Authorization: `token ${token}`,
                Accept: 'application/vnd.github.v3+json',
            },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Arquivo salvo com sucesso:', data);
            fileSha = data.content.sha;
        } else {
            console.error('Erro ao salvar arquivo:', await response.text());
        }
    }

    // Função para criar o menu
    function createMenu() {
        const m = document.createElement('div');
        Object.assign(m.style, {
            position: 'fixed', top: '30%', left: '30%', width: '200px', 
            background: '#1e1e1e', color: '#fff', padding: '10px', borderRadius: '8px', 
            border: '2px solid #48ff4f', boxShadow: '0 0 10px rgba(0,0,0,0.5)', display: 'none', zIndex: '9999'
        });
        m.innerHTML = `
            <img src="https://i.ibb.co/THvNT1F/IMG-20240928-WA0207.jpg" style="display: block; margin: 0 auto; width: 80px; height: 80px; border-radius: 50%; border: 2px solid #48ff4f;">
            <h3 style='text-align:center;'>System Hacker <i class="fas fa-check-circle" style="color: #48ff4f;"></i></h3>
            <span id='closeMenu' style="float:right; cursor:pointer; font-size: 24px; color: white;">X</span>
            <div id='predictionText' style='text-align:center;'><i class="fas fa-circle"></i> Entrar na Cor: ⚪</div>
            <div id='accuracyText' style='text-align:center;'><i class="fas fa-check-circle"></i> Assertividade: 0%</div>
            <div style='text-align:center;'><i class="fas fa-cogs"></i> SHA256 | <i class="fas fa-info-circle"></i> Versão: 1.0</div>
            <div style="text-align:center; margin-top: 10px;">
                <a href="https://www.instagram.com/bot00blaze?igsh=N3l1ZHc0bDFyNGV6" target="_blank" style="color: #48ff4f; text-decoration: none;">
                    <i class="fab fa-instagram" style="color: #48ff4f;"></i> bot00blaze
                </a>
            </div>`;
        document.getElementById('closeMenu').addEventListener('click', closeMenu);
        return m;
    }

    function showMenu(menu, y, x) {
        menu.style.top = `${y}px`; 
        menu.style.left = `${x}px`; 
        menu.style.display = 'block';
    }

    function closeMenu() {
        menu.style.display = 'none';
    }

    function captureResult(result) {
        results.push(result);
        if (results.length > 2880) results.shift();
        predictColor(result);
    }

    function predictColor(lastResult) {
        const freq = { vermelho: 0, preto: 0, branco: 0 };
        results.forEach(r => freq[r === 0 ? 'branco' : r <= 7 ? 'vermelho' : 'preto']++);
        
        const predColor = freq.vermelho > freq.preto ? '🔴' : freq.preto > freq.vermelho ? '⚫' : '⚪';
        const correctPrediction = (lastResult === 0 ? '⚪' : (lastResult <= 7 ? '🔴' : '⚫')) === predColor;

        total++; correct += correctPrediction ? 1 : 0;
        const accuracyPercent = (correct / total * 100).toFixed(2);
        
        document.getElementById('accuracyText').innerText = `Assertividade: ${accuracyPercent}%`;
        document.getElementById('accuracyText').style.color = accuracyPercent < 60 ? 'red' : 'green';
        document.getElementById('predictionText').innerText = `Entrar na Cor: ${predColor}`;

        // Salva os dados no GitHub
        const resultados = {
            data: new Date().toISOString(),
            padroes: [
                { cor: 'vermelho', ocorrencias: freq.vermelho },
                { cor: 'preto', ocorrencias: freq.preto },
                { cor: 'branco', ocorrencias: freq.branco }
            ],
            accuracy: accuracyPercent
        };
        saveResultsToGitHub(JSON.stringify(resultados, null, 2));
    }

    await fetchFileSha(); // Busca o SHA do arquivo inicialmente

})();
