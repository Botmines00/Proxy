// Função para manipular o login
function handleLogin() {
    const storedData = JSON.parse(localStorage.getItem("xHwkxqasw"));
    const storedUsername = atob(storedData._resu);
    const storedPassword = atob(storedData._drowssap);

    const inputUsername = document.getElementById("loginUsername").value;
    const inputPassword = document.getElementById("loginPassword").value;

    if (inputUsername === storedUsername && inputPassword === inputPassword) {
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

        /* Variáveis de Cores */
        :root {
            --background-dark: #1a1a1a;
            --primary-purple: #A901DB;
            --text-light: #ecf0f1;
            --shadow-purple: rgba(169, 1, 219, 0.6);
            --glow-purple: rgba(169, 1, 219, 0.8);
        }

        .round-image {
            width: 100px; /* Reduzi o tamanho */
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid var(--primary-purple); /* Cor alterada */
            box-shadow: 0 0 10px var(--shadow-purple);
            margin-bottom: 15px; /* Reduzi o espaçamento */
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .round-image:hover {
            transform: scale(1.05);
            box-shadow: 0 0 20px var(--glow-purple);
        }

        #floatingMenu {
            width: 300px; /* Reduzi o tamanho */
            max-width: 80%;
            display: none;
            position: fixed;
            top: 20px;
            left: 20px;
            background: var(--background-dark);
            color: var(--text-light);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.7);
            z-index: 1000;
            border: 3px solid var(--primary-purple); /* Cor alterada */
            border-radius: 10px;
            font-family: 'Roboto', sans-serif;
            overflow: hidden;
            transition: all 0.3s ease-in-out;
        }

        /* Animação para exibir o menu */
        #floatingMenu.show {
            display: block;
            animation: slideIn 0.5s forwards;
        }

        @keyframes slideIn {
            from { opacity: 0; transform: translateX(-150px); }
            to { opacity: 1; transform: translateX(0); }
        }

        #menuContent {
            padding: 15px; /* Reduzi o espaçamento */
        }

        #loginForm, #hackContent {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        label {
            font-weight: 500;
            margin-bottom: 5px;
            color: var(--text-light);
            border-bottom: 2px solid var(--primary-purple); /* Cor alterada */
            padding-bottom: 3px;
        }

        input[type="text"], input[type="password"] {
            padding: 10px; /* Reduzi o padding */
            border: 2px solid var(--primary-purple); /* Cor alterada */
            border-radius: 5px;
            font-size: 1rem;
            outline: none;
            background: #2c2c2c;
            color: var(--text-light);
            transition: border 0.3s, background 0.3s;
        }

        input[type="text"]:focus, input[type="password"]:focus {
            border: 2px solid var(--primary-purple); /* Cor alterada */
            background: #3a3a3a;
        }

        button {
            padding: 12px; /* Reduzi o padding */
            background-color: var(--primary-purple); /* Cor alterada */
            border: 2px solid var(--primary-purple); /* Cor alterada */
            border-radius: 5px;
            color: #fff;
            font-size: 1rem; /* Reduzi o tamanho da fonte */
            cursor: pointer;
            transition: background-color 0.3s, transform 0.2s, border 0.3s;
        }

        button:hover {
            background-color: #8a01b3;
            border: 2px solid #8a01b3; /* Cor roxa mais escura */
            transform: translateY(-3px);
        }

        #loginMessage {
            font-size: 0.9rem; /* Reduzi o tamanho da fonte */
            text-align: center;
            color: var(--primary-purple); /* Cor alterada */
            border: 2px solid var(--primary-purple); /* Cor alterada */
            padding: 5px;
            border-radius: 5px;
            background: rgba(169, 1, 219, 0.1); /* Fundo sutil roxo */
        }

        #hackContent span, #hackContent code {
            display: block;
            margin-bottom: 10px;
            font-size: 1rem;
            color: var(--text-light);
            border-left: 3px solid var(--primary-purple); /* Cor alterada */
            padding-left: 10px;
            transition: border-left 0.3s;
        }

        .chance, .result, .percent {
            font-weight: 500;
            border: 2px solid var(--primary-purple); /* Cor alterada */
            padding: 6px; /* Reduzi o padding */
            border-radius: 5px;
            background: rgba(169, 1, 219, 0.1); /* Fundo sutil roxo */
        }

        .colorIndicator {
            font-size: 1.5rem; /* Reduzi o tamanho da fonte */
            border: 2px solid var(--primary-purple); /* Cor alterada */
            padding: 5px;
            border-radius: 5px;
            display: inline-block;
            background: rgba(169, 1, 219, 0.1); /* Fundo sutil roxo */
            transition: border 0.3s, box-shadow 0.3s;
        }

        .colorIndicator:hover {
            box-shadow: 0 0 10px var(--glow-purple);
        }

        /* Responsividade */
        @media (max-width: 500px) {
            #floatingMenu {
                width: 80%;
                top: 10px;
                left: 10px;
            }

            .round-image {
                width: 80px; /* Tamanho reduzido para telas pequenas */
                height: 80px;
            }

            button {
                padding: 10px;
                font-size: 0.9rem; /* Fonte menor para telas pequenas */
            }

            label, #hackContent span, #hackContent code {
                font-size: 0.9rem;
                padding-left: 8px;
            }

            .colorIndicator {
                font-size: 1.3rem;
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
                <span><strong>Sistema Hacker - </strong><span style="color: var(--primary-purple);">@Bot00Blaze</span></span>
                <span><strong>HOST:</strong> <span id="host"></span></span>
                <span id="hackingMessage"></span>
                <span id="jsonResult"></span>
                <div style="display: flex; align-items: center; gap: 10px; justify-content: center;">
                    <div class="colorIndicator" id="colorIndicator"></div>
                    <code id="accuracyIndicator"></code>
                </div>
            </div>
        </div>
    </div>
`;

// Função para alternar a visibilidade do menu
document.addEventListener('keydown', function (e) {
    if (e.key === 'F9') {
        floatingMenu.classList.toggle('show');
    }
});

// Adiciona o menu ao corpo do documento
document.body.appendChild(floatingMenu);
