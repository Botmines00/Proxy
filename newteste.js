javascript:(function() {
    const menu = createMenu();

    // Adiciona a folha de estilos
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(link);

    document.body.appendChild(menu);
    document.addEventListener('dblclick', (e) => toggleMenu(menu, e.clientY, e.clientX));

    // Cria o menu
    function createMenu() {
        const m = document.createElement('div');
        Object.assign(m.style, {
            position: 'fixed',
            width: '290px',
            background: '#1e1e1e',
            color: '#fff',
            padding: '10px',
            borderRadius: '8px',
            border: '2px solid #00FF00',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            display: 'none',
            zIndex: '9999',
            maxWidth: '100%',
            boxSizing: 'border-box',
        });

        m.innerHTML = `
            <div style="display: flex; align-items: center;">
                <img src="https://i.ibb.co/y0LXzcQ/IMG-20241017-WA0216.jpg" style="width: 80px; height: 80px; border-radius: 50%; border: 2px solid #00FF00; margin-right: 10px;">
                <div style="flex-grow: 1; text-align: center;">
                    <h3 style='margin: 0; font-size: 18px; color: white;'>NEW SYSTEM 00</h3>
                    <div style='font-size: 12px; color: #00FF00; margin-top: 3px; display: flex; align-items: center; justify-content: center;'>
                        <i class="fab fa-instagram" style="margin-right: 5px; color: #00FF00;"></i>
                        bot00blaze
                    </div>
                    <div id="hackingMessage" style="font-size: 14px; color: #00FF00; margin-top: 10px;">Bem-vindo ao New System 00</div>
                </div>
                <span id='closeMenu' style="cursor: pointer; font-size: 14px; color: white;">❌</span>
            </div>
            <div id="messageArea" style="margin-top: 10px; padding: 5px; background-color: #333; border-radius: 5px;">
                <p id="messageText" style="margin: 0; font-size: 14px;">Nenhuma mensagem no momento</p>
            </div>
            <div style="margin-top: 10px; text-align: center;">
                <div style="display: flex; align-items: center; gap: 5px;">
                    <span class="chance" style="color: #00FF00; font-weight: bold;">Chance: 99.99%</span>
                </div>
                <div style="display: flex; align-items: center; gap: 5px;">
                    Entrar no: <span class="colorIndicator">🔴</span>
                </div>
                <div id="winMessage" style="color: #00FF00; font-weight: bold; display: none;"></div>
                <div style="margin-top: 10px; font-size: 12px; color: #00FF00;">
                    <div style="background-color: rgba(255, 255, 255, 0.1); padding: 3px 5px; border-radius: 5px; display: inline-block;">
                        SHA256 | Versão: 4.0
                    </div>
                </div>
            </div>
            <!-- Gráfico de barras -->
            <div style="margin-top: 20px;">
                <div style="height: 100px; width: 100%; background-color: #333; border-radius: 10px; position: relative;">
                    <div id="redBar" style="position: absolute; bottom: 0; width: 33%; height: 0; background-color: red; border-radius: 10px;"></div>
                    <div id="whiteBar" style="position: absolute; bottom: 0; width: 33%; height: 0; background-color: white; border-radius: 10px;"></div>
                    <div id="blackBar" style="position: absolute; bottom: 0; width: 33%; height: 0; background-color: black; border-radius: 10px;"></div>
                </div>
            </div>
        `;
        return m;
    }

    // Função para garantir que o menu sempre abra corretamente
    function toggleMenu(menu, y, x) {
        menu.style.top = `${y}px`;
        menu.style.left = `${x}px`;
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }

    // Função para exibir mensagens no menu
    function showMessage(message) {
        const messageText = document.getElementById('messageText');
        messageText.textContent = message;
    }

    // Define mensagens de hacking
    const hackingMessages = [
        "Buscando cor...",
        "Obtendo dados...",
        "Acessando DB...",
        "Injetando código...",
        "Desligando firewall...",
        "Carregando arquivos...",
        "Transmitindo dados..."
    ];
    let currentMessageIndex = 0;
    const hackingMessageElement = document.getElementById('hackingMessage');
    hackingMessageElement.innerText = hackingMessages[currentMessageIndex];

    // Função para alterar as mensagens de hacking
    function changeHackingMessage() {
        currentMessageIndex = (currentMessageIndex + 1) % hackingMessages.length;
        hackingMessageElement.innerText = hackingMessages[currentMessageIndex];
    }

    setInterval(changeHackingMessage, 3000); // Altera a mensagem a cada 3 segundos

    // Fecha o menu quando o botão "X" for clicado
    function closeMenu() {
        menu.style.display = 'none';
    }

    document.getElementById('closeMenu').addEventListener('click', closeMenu);

    // Função para processar o resultado da API e atualizar as barras
    function processResult(apiResult) {
        const colorSymbol = apiResult.color; // Cor da previsão (0, 1 ou 2)
        
        let prediction = colorSymbol; // Definir a previsão
        let redHeight = 0;
        let whiteHeight = 0;
        let blackHeight = 0;

        // Ajusta a altura das barras conforme a cor prevista
        if (prediction === 0) {
            whiteHeight = 100; // Cor branca
            redHeight = 0;
            blackHeight = 0;
        } else if (prediction >= 1 && prediction <= 7) {
            redHeight = 100; // Cor vermelha
            whiteHeight = 0;
            blackHeight = 0;
        } else if (prediction >= 8 && prediction <= 14) {
            blackHeight = 100; // Cor preta
            redHeight = 0;
            whiteHeight = 0;
        }

        // Atualiza a altura das barras no gráfico
        document.getElementById('redBar').style.height = `${redHeight}%`;
        document.getElementById('whiteBar').style.height = `${whiteHeight}%`;
        document.getElementById('blackBar').style.height = `${blackHeight}%`;

        // Exibe o ícone da previsão na interface
        const displayColorSymbol = prediction === 0 ? '⚪️' : prediction <= 7 ? '🔴' : '⚫️';
        document.querySelector(".colorIndicator").innerText = displayColorSymbol;
    }

    // Simulação de API
    let status = "rolling";
    async function play() {
        if (status === "rolling") {
            // Gera uma previsão antes de completar o giro
            const data = {
                "status": "complete", // Simulando que o giro foi completo
                "color": Math.floor(Math.random() * 15), // Simulando o valor da cor
                "roll": Math.floor(Math.random() * 100) // Simulando o valor da rolagem
            };
            processResult(data); // Processa o resultado após o giro
            status = "complete"; // Altera o status para evitar previsões múltiplas
        }
    }

    // Inicializa o loop de previsão
    function init() {
        setInterval(() => {
            play();
            status = "rolling"; // Pronto para o próximo giro
        }, 1000 * 13); // Muda o status e faz uma nova previsão a cada 13 segundos
    }

    // Inicia o ciclo de previsões
    init();

    // Exemplo de como exibir uma mensagem ao abrir o menu
    showMessage('Bem-vindo ao New System 00!');

})();
