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
            --border-purple: #800080; /* Cor da borda roxa */
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
            border: 4px solid var(--border-purple); /* Bordas em roxo */
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
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <div class="colorIndicator" id="predictedColor">Previsão de Cor: <span id="colorValue"></span></div>
                    <div class="chance" id="chanceValue">Chance: <span id="chancePercentage"></span>%</div>
                    <div class="percent" id="percentValue">Acurácia: <span id="accuracyPercentage"></span>%</div>
                </div>
            </div>
        </div>
    </div>
`;

// Adiciona o menu ao corpo
document.body.appendChild(floatingMenu);

// Mostra o menu ao clicar duas vezes
let doubleClickTimer;
document.addEventListener('dblclick', function() {
    if (doubleClickTimer) {
        clearTimeout(doubleClickTimer);
        doubleClickTimer = null;
        floatingMenu.classList.toggle('show');
    } else {
        doubleClickTimer = setTimeout(function() {
            doubleClickTimer = null;
        }, 300);
    }
});
