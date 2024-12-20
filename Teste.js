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
            fetchResults(); // Buscar resultados assim que o menu for aberto
        } else {
            closeMenu();
        }
    });

    function fetchResults() {
        fetch('https://blaze1.space/pt/games/double?modal=double_history-v2_index&roomId=1')
            .then(response => response.json())
            .then(data => {
                // Assumindo que 'data.results' contém os resultados em um array
                // Modifique o caminho de acordo com a estrutura real da resposta
                const resultsArray = data.results || []; // Ajuste conforme necessário
                resultsArray.forEach(result => {
                    captureResult(result.result); // Ajuste se necessário
                });
            })
            .catch(err => console.error('Erro ao buscar resultados:', err));
    }

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
        }, 3000); // Mensagens a cada 3 segundos
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
        if (results.length > 2880) results.shift(); // Limitar o tamanho do array
        predictColor(result);
    }

    function predictColor(lastResult) {
        const freq = { vermelho: 0, preto: 0, branco: 0 };

        // Contar as cores dos resultados
        results.forEach(r => {
            if (r === 0) {
                freq.branco++;
            } else if (r <= 7) {
                freq.vermelho++;
            } else {
                freq.preto++;
            }
        });

        // Lógica de previsão baseada na frequência
        let predColor;
        if (freq.vermelho > freq.preto && freq.vermelho > freq.branco) {
            predColor = '🔴'; // Prever vermelho
        } else if (freq.preto > freq.vermelho && freq.preto > freq.branco) {
            predColor = '⚫'; // Prever preto
        } else {
            predColor = '⚪'; // Se não, prever branco
        }

        // Verificar se a previsão está correta
        const correctPrediction = (lastResult === 0 ? '⚪' : (lastResult <= 7 ? '🔴' : '⚫')) === predColor;
        
        total++; 
        correct += correctPrediction ? 1 : 0;
        const accuracyPercent = (correct / total * 100).toFixed(2);
        
        document.getElementById('accuracyText').innerText = `Assertividade: ${accuracyPercent}%`;
        document.getElementById('accuracyText').style.color = accuracyPercent < 60 ? 'red' : 'green';
        document.getElementById('predictionText').innerText = `Entrar na Cor: ${predColor}`;
    }
})();
