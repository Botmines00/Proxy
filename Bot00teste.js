javascript:(function() {
    const results = [], menu = createMenu();
    let correct = 0, total = 0;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(link);

    document.body.appendChild(menu);

    // Array com mensagens de "hacking"
    const hackingMessages = [
        "Identificando cor...",
        "Extraindo informações...",
        "Acessando banco de dados...",
        "Injetando código malicioso...",
        "Desativando firewall...",
        "Acessando arquivos...",
        "Enviando informações..."
    ];

    // Usar um clique simples para abrir o menu e iniciar as mensagens
    document.addEventListener('click', (e) => {
        if (menu.style.display === 'none' || !menu.style.display) {
            showMenu(menu, e.clientY, e.clientX);
            rotateMessages();
        } else {
            closeMenu();
        }
    });

    setInterval(() => captureResult(Math.floor(Math.random() * 15)), 15000);

    function createMenu() {
        const m = document.createElement('div');
        Object.assign(m.style, {
            position: 'fixed', top: '30%', left: '30%', width: '200px', 
            background: '#1e1e1e', color: '#fff', padding: '10px', borderRadius: '8px', 
            border: '2px solid purple', boxShadow: '0 0 10px rgba(0,0,0,0.5)', display: 'none', zIndex: '9999'
        });
        m.innerHTML = `
            <img src="https://i.ibb.co/TwMJKVF/IMG-20240926-WA0099.jpg" style="display: block; margin: 0 auto; width: 80px; height: 80px; border-radius: 50%; border: 2px solid purple;">
            <h3 style='text-align:center;'>System Hacker <i class="fas fa-check-circle" style="color: red;"></i></h3>
            <span id='closeMenu' style="float:right; cursor:pointer; font-size: 24px; color: white;">X</span>
            <div id='hackingMessages' style='text-align:center; margin-top:5px; font-size:14px; white-space: nowrap;'>Iniciando hack...</div>
            <div id='predictionText' style='text-align:center; margin-top: 10px;'><i class="fas fa-circle"></i> Entrar na Cor: ⚪</div>
            <div id='accuracyText' style='text-align:center; margin-top: 5px;'><i class="fas fa-check-circle"></i> Assertividade: 0%</div>
            <div style='text-align:center; margin-top: 5px;'><i class="fas fa-cogs"></i> SHA256 | <i class="fas fa-info-circle"></i> Versão: 1.0</div>`;
        
        return m;
    }

    function rotateMessages() {
        let messageIndex = 0;
        const messageContainer = document.getElementById('hackingMessages');
        setInterval(() => {
            messageContainer.innerText = hackingMessages[messageIndex];
            messageIndex = (messageIndex + 1) % hackingMessages.length;
        }, 4000);
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
        if (results.length > 2880) results.shift();
        predictColor(result);
    }

    function predictColor(lastResult) {
        const freq = { vermelho: 0, preto: 0, branco: 0 };
        results.forEach(r => freq[r === 0 ? 'branco' : r <= 7 ? 'vermelho' : 'preto']++);
        
        let predColor;
        if (Math.abs(freq.vermelho - freq.preto) <= 5) {
            predColor = ['🔴', '⚫'][Math.floor(Math.random() * 2)];
        } else {
            predColor = freq.vermelho > freq.preto ? '🔴' : '⚫';
        }

        if (freq.branco > Math.max(freq.vermelho, freq.preto)) {
            predColor = '⚪';
        }

        const correctPrediction = (lastResult === 0 ? '⚪' : (lastResult <= 7 ? '🔴' : '⚫')) === predColor;

        total++; correct += correctPrediction ? 1 : 0;
        const accuracyPercent = (correct / total * 100).toFixed(2);
        
        document.getElementById('accuracyText').innerText = `Assertividade: ${accuracyPercent}%`;
        document.getElementById('accuracyText').style.color = accuracyPercent < 60 ? 'red' : 'green';
        document.getElementById('predictionText').innerText = `Entrar na Cor: ${predColor}`;
    }
})();
