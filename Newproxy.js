javascript:(async function() {
    const apiUrls = {
        current: 'https://blaze1.space/api/singleplayer-originals/originals/roulette_games/current/1',
        recent: 'https://blaze1.space/api/singleplayer-originals/originals/roulette_games/recent/1'
    };

    const menu = createMenu();
    document.body.appendChild(menu);
    document.addEventListener('dblclick', (e) => toggleMenu(menu, e.clientY, e.clientX));

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
            zIndex: '9999'
        });

        m.innerHTML = `
            <div style="display: flex; align-items: center;">
                <img src="https://i.ibb.co/y0LXzcQ/IMG-20241017-WA0216.jpg" style="width: 80px; height: 80px; border-radius: 50%; margin-right: 10px;">
                <div style="flex-grow: 1; text-align: center;">
                    <h3 style='margin: 0; font-size: 18px;'>NEW SYSTEM 00</h3>
                    <div style='font-size: 12px; color: #00FF00;'>bot00blaze</div>
                </div>
                <span id='closeMenu' style="cursor: pointer; font-size: 14px;">❌</span>
            </div>
            <div style="margin-top: 10px; text-align: center;">
                <div style="font-size: 14px;">Entrar no:</div>
                <span id="colorIndicator"></span>
                <div id="statusMessage" style="font-size: 14px; margin-top: 5px;"></div>
                <div id="winMessage" style="font-size: 14px; color: green; font-weight: bold; display: none;"></div>
            </div>
        `;
        return m;
    }

    function toggleMenu(menu, y, x) {
        menu.style.top = `${y}px`;
        menu.style.left = `${x}px`;
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }

    document.getElementById('closeMenu').addEventListener('click', () => menu.style.display = 'none');

    async function fetchColorPrediction() {
        try {
            const response = await fetch(apiUrls.current);
            const data = await response.json();
            return data.color; // Cor da previsão (0, 1, 2)
        } catch (error) {
            console.error("Erro ao buscar dados da API:", error);
            return Math.floor(Math.random() * 3); // Gera uma cor aleatória caso falhe
        }
    }

    async function fetchLatestResult() {
        try {
            const response = await fetch(apiUrls.recent);
            const data = await response.json();
            return data.result; // Retorna o último resultado da roleta
        } catch (error) {
            console.error("Erro ao buscar resultado recente:", error);
            return null;
        }
    }

    function updateColorIndicator(colorSymbol) {
        const colorIndicator = document.getElementById("colorIndicator");
        if (colorSymbol === 0) {
            colorIndicator.innerText = '⚪️'; // Cor branca
        } else if (colorSymbol === 1) {
            colorIndicator.innerText = '🔴'; // Cor vermelha
        } else {
            colorIndicator.innerText = '⚫️'; // Cor preta
        }
    }

    async function initPredictionLoop() {
        setInterval(async () => {
            const colorPrediction = await fetchColorPrediction();
            updateColorIndicator(colorPrediction);

            const result = await fetchLatestResult();
            if (result !== null) {
                const statusMessage = document.getElementById('statusMessage');
                const resultColor = result.color;
                const predictedColor = colorPrediction;

                const winMessage = document.getElementById('winMessage');
                if (predictedColor === resultColor) {
                    statusMessage.innerHTML = `Status: Win! > ${result.number}`;
                    winMessage.style.color = 'green';
                    winMessage.style.display = 'block';
                } else {
                    statusMessage.innerHTML = `Status: Lose! > ${result.number}`;
                    winMessage.style.color = 'red';
                    winMessage.style.display = 'none';
                }
            }
        }, 13000);
    }

    initPredictionLoop();
})();
