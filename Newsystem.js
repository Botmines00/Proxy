javascript:(function() {
    const menu = createMenu();

    // Adiciona a folha de estilos
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(link);

    document.body.appendChild(menu);
    document.addEventListener('dblclick', (e) => toggleMenu(menu, e.clientY, e.clientX));

    // Obtém a URL do site onde o script está sendo executado
    const siteURL = window.location.hostname;

    // Cria o menu
    function createMenu() {
        const m = document.createElement('div');
        Object.assign(m.style, {
            position: 'fixed',
            width: '290px', // Largura ajustada para 290px
            background: '#1e1e1e',
            color: '#fff',
            padding: '10px',
            borderRadius: '8px',
            border: '2px solid #00FF00', // Borda do menu em verde
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            display: 'none',
            zIndex: '9999',
            maxWidth: '100%', // Garante que o menu não exceda a tela
            boxSizing: 'border-box', // Garante que o padding e a borda não alterem a largura total
        });

        m.innerHTML = `
            <div style="display: flex; align-items: center;">
                <img src="https://i.ibb.co/6r4yRDT/Proxy-sha-256-20241010-125036-0000.jpg" style="width: 80px; height: 80px; border-radius: 50%; border: 2px solid #00FF00; margin-right: 10px;"> <!-- Borda da imagem em verde -->
                <div style="flex-grow: 1;">
                    <h3 style='margin: 0; font-size: 18px;'>New System 00</h3>
                    <div style='font-size: 14px; margin-top: 5px;'>
                        <i class="fas fa-cogs"></i> SHA256 | <i class="fas fa-info-circle"></i> Versão: 4.0 <i class="fas fa-check" style="color: #00FF00;"></i> <!-- Ícone de verificado em verde -->
                    </div>
                    <div style='font-size: 14px; margin-top: 5px;'>
                        HOST: <span id="hostURL">${siteURL}</span> <!-- Mostra dinamicamente o hostname -->
                    </div>
                </div>
                <span id='closeMenu' style="cursor: pointer; font-size: 24px; color: white;">X</span>
            </div>
        `;
        return m;
    }

    // Função para garantir que o menu sempre abre corretamente
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
})();
