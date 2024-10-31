javascript:(function() {
    const menu = createMenu();

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(link);

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
            zIndex: '9999',
            maxWidth: '100%',
            boxSizing: 'border-box',
        });

        m.innerHTML = 
            `<div style="display: flex; align-items: center;">
                <img src="https://i.ibb.co/y0LXzcQ/IMG-20241017-WA0216.jpg" style="width: 80px; height: 80px; border-radius: 50%; border: 2px solid #00FF00; margin-right: 10px;">
                <div style="flex-grow: 1; text-align: center;">
                    <h3 style='margin: 0; font-size: 18px; color: white;'>NEW SYSTEM 00</h3>
                    <div style='font-size: 12px; color: #00FF00; margin-top: 3px; display: flex; align-items: center; justify-content: center;'>
                        <i class="fab fa-instagram" style="margin-right: 5px; color: #00FF00;"></i> bot00blaze
                    </div>
                    <div id="hackingMessage" style="font-size: 14px; color: #00FF00; margin-top: 10px;">Bem-vindo ao New System 00</div>
                </div>
                <span id='closeMenu' style="cursor: pointer; font-size: 14px; color: white;">❌</span>
            </div>
            <div id="messageArea" style="margin-top: 10px; padding: 5px; background-color: #333; border-radius: 5px;">
                <p id="messageText" style="margin: 0; font-size: 14px;">Nenhuma mensagem no momento</p>
            </div>`;
        
        return m;
    }

    function toggleMenu(menu, y, x) {
        menu.style.top = `${y}px`;
        menu.style.left = `${x}px`;
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }

    function showMessage(message) {
        const messageText = document.getElementById('messageText');
        messageText.textContent = message;
    }

    function calculateBetAmount() {
        const walletElement = document.querySelector(".wallet .currency");
        const walletText = walletElement ? walletElement.innerText.replace("R$ ", "").replace(",", ".") : "0";
        const walletAmount = parseFloat(walletText);

        if (isNaN(walletAmount)) {
            showMessage("Erro ao ler saldo.");
            return null;
        }

        return (walletAmount * 0.10).toFixed(2);
    }

    function placeBet(prediction) {
        const betInput = document.querySelector('.input-field');
        const betAmount = calculateBetAmount();
        if (betAmount && betInput) {
            betInput.value = betAmount;

            let betButton;
            if (prediction === 'red') {
                betButton = document.querySelector('.red.selected');
            } else if (prediction === 'white') {
                betButton = document.querySelector('.white.selected');
            } else {
                betButton = document.querySelector('.black.selected');
            }

            if (betButton) {
                betButton.click();

                const confirmButton = document.querySelector('.place-bet button');
                if (confirmButton) {
                    confirmButton.click();
                    showMessage("Aposta realizada com sucesso!");
                } else {
                    showMessage("Botão de confirmação não encontrado.");
                }
            } else {
                showMessage("Botão de aposta não encontrado.");
            }
        }
    }

    async function play() {
        const prediction = Math.random() < 0.5 ? 'red' : 'black'; // Exemplo de previsão
        placeBet(prediction);
    }

    function init() {
        setInterval(play, 1000 * 13);
    }

    init();
    showMessage('Bem-vindo ao New System 00!');

})();
