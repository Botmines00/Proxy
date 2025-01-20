javascript:(function() {
    console.log("Script iniciado...");

    const results = [];

    function captureResult(result) {
        console.log("Resultado capturado:", result);

        // Verificar se a roleta terminou
        if (!verificarFimDoGiro()) {
            console.log("A roleta ainda está girando...");
            return;
        }

        results.push(result);

        if (results.length > 2880) results.shift();

        predictColor(result);
    }

    function verificarFimDoGiro() {
        const roletaStatus = document.querySelector('.roleta-status'); // Ajuste o seletor conforme necessário.
        console.log("Status da roleta:", roletaStatus ? roletaStatus.innerText : "não encontrado");
        return !roletaStatus || roletaStatus.innerText.trim() !== 'Girando...';
    }

    function predictColor(result) {
        console.log("Analisando previsão...");
        const resultNumber = parseInt(result, 10);
        let color = '';

        if (resultNumber === 0) {
            color = 'white'; // Branco
        } else if (resultNumber >= 1 && resultNumber <= 7) {
            color = 'green'; // Verde
        } else if (resultNumber >= 8 && resultNumber <= 14) {
            color = 'black'; // Preto
        }

        const prediction = document.querySelector('#predictionColor'); // Ajuste o seletor.
        if (!prediction) {
            console.log("Nenhuma previsão encontrada.");
            return;
        }

        const predictedColor = prediction.innerText.trim().toLowerCase();

        // Comparar previsão com resultado
        if (predictedColor === color) {
            console.log("Previsão correta:", color);
            exibirMensagem('Win!', 'win');
        } else {
            console.log("Previsão incorreta:", predictedColor, "vs", color);
            exibirMensagem('Loss!', 'loss');
        }
    }

    function exibirMensagem(texto, classe) {
        console.log("Exibindo mensagem:", texto);

        let mensagem = document.getElementById('resultMessage');

        if (!mensagem) {
            console.log("Criando elemento de mensagem...");
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

    console.log("Monitorando resultados...");

    // Monitorar resultados
    const observer = new MutationObserver(() => {
        const result = document.querySelector('.roleta-resultado'); // Ajuste o seletor conforme necessário.
        if (result) {
            const resultText = result.innerText.trim();
            console.log("Resultado detectado:", resultText);
            if (!isNaN(resultText)) {
                captureResult(resultText);
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
