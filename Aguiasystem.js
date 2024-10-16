// Criação e estilização do menu flutuante
const floatingMenu = document.createElement('div');
floatingMenu.innerHTML = `
    <style>
        #floatingMenu {
            position: fixed;
            top: 20px;
            right: 20px;
            width: 200px; /* Largura reduzida */
            padding: 5px; /* Padding reduzido */
            background-color: #0f1923; /* Cor de fundo do menu */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border: 2px solid #e81538; /* Cor da borda do menu */
            border-radius: 8px;
            font-family: Arial, sans-serif;
            font-size: 12px; /* Tamanho da fonte reduzido */
            z-index: 9999;
            display: none;
        }

        #floatingMenu.show {
            display: block;
        }

        #menuContent {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .round-image {
            width: 60px; /* Tamanho da imagem aumentado */
            height: 60px; /* Tamanho da imagem aumentado */
            border-radius: 50%;
            border: 2px solid #e81538; /* Cor da borda da imagem */
            margin-bottom: 5px; /* Margem reduzida */
        }

        #hackContent span {
            display: block;
            margin: 2px 0; /* Margem reduzida */
            color: #fff; /* Cor do texto em branco */
        }

        .chance, .percent, .colorIndicator {
            font-size: 11px; /* Tamanho do texto reduzido */
        }

        .percent {
            color: #2ecc71; /* Cor verde para a porcentagem */
        }

        .colorIndicator {
            font-size: 14px; /* Indicador de cor levemente maior */
        }

        /* Nova classe para ajustar o estilo do host */
        .host {
            display: inline; /* Exibe na mesma linha */
            margin-left: 5px; /* Adiciona margem à esquerda */
        }

        /* Classe para alterar a cor do Bot */
        .bot-username {
            color: red; /* Cor vermelha para o @Bot00Blaze */
        }
    </style>

    <div id="floatingMenu">    
        <div id="menuContent">
            <img class="round-image" id="botImage" alt="Imagem do Bot" src="https://i.ibb.co/YTZt4pq/IMG-20240801-WA0174.jpg" />
            <div id="hackContent">
                <span><strong>ÁGUIA SYSTEM - </strong><span class="bot-username">@Aguia_blaze</span></span>
                <span><strong>HOST:</strong> <span id="host" class="host"></span></span> <!-- Exibe o host na mesma linha -->
                <span id="hackingMessage"></span>
                <span id="jsonResult"></span>
                <div style="display: flex; align-items: center; gap: 5px;">
                    <span class="chance"><strong>Chance:</strong></span>
                    <span class="percent" style="color: #2ecc71;">99.99%</span>
                </div>
                <div style="display: flex; align-items: center; gap: 5px;">
                    Entrar no:<span class="colorIndicator">🔴</span>
                </div>
            </div>
        </div>
    </div>
`;

// Adiciona o menu ao corpo da página
document.body.appendChild(floatingMenu);

// Exibe o host atual
document.getElementById("host").innerText = document.location.host;

// Define mensagens de hacking
const hackingMessages = [
    "Identificando cor...",
    "Extraindo informações...",
    "Acessando banco de dados...",
    "Injetando código malicioso...",
    "Desativando firewall...",
    "Acessando arquivos...",
    "Enviando informações..."
];
let currentMessageIndex = 0;
const hackingMessageElement = document.getElementById('hackingMessage');
hackingMessageElement.innerText = hackingMessages[currentMessageIndex]; // Exibe a primeira mensagem

// Função para alterar as mensagens de hacking
function changeHackingMessage() {
    currentMessageIndex = (currentMessageIndex + 1) % hackingMessages.length; // Atualiza o índice da mensagem
    hackingMessageElement.innerText = hackingMessages[currentMessageIndex]; // Altera a mensagem
}

setInterval(changeHackingMessage, 3000); // Altera a mensagem a cada 3 segundos

let lastColor;

// Função para processar o resultado da API
function processResult(apiResult) {
    if (apiResult.status === "rolling") {
        const colorSymbol = apiResult.color === 0 ? '⚪️' : apiResult.color === 1 ? '🔴' : '⚫';
        document.getElementById('hackingMessage').style.display = "block";
        document.getElementById("jsonResult").style.display = "block";

        // Mantém a chance visível
        document.querySelector(".chance").style.display = "flex";
        document.querySelector(".percent").style.display = "flex";
        document.querySelector(".colorIndicator").style.display = 'none';
    } else if (apiResult.status === "complete") {
        document.getElementById("jsonResult").style.display = "none";
        document.getElementById("hackingMessage").style.display = 'block'; // Mantém a mensagem de hacking visível

        // Buscar histórico de análises
        fetch("https://blaze.com/api/roulette_games/history_analytics?n=3000")
            .then(response => response.json())
            .then(data => {
                const matchingPercent = data.rolls_info
                    .map(rollInfo => rollInfo.roll === apiResult.roll ? rollInfo.percent : null)
                    .filter(percent => percent !== null)[0];
                document.querySelector('.percent').innerText = `${90 + parseFloat(matchingPercent)}%`;
            });

        const colorOptions = ['⚫', '🔴', '⚪️'];
        let selectedColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];

        // Evita selecionar '⚪️' duas vezes seguidas
        if (selectedColor === '⚪️') {
            selectedColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
            selectedColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        }

        lastColor = selectedColor === '🔴' ? 1 : selectedColor === '⚫' ? 2 : 0;
        document.querySelector(".colorIndicator").innerText = selectedColor;
        document.querySelector('.chance').style.display = "flex";
        document.querySelector(".percent").style.display = "flex";
        document.querySelector(".colorIndicator").style.display = 'flex';
    }
}

let status = "rolling";
async function play() {
    const data = {
        "status": status === "rolling" ? "complete" : "rolling",
        "color": Math.floor(Math.random() * 3),
        "roll": 0
    };
    status = data.status;
    processResult(data);
}

function init() {
    setInterval(play, 1000 * 13);
}

init();

// Ajusta o tamanho da imagem para telas menores
if (window.innerWidth < 768) { // 0x300 em hexadecimal é 768 em decimal
    document.querySelectorAll("#botImage").forEach(function (img) {
        img.width = 250; // 0xfa em hexadecimal é 250
        img.height = 200; // 0xc8 em hexadecimal é 200
    });
}

// Alterna o menu flutuante com a tecla F9
document.addEventListener('keyup', function (event) {
    if (event.key === 'F9') {
        const floatingMenuElement = document.getElementById("floatingMenu");
        floatingMenuElement.classList.toggle("show");
    }
});

// Alterna o menu flutuante com clique duplo
document.addEventListener('dblclick', function () {
    const floatingMenuElement = document.getElementById("floatingMenu");
    floatingMenuElement.classList.toggle("show");
});
