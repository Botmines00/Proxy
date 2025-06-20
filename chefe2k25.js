javascript:(() => {
  const seeResult = () => {
    document.getElementById('corResultado').textContent = 'Buscando resultado...';
    document.getElementById('sugestaoEntrada').textContent = '...';
    
    fetch('https://blaze.bet.br/api/singleplayer-originals/originals/roulette_games/recent/1')
      .then(res => res.json())
      .then(data => {
        console.log("🔎 Dados recebidos da API:", data); // <-- VERIFICAR NO CONSOLE

        if (!data || !data[0] || data[0].color === undefined) {
          document.getElementById('corResultado').textContent = '⚠️ Resultado inválido!';
          document.getElementById('sugestaoEntrada').textContent = '-';
          return;
        }

        const corId = Number(data[0].color);
        let corTexto = 'Desconhecida';
        let sugestao = '-';

        if (corId === 1) {
          corTexto = '🟥 Vermelho';
          sugestao = '⬛ Apostar Preto';
        } else if (corId === 2) {
          corTexto = '⬛ Preto';
          sugestao = '🟥 Apostar Vermelho';
        } else if (corId === 0) {
          corTexto = '⬜ Branco';
          sugestao = '🟥 Ou ⬛ Apostar Vermelho ou Preto';
        }

        document.getElementById('corResultado').textContent = `Resultado: ${corTexto}`;
        document.getElementById('sugestaoEntrada').textContent = `Sugestão: ${sugestao}`;
      })
      .catch((err) => {
        console.error('❌ Erro ao buscar resultado:', err);
        document.getElementById('corResultado').textContent = 'Erro ao buscar resultado!';
        document.getElementById('sugestaoEntrada').textContent = '';
      });
  };

  const closeMenu = () => {
    document.getElementById('blazeMenu')?.remove();
    clearInterval(timerCheck);
  };

  if (document.getElementById('blazeMenu')) document.getElementById('blazeMenu').remove();

  const style = document.createElement('style');
  style.textContent = `
    #blazeMenu {
      position: fixed; top: 100px; left: 20px; width: 220px;
      background: #1e1e1e; padding: 10px; z-index: 99999;
      border-radius: 10px; box-shadow: 0 0 10px #00ff00;
      font-family: 'Segoe UI', sans-serif; color: #fff;
    }
    #blazeMenu h3 {
      margin: 0 0 5px; position: relative;
      text-align: center; color: #54eb00;
      font-size: 14px;
      user-select: none;
    }
    #blazeMenu h3 .closeBtn {
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      color: #ff4444;
      font-weight: bold;
      font-size: 16px;
      padding: 0 6px;
      border-radius: 50%;
      line-height: 1;
      user-select: none;
      transition: background-color 0.2s;
    }
    #blazeMenu h3 .closeBtn:hover {
      background-color: #ff0000;
      color: #fff;
    }
    #blazeMenu button {
      display: block; width: 100%; margin: 5px 0; padding: 8px;
      background: #54eb00; border: none; border-radius: 5px;
      font-weight: bold; font-size: 12px; cursor: pointer;
      color: #000; transition: 0.2s;
    }
    #blazeMenu button:hover {
      background: #76ff33;
    }
    #corResultado, #sugestaoEntrada {
      background: #111; color: #fff;
      padding: 6px; margin-top: 5px;
      text-align: center; border-radius: 5px;
      font-size: 12px;
    }
    #blazeMenu .dev {
      text-align: center; margin-top: 5px; font-size: 11px;
      color: #aaa;
    }
  `;
  document.head.appendChild(style);

  const menu = document.createElement('div');
  menu.id = 'blazeMenu';
  menu.innerHTML = `
    <h3>
      🤖 Chefe - 2k25
      <span class="closeBtn" title="Fechar menu">×</span>
    </h3>
    <button id="btnIdentificarCor">🎯 Identificar Cor</button>
    <div id="corResultado">Resultado: ?</div>
    <div id="sugestaoEntrada">Sugestão: -</div>
    <div class="dev">By: Allan Santos</div>
  `;
  document.body.appendChild(menu);

  document.querySelector('#blazeMenu .closeBtn').addEventListener('click', closeMenu);
  document.getElementById('btnIdentificarCor').addEventListener('click', seeResult);

  const timerCheck = setInterval(() => {
    const timeSpan = document.querySelector('#roulette-timer .time-left span');
    if (!timeSpan) return;
    const timeText = timeSpan.textContent.trim();
    if (timeText === '00:00' || timeText === '' || timeText === '0:00') {
      seeResult();
    }
  }, 1000);
})();
