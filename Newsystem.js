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
            top: '30%',
            left: '30%',
            width: '350px',
            background: '#1e1e1e',
            color: '#fff',
            padding: '10px',
            borderRadius: '8px',
            border: '2px solid #fe5f2f',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            display: 'none',
            zIndex: '9999',
            display: 'flex',
            alignItems: 'center',
            minHeight: '100px',
            overflow: 'hidden'
        });

        m.innerHTML = `
            <img src="https://i.ibb.co/6r4yRDT/Proxy-sha-256-20241010-125036-0000.jpg" style="width: 80px; height: 80px; border-radius: 50%; border: 2px solid #fe5f2f; margin-right: 15px;">
            <div style="flex: 1; display: flex; justify-content: space-between; align-items: center;">
                <h3 style='margin: 0; padding: 0; font-size: 18px;'>New System 00 <i class="fas fa-check-circle" style="color: #fe5f2f;"></i></h3>
                <span id='closeMenu' style="cursor: pointer; font-size: 24px; color: white;">X</span>
            </div>
            <div style='margin-left: 10px; font-size: 14px; display: flex; align-items: center;'>
                <i class="fas fa-cogs"></i> SHA256 | <i class="fas fa-info-circle"></i> Versão: 4.0
            </div>
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
})();
