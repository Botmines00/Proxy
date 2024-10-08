// Função para manipular o login
function handleLogin() {
    const storedData = JSON.parse(localStorage.getItem("xHwkxqasw"));
    const storedUsername = atob(storedData._resu);
    const storedPassword = atob(storedData._drowssap);

    const inputUsername = document.getElementById("loginUsername").value;
    const inputPassword = document.getElementById("loginPassword").value;

    if (inputUsername === storedUsername && inputPassword === storedPassword) {
        document.getElementById('loginForm').style.display = "none";
        document.getElementById("hackContent").style.display = "block";
        alert("Login bem-sucedido! Pressione F9 para alternar o Hack.");
    } else {
        document.getElementById("loginMessage").innerText = "Login inválido!";
    }
}

// Criação e estilização do menu flutuante
const floatingMenu = document.createElement('div');
floatingMenu.innerHTML = `
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

        /* Variáveis de Cores para Facilitar Manutenção */
        :root {
            --background-dark: #1a1a1a;
            --primary-red: #e74c3c;
            --secondary-red: #c0392b;
            --accent-red: #ff4757;
            --text-light: #ecf0f1;
            --border-red: #ff6b81;
            --shadow-red: rgba(231, 76, 60, 0.6);
            --glow-red: rgba(231, 76, 60, 0.8);
        }

        .round-image {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            object-fit: cover;
            border: 4px solid var(--primary-red); /* Aumentada a espessura da borda */
            box-shadow: 0 0 15px var(--shadow-red); /* Adicionada sombra para realçar */
            margin-bottom: 20px;
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .round-image:hover {
            transform: scale(1.05);
            box-shadow: 0 0 20px var(--glow-red); /* Sombra mais intensa no hover */
        }

        #floatingMenu {
            width: 350px;
            max-width: 90%;
            display: none; /* Inicialmente oculto */
            position: fixed;
            top: 20px;
            left: 20px;
            background: var(--background-dark);
            color: var(--text-light);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.7); /* Sombra mais pronunciada */
            z-index: 1000;
            border: 4px solid var(--primary-red); /* Aumentada a espessura da borda */
            border-radius: 10px;
            font-family: 'Roboto', sans-serif;
            overflow: hidden;
            transition: all 0.3s ease-in-out;
        }

        /* Classe para exibir o menu */
        #floatingMenu.show {
            display: block;
            animation: slideIn 0.5s forwards;
        }

        @keyframes slideIn {
            from { opacity: 0; transform: translateX(-150px); }
            to { opacity: 1; transform: translateX(0); }
        }

        #menuContent {
            padding: 20px;
        }

        #loginForm, #hackContent {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        label {
            font-weight: 500;
            margin-bottom: 5px;
            color: var(--text-light);
            border-bottom: 2px solid var(--primary-red); /* Bordas inferiores mais espessas */
            padding-bottom: 3px;
        }

        input[type="text"], input[type="password"] {
            padding: 12px;
            border: 3px solid var(--border-red); /* Bordas mais espessas */
            border-radius: 5px;
            font-size: 1rem;
            outline: none;
            background: #2c2c2c;
            color: var(--text-light);
            transition: border 0.3s, background 0.3s;
        }

        input[type="text"]:focus, input[type="password"]:focus {
            border: 3px solid var(--primary-red);
            background: #3a3a3a;
        }

        button {
            padding: 14px;
            background-color: var(--primary-red);
            border: 3px solid var(--primary-red); /* Bordas mais espessas */
            border-radius: 5px;
            color: #fff;
            font-size: 1.1rem;
            cursor: pointer;
            transition: background-color 0.3s, transform 0.2s, border 0.3s;
        }

        button:hover {
            background-color: var(--secondary-red);
            border: 3px solid var(--secondary-red); /* Borda vermelha no hover */
            transform: translateY(-3px);
        }

        #loginMessage {
            font-size: 1rem;
            text-align: center;
            color: var(--accent-red);
            border: 2px solid var(--accent-red); /* Bordas vermelhas */
            padding: 6px;
            border-radius: 5px;
            background: rgba(231, 76, 60, 0.1); /* Fundo sutil para destaque */
        }

        #hackContent span, #hackContent code {
            display: block;
            margin-bottom: 12px;
            font-size: 1.1rem;
            color: var(--text-light);
            border-left: 4px solid var(--primary-red); /* Bordas esquerdas mais espessas */
            padding-left: 12px;
            transition: border-left 0.3s;
        }

        .chance, .result {
            font-weight: 500;
            border: 2px solid var(--primary-red); /* Bordas vermelhas */
            padding: 8px;
            border-radius: 5px;
            background: rgba(231, 76, 60, 0.1); /* Fundo sutil */
        }

        .percent {
            font-weight: 700;
            border: 2px solid var(--primary-red); /* Bordas vermelhas */
            padding: 8px;
            border-radius: 5px;
            background: rgba(231, 76, 60, 0.1); /* Fundo sutil */
        }

        .colorIndicator {
            font-size: 1.8rem;
            border: 3px solid var(--primary-red); /* Borda vermelha mais espessa */
            padding: 6px;
            border-radius: 5px;
            display: inline-block;
            background: rgba(231, 76, 60, 0.1); /* Fundo sutil */
            transition: border 0.3s, box-shadow 0.3s;
        }

        .colorIndicator:hover {
            box-shadow: 0 0 10px var(--glow-red); /* Sombra de brilho no hover */
        }

        /* Responsividade */
        @media (max-width: 500px) {
            #floatingMenu {
                width: 90%;
                top: 10px;
                left: 5%;
            }

            .round-image {
                width: 100px;
                height: 100px;
            }

            button {
                padding: 12px;
                font-size: 1rem;
            }

            label, #hackContent span, #hackContent code {
                font-size: 1rem;
                padding-left: 8px;
                border-left: 3px solid var(--primary-red);
            }

            .colorIndicator {
                font-size: 1.5rem;
            }
        }
    </style>

    <div id="floatingMenu">    
        <div id="menuContent">
            <img class="round-image" id="botImage" alt="Imagem do Bot" src="https://t.me/i/userpic/320/Bot00blazeofcc.jpg" />
            
            <div id="loginForm">
                <div>
                    <label for="loginUsername">Usuário:</label>
                    <input type="text" id="loginUsername" placeholder="Digite seu usuário"/>
                </div>
                <div>
                    <label for="loginPassword">Senha:</label>
                    <input type="password" id="loginPassword" placeholder="Digite sua senha"/>
                </div>
                <button onclick="handleLogin()">Entrar</button>
                <span id="loginMessage"></span>
            </div>

            <div id="hackContent" style="display: none;">
                <span><strong>Sistema Hacker - </strong><span style="color: var(--primary-red);">@Bot00Blaze</span></span>
                <span><strong>HOST:</strong> <span id="host"></span></span>
                <span id="hackingMessage"></span>
                <span id="jsonResult"></span>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span class="chance"><strong>Chance:</strong></span>
                    <span class="percent" style="color: #2ecc71;">99.99%</span>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    Entrar no <span class="colorIndicator">🔴</span>
                </div>
            </div>
        </div>
    </div>
`;

