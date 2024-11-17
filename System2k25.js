javascript:(function() {
    const results = [], menu = createMenu();
    let correct = 0, total = 0;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(link);

    document.body.appendChild(menu);
    document.addEventListener('dblclick', (e) => showMenu(menu, e.clientY, e.clientX));

    setInterval(() => captureResult(Math.floor(Math.random() * 15)), 15000); // Simulação de resultados aleatórios

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

    document.getElementById('closeMenu').addEventListener('click', closeMenu);

    function captureResult(result) {
        results.push(result);
        if (results.length > 2880) results.shift(); // Mantém os últimos 2880 resultados
        predictColor(result);
    }

    function predictColor(lastResult) {
        const freq = { vermelho: 0, preto: 0, branco: 0 };

        // Mapeia os resultados para suas respectivas cores
        results.forEach(r => {
            if (r === 0) {
                freq.branco++;
            } else if (r >= 1 && r <= 7) {
                freq.vermelho++;
            } else if (r >= 8 && r <= 14) {
                freq.preto++;
            }
        });

        // Determina a cor mais frequente
        let predColor;
        if (freq.vermelho > freq.preto && freq.vermelho > freq.branco) {
            predColor = '🔴';
        } else if (freq.preto > freq.vermelho && freq.preto > freq.branco) {
            predColor = '⚫';
        } else {
            predColor = '⚪'; // Branco se houver empate ou frequência maior
        }

        // Verifica se a previsão foi correta
        const actualColor = lastResult === 0 ? '⚪' : (lastResult <= 7 ? '🔴' : '⚫');
        const correctPrediction = predColor === actualColor;

        // Atualiza as estatísticas de assertividade
        total++;
        correct += correctPrediction ? 1 : 0;

        const accuracyPercent = ((correct / total) * 100).toFixed(2);

        // Atualiza os textos no menu
        document.getElementById('accuracyText').innerText = `Assertividade: ${accuracyPercent}%`;
        document.getElementById('accuracyText').style.color = accuracyPercent < 60 ? 'red' : 'green';
        document.getElementById('predictionText').innerText = `Entrar na Cor: ${predColor}`;
    }
})();
