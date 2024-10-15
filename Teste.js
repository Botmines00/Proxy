javascript:(function() {
    const menu = createMenu();

    // Adiciona a folha de estilos
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(link);

    // Adiciona os estilos CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .chance, .result {
            font-weight: 500;
            border: 2px solid var(--primary-red); /* Bordas vermelhas */
            padding: 8px;
            border-radius: 5px;
            background: rgba(231, 76, 60, 0.1); /* Fundo sutil */
        }
        .percent {
            font-weight: 700;
            border: 2px solid var(--primary-red); /* Bordas vermelhas */
            padding: 8px;
            border-radius: 5px;
            background: rgba(231, 76, 60, 0.1); /* Fundo sutil */
        }
        .colorIndicator {
            font-size: 1.8rem;
            border: 3px solid var(--primary-red); /* Borda vermelha mais espessa */
            padding: 6px;
            border-radius: 5px;
            display: inline-block;
            background: rgba(231, 76, 60, 0.1); /* Fundo sutil */
            transition: border 0.3s, box-shadow 0.3s;
        }
        .colorIndicator:hover {
            box-shadow: 0 0 10px var(--glow-red); /* Sombra de brilho no hover */
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(menu);
    document.addEventListener('dblclick', (e) => toggleMenu(menu, e.clientY, e.clientX));

    // Cria o menu
    function createMenu() {
        const m = document.createElement('div');
        Object.assign(m.style, {
            position: 'fixed', top: '30%', left: '30%', width: '200px',
            background: '#1e1e1e', color: '#fff', padding: '10px', borderRadius: '8px',
            border: '2px solid #fe5f2f', boxShadow: '0 0 10px rgba(0,0,0,0.5)', display: 'none', zIndex: '9999'
        });
        m.innerHTML = `
            <img src="https://i.ibb.co/6r4yRDT/Proxy-sha-256-20241010-125036-0000.jpg" style="display: block; margin: 0 auto; width: 100px; height: 100px; border-radius: 50%; border: 2px solid #fe5f2f;">
            <h3 style='text-align:center;'>System Proxy <i class="fas fa-check-circle" style="color: #fe5f2f;"></i></h3>
            <span id='closeMenu' style="float:right; cursor:pointer; font-size: 24px; color: white;">X</span>
            <div id="host" style='text-align:center; margin-top: 10px;'></div>
            <div id="hackingMessage" style='text-align:center; margin-top: 10px; display: none;'></div>
            <div class="chance" style='text-align:center; margin-top: 10px;'>Chance: <span class="percent" style="display: none;"></span></div>
            <div class="colorIndicator" style='text-align:center; margin-top: 10px; display: none;'></div>
            <div style='text-align:center; margin-top: 10px;'><i class="fas fa-cogs"></i> SHA256 | <i class="fas fa-info-circle"></i> Versão: 4.0</div>
        `;
        return m;
    }

    // Mostra ou oculta o menu com dois cliques
    function toggleMenu(menu, y, x) {
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        } else {
            menu.style.top = `${y}px`; 
            menu.style.left = `${x}px`; 
            menu.style.display = 'block';
        }
    }

    // Fecha o menu quando o botão "X" for clicado
    function closeMenu() {
        menu.style.display = 'none';
    }

    document.getElementById('closeMenu').addEventListener('click', closeMenu);

    // Exibe o host atual
    document.getElementById("host").innerText = document.location.host;

    // Define mensagens de hacking
    const hackingMessages = [
        "Identificando cor...",
        "Extraindo informações...",
        "Acessando banco de dados...",
        "Injetando código malicioso...",
        "Desativando firewall...",
        "Acessando arquivos...",
        "Enviando informações..."
    ];
    let currentMessageIndex = 0;
    const hackingMessageElement = document.getElementById('hackingMessage');

    // Função para alterar as mensagens de hacking
    function changeHackingMessage() {
        hackingMessageElement.style.opacity = '0';
        setTimeout(function () {
            hackingMessageElement.innerText = hackingMessages[currentMessageIndex];
            hackingMessageElement.style.opacity = '1';
            currentMessageIndex = (currentMessageIndex + 1) % hackingMessages.length;
        }, 500);
    }

    setInterval(changeHackingMessage, 3000);

    let lastColor;

    // Função para processar o resultado da API
    function processResult(apiResult) {
        if (apiResult.status === "rolling") {
            const colorSymbol = apiResult.color === 0 ? '⚪️' : apiResult.color === 1 ? '🔴' : '⚫';
            document.getElementById('hackingMessage').style.display = "block";
            document.getElementById("jsonResult").style.display = "block";

            document.querySelector(".chance").style.display = 'none';
            document.querySelector(".percent").style.display = "none";
            document.querySelector(".colorIndicator").style.display = 'none';
        } else if (apiResult.status === "complete") {
            document.getElementById("jsonResult").style.display = "none";
            document.getElementById("hackingMessage").style.display = 'none';

            // Buscar histórico de análises
            fetch("https://blaze.com/api/roulette_games/history_analytics?n=3000")
                .then(response => response.json())
                .then(data => {
                    const matchingPercent = data.rolls_info
                        .map(rollInfo => rollInfo.roll === apiResult.roll ? rollInfo.percent : null)
                        .filter(percent => percent !== null)[0];
                    document.querySelector('.percent').innerText = `${90 + parseFloat(matchingPercent)}%`;
                });

            const colorOptions = ['⚫', '🔴', '⚪️'];
            let selectedColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];

            // Evita selecionar '⚪️' duas vezes seguidas
            if (selectedColor === '⚪️') {
                selectedColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
                selectedColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
            }

            lastColor = selectedColor === '🔴' ? 1 : selectedColor === '⚫' ? 2 : 0;
            document.querySelector(".colorIndicator").innerText = selectedColor;
            document.querySelector('.chance').style.display = "flex";
            document.querySelector(".percent").style.display = "flex";
            document.querySelector(".colorIndicator").style.display = 'flex';
        }
    }

    let status = "rolling";
    async function play(){
        const data = {
            "status": status === "rolling" ? "complete" : "rolling",
            "color": Math.floor(Math.random() * 3),
            "roll": 0
        };
        status = data.status;
        processResult(data);
    }

    function init() {
        setInterval(play, 1000 * 13);
    }

    init();
})();
