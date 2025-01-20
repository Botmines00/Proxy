javascript:(function() {
    const results = [];

    function captureResult(result) {
        // Verificar se a roleta terminou
        if (!verificarFimDoGiro()) return;

        results.push(result);

        if (results.length > 2880) results.shift();

        predictColor(result);
    }

    function verificarFimDoGiro() {
        const roletaStatus = document.querySelector('.roleta-status'); // Ajuste o seletor conforme o HTML do site.
        return !roletaStatus || roletaStatus.innerText.trim() !== 'Girando...';
    }

    function predictColor(result) {
        const resultNumber = parseInt(result, 10);
        let color = '';

        if (resultNumber === 0) {
            color = 'white'; // Branco
        } else if (resultNumber >= 1 && resultNumber <= 7) {
            color = 'green'; // Verde
        } else if (resultNumber >= 8 && resultNumber <= 14) {
            color = 'black'; // Preto
        }

        const prediction = document.querySelector('#predictionColor'); // Ajuste o seletor para o local correto da previsão
        if (!prediction) return;

        const predictedColor = prediction.innerText.trim().toLowerCase();

        // Comparar previsão com resultado
        if (predictedColor === color) {
            exibirMensagem('Win!', 'win');
        } else {
            exibirMensagem('Loss!', 'loss');
        }
    }

    function exibirMensagem(texto, classe) {
        let mensagem = document.getElementById('resultMessage');

        if (!mensagem) {
            mensagem = document.createElement('div');
            mensagem.id = 'resultMessage';
            document.body.appendChild(mensagem);
        }

        mensagem.innerText = texto;
        mensagem.className = classe;

        // Remover mensagem após 6 segundos
        setTimeout(() => {
            mensagem.innerText = '';
            mensagem.className = '';
        }, 6000);
    }

    // Estilos para a mensagem
    const style = document.createElement('style');
    style.innerText = `
        #resultMessage {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            z-index: 9999;
            transition: all 0.5s ease;
        }
        #resultMessage.win {
            background-color: rgba(72, 255, 79, 0.8);
            color: white;
            border: 2px solid green;
        }
        #resultMessage.loss {
            background-color: rgba(255, 72, 72, 0.8);
            color: white;
            border: 2px solid red;
        }
    `;
    document.head.appendChild(style);

    // Monitorar resultados
    const observer = new MutationObserver(() => {
        const result = document.querySelector('.roleta-resultado'); // Ajuste o seletor ao HTML do site.
        if (result) {
            const resultText = result.innerText.trim();
            if (!isNaN(resultText)) {
                captureResult(resultText);
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
