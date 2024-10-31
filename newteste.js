javascript:(function() {
    const menu = createMenu();

    // Adiciona a folha de estilos do Font Awesome para ícones
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(link);

    document.body.appendChild(menu);

    // Evento para abrir o menu com dois cliques
    document.addEventListener('dblclick', (e) => toggleMenu(menu, e.clientY, e.clientX));

    const colorIndicatorElement = document.querySelector('.colorIndicator');

    function createMenu() {
        const m = document.createElement('div');
        m.style.cssText = `
            position: fixed; top: 20px; left: 20px; width: 200px; background-color: black; 
            padding: 15px; color: white; font-family: Arial, sans-serif; border-radius: 8px; 
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); z-index: 9999; display: none;
        `;
        m.innerHTML = `
            <div style="display: flex; align-items: center;">
                <img src="https://i.ibb.co/y0LXzcQ/IMG-20241017-WA0216.jpg" 
                     style="width: 50px; height: 50px; border-radius: 50%; border: 2px solid #00FF00; margin-right: 10px;">
                <div style="flex-grow: 1; text-align: center;">
                    <h3 style='margin: 0; font-size: 16px; color: white;'>NEW SYSTEM 00</h3>
                    <div style='font-size: 12px; color: #00FF00; margin-top: 3px;'>bot00blaze</div>
                </div>
                <span id='closeMenu' style="cursor: pointer; font-size: 14px; color: white;">❌</span>
            </div>
            <div style="margin-top: 10px; text-align: center;">
                Entrar no: <span class="colorIndicator" style="font-weight: bold;">🔴</span>
            </div>
            <div style="margin-top: 10px; font-size: 10px; color: #00FF00; text-align: center;">
                SHA256 | Versão: 4.0
            </div>
        `;
        return m;
    }

    function toggleMenu(menu, y, x) {
        if (menu.style.display === 'none' || !menu.style.display) {
            menu.style.display = 'block';
            menu.style.top = `${y}px`;
            menu.style.left = `${x}px`;
        } else {
            menu.style.display = 'none';
        }
    }

    document.getElementById('closeMenu').addEventListener('click', () => {
        menu.style.display = 'none';
    });

    function processResult(apiResult) {
        const colorSymbol = apiResult.color;
        const displayColorSymbol = colorSymbol === 0 ? '⚪️' : colorSymbol === 1 ? '🔴' : '⚫️';
        if (colorIndicatorElement) {
            colorIndicatorElement.innerText = displayColorSymbol;
        }

        // Chamada para fazer a entrada automática com base na cor
        makeAutomaticEntry(colorSymbol);
    }

    // Função para fazer entradas automáticas
    function makeAutomaticEntry(colorSymbol) {
        let buttonSelector;
        
        // Defina os seletores de botão corretos para cada cor
        switch (colorSymbol) {
            case 0: // Cor branca
                buttonSelector = '.botao-branco';
                break;
            case 1: // Cor vermelha
                buttonSelector = '.botao-vermelho';
                break;
            case 2: // Cor preta
                buttonSelector = '.botao-preto';
                break;
        }
        
        // Realiza o clique automático no botão correspondente
        const button = document.querySelector(buttonSelector);
        if (button) {
            button.click();
        } else {
            console.log("Botão de entrada não encontrado para a cor:", colorSymbol);
        }
    }

    // Simulação do resultado para fins de teste
    setInterval(() => {
        const mockApiResult = {
            color: Math.floor(Math.random() * 3)
        };
        processResult(mockApiResult);
    }, 3000);

})();
