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
                    <span class="chance" style="color: #2ecc71; font-weight: bold;">Chance: 0%</span>
                </div>
                <div style="display: flex; align-items: center; gap: 5px;">
                    Entrar no: <span class="colorIndicator">🔴</span>
                </div>
                <div style="margin-top: 10px; font-size: 12px; color: #00FF00;">
                    SHA256 | Versão: 4.0
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

    // Fecha o menu quando o botão "X" for clicado
    function closeMenu() {
        menu.style.display = 'none';
    }

    document.getElementById('closeMenu').addEventListener('click', closeMenu);

    // Função para processar o resultado da API e calcular a chance
    function processResult(apiResult) {
        const colorSymbol = apiResult.color === 0 ? '⚪️' : apiResult.color === 1 ? '🔴' : '⚫️';
        document.getElementById('hackingMessage').style.display = "block";
        document.getElementById("messageArea").style.display = "block";
        document.querySelector(".colorIndicator").innerText = colorSymbol;

        // Buscar histórico de análises (simulado)
        fetch("https://blaze.com/api/roulette_games/history_analytics?n=10")
            .then(response => response.json())
            .then(data => {
                if (!data || data.length === 0) {
                    console.error("Histórico vazio ou inválido");
                    return;
                }

                // Calcula a porcentagem com base nos últimos 10 resultados
                const lastRolls = data.slice(0, 10); // Pegando os últimos 10 resultados
                const countColor = lastRolls.filter(roll => roll.color === apiResult.color).length;
                const chance = (countColor / 10) * 100; // Percentual baseado no histórico

                // Atualiza a chance no menu
                document.querySelector('.chance').innerText = `Chance: ${chance.toFixed(0)}%`;
            })
            .catch(error => {
                console.error("Erro ao buscar histórico:", error);
            });
    }

    // Simulação de API
    let status = "rolling";
    async function play() {
        const data = {
            "status": status === "rolling" ? "complete" : "rolling",
            "color": Math.floor(Math.random() * 3),
            "roll": Math.floor(Math.random() * 100) // Simulando um valor de rolagem
        };
        status = data.status;
        processResult(data);
    }

    // Inicializa o loop de previsão
    function init() {
        setInterval(play, 1000 * 13); // Muda o status a cada 13 segundos
    }

    // Inicia o ciclo de previsões
    init();

    // Exemplo de como exibir uma mensagem ao abrir o menu
    document.getElementById('messageText').innerText = 'Bem-vindo ao New System 00!';
})();
