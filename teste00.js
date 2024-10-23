javascript:(function() { 
    const injectStyle = (styleContent) => {
        const styleTag = document.createElement('style');
        styleTag.innerHTML = styleContent;
        document.head.appendChild(styleTag);
    };

    const fetchResults = async () => {
        const response = await fetch('https://blaze1.space/api/roulette_games/history_analytics?n=3000');
        const data = await response.json();
        return data;
    };

    const getPredictedColor = (results) => {
        if (!results || results.length === 0) return "N/A";
        const lastColor = results[results.length - 1].color;
        return lastColor === "red" ? "🔴" : lastColor === "black" ? "⚫" : "⚪";
    };

    const initMenu = async () => {
        const results = await fetchResults();
        const predictedColor = getPredictedColor(results);
        const lastResult = results.length > 0 ? results[results.length - 1].color : 'Nenhum resultado encontrado';

        const menu = document.createElement('div');
        menu.style.position = 'fixed';
        menu.style.top = '20px';
        menu.style.left = '20px';
        menu.style.width = '250px';
        menu.style.backgroundColor = '#333';
        menu.style.color = '#fff';
        menu.style.padding = '10px';
        menu.style.borderRadius = '5px';
        menu.style.zIndex = '9999';
        menu.innerHTML = `
            <h3>Menu Teste</h3>
            <p>Último Resultado: ${lastResult === "red" ? "🔴" : lastResult === "black" ? "⚫" : "⚪"}</p>
            <p>Previsão de Cor: ${predictedColor}</p>
            <button id="closeMenu">Fechar</button>
        `;
        document.body.appendChild(menu);

        document.getElementById('closeMenu').onclick = () => {
            document.body.removeChild(menu);
        };
    };

    injectStyle(`
        body {
            font-family: Arial, sans-serif;
        }
    `);

    initMenu();
})();