document.body.appendChild(floatingMenu);

// Inicializa as credenciais de login se não estiverem presentes no localStorage
if (localStorage.getItem("xHwkxqasw") === null) {
    const randomUsername = Math.floor(1000 + Math.random() * 9000).toString();
    const randomPassword = Math.floor(1000 + Math.random() * 9000).toString();

    const encodedUsername = btoa(randomUsername);
    const encodedPassword = btoa(randomPassword);

    localStorage.setItem("xHwkxqasw", JSON.stringify({
        '_resu': encodedUsername,
        '_drowssap': encodedPassword
    }));

    const loginUsernameField = document.getElementById("loginUsername");
    const loginPasswordField = document.getElementById('loginPassword');
    const loginMessageElement = document.getElementById("loginMessage");

    loginUsernameField.value = randomUsername;
    loginPasswordField.type = "text";
    loginPasswordField.value = randomPassword;
    loginMessageElement.innerText = "Salve estas informações!";
    loginMessageElement.style.color = 'green';
}

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

// Função para alterar as mensagens de hacking
function changeHackingMessage() {
    hackingMessageElement.style.opacity = '0';
    setTimeout(function () {
        hackingMessageElement.innerText = hackingMessages[currentMessageIndex];
        hackingMessageElement.style.opacity = '1';
        currentMessageIndex = (currentMessageIndex + 1) % hackingMessages.length;
    }, 500);
}

setInterval(changeHackingMessage, 3000);

let lastColor;

// Função para processar o resultado da API
function processResult(apiResult) {
    if (apiResult.status === "rolling") {
        const colorSymbol = apiResult.color === 0 ? '⚪️' : apiResult.color === 1 ? '🔴' : '⚫';
        document.getElementById('hackingMessage').style.display = "block";
        document.getElementById("jsonResult").style.display = "block";

        document.querySelector(".chance").style.display = 'none';
        document.querySelector(".percent").style.display = "none";
        document.querySelector(".colorIndicator").style.display = 'none';
    } else if (apiResult.status === "complete") {
        document.getElementById("jsonResult").style.display = "none";
        document.getElementById("hackingMessage").style.display = 'none';

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
async function play(){
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
