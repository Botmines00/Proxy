javascript:(function() {
    // Criação e adição do menu no corpo do documento
    const menu = createMenu();

    // Adiciona a folha de estilos do Font Awesome para ícones
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(link);

    document.body.appendChild(menu);

    // Evento para abrir o menu com dois cliques
    document.addEventListener('dblclick', (e) => toggleMenu(menu, e.clientY, e.clientX));

    // Atribui o elemento da previsão após o menu ser adicionado ao DOM
    const colorIndicatorElement = document.querySelector('.colorIndicator');

    // Função de criação do menu com previsão de cor
    function createMenu() {
        const m = document.createElement('div');
        m.style.cssText = `
            position: fixed; top: 20px; left: 20px; width: 250px; background-color: black; 
            padding: 15px; color: white; font-family: Arial, sans-serif; border-radius: 8px; 
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); z-index: 9999;
        `;
        m.innerHTML = `
            <div style="display: flex; align-items: center;">
                <img src="https://i.ibb.co/y0LXzcQ/IMG-20241017-WA0216.jpg" 
                     style="width: 80px; height: 80px; border-radius: 50%; border: 2px solid #00FF00; margin-right: 10px;">
                <div style="flex-grow: 1; text-align: center;">
                    <h3 style='margin: 0; font-size: 18px; color: white;'>NEW SYSTEM 00</h3>
                    <div style='font-size: 12px; color: #00FF00; margin-top: 3px; display: flex; align-items: center; justify-content: center;'>
                        <i class="fab fa-instagram" style="margin-right: 5px; color: #00FF00;"></i>
                        bot00blaze
                    </div>
                    <div id="hackingMessage" style="font-size: 14px; color: #00FF00; margin-top: 10px;">
                        Bem-vindo ao New System 00
                    </div>
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
        `;
        return m;
    }

    // Função para mostrar ou ocultar o menu
    function toggleMenu(menu, y, x) {
        if (menu.style.display === 'none' || !menu.style.display) {
            menu.style.display = 'block';
            menu.style.top = `${y}px`;
            menu.style.left = `${x}px`;
        } else {
            menu.style.display = 'none';
        }
    }

    // Fechar o menu ao clicar no botão de fechar
    document.getElementById('closeMenu').addEventListener('click', () => {
        menu.style.display = 'none';
    });

    // Função para atualizar a cor da previsão no menu
    function processResult(apiResult) {
        const colorSymbol = apiResult.color;
        const displayColorSymbol = colorSymbol === 0 ? '⚪️' : colorSymbol === 1 ? '🔴' : '⚫️';
        if (colorIndicatorElement) {
            colorIndicatorElement.innerText = displayColorSymbol;
        }
    }

    // Simulação do resultado para fins de teste
    setInterval(() => {
        const mockApiResult = {
            color: Math.floor(Math.random() * 3) // Gera aleatoriamente 0, 1 ou 2 (para ⚪️, 🔴 ou ⚫️)
        };
        processResult(mockApiResult);
    }, 3000);

})();
