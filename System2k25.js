javascript:(function() {
    const results = [], menu = createMenu();
    let correct = 0, total = 0;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(link);

    document.body.appendChild(menu);
    document.addEventListener('dblclick', (e) => showMenu(menu, e.clientY, e.clientX));

    // Fetch results from API every 15 seconds
    setInterval(() => fetchResults(), 15000);

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

    async function fetchResults() {
        try {
            const response = await fetch('https://blaze1.space/api/roulette_games/history_analytics?n=3000');
            const data = await response.json();
            const latestResult = data.data[0].color; // Assuming 'color' is the key for the result (0=white, 1-7=red, 8-14=black)
            captureResult(latestResult);
        } catch (error) {
            console.error('Erro ao buscar os resultados:', error);
        }
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
    }
})();
