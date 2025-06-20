(() => {
  // Cores
  const coresMap = {
    0: { nome: '⬜ Branco', sugestao: '🟥 Ou ⬛ Apostar Vermelho ou Preto' },
    1: { nome: '🟥 Vermelho', sugestao: '⬛ Apostar Preto' },
    2: { nome: '⬛ Preto', sugestao: '🟥 Apostar Vermelho' },
  };

  // Criar estilo
  const style = document.createElement('style');
  style.textContent = `
    #blazeMenu {
      position: fixed; top: 100px; left: 20px; width: 220px;
      background: #1e1e1e; padding: 10px; z-index: 99999;
      border-radius: 10px; box-shadow: 0 0 10px #00ff00;
      font-family: 'Segoe UI', sans-serif; color: #fff;
    }
    #blazeMenu h3 {
      margin: 0 0 5px; text-align: center; color: #54eb00; font-size: 14px;
    }
    #blazeMenu button {
      width: 100%; margin: 5px 0; padding: 8px;
      background: #54eb00; border: none; border-radius: 5px;
      font-weight: bold; font-size: 12px; cursor: pointer; color: #000;
    }
    #corResultado, #sugestaoEntrada {
      background: #111; color: #fff;
      padding: 6px; margin-top: 5px;
      text-align: center; border-radius: 5px; font-size: 12px;
    }
    #blazeMenu .dev { text-align: center; margin-top: 5px; font-size: 11px; color: #aaa; }
    .closeBtn { position: absolute; top: 5px; right: 10px; cursor: pointer; font-weight: bold; color: #f00; }
  `;
  document.head.appendChild(style);

  // Remover anterior
  document.getElementById('blazeMenu')?.remove();

  // Criar menu
  const menu = document.createElement('div');
  menu.id = 'blazeMenu';
  menu.innerHTML = `
    <h3>🤖 Chefe - 2k25 <span class="closeBtn">×</span></h3>
    <button id="btnIdentificarCor">🎯 Identificar Cor</button>
    <div id="corResultado">Resultado: ?</div>
    <div id="sugestaoEntrada">Sugestão: -</div>
    <div class="dev">By: Allan Santos</div>
  `;
  document.body.appendChild(menu);

  // Fechar menu
  document.querySelector('.closeBtn').onclick = () => menu.remove();

  // Buscar resultado
  const buscarResultado = () => {
    fetch('https://blaze.bet.br/api/singleplayer-originals/originals/roulette_games/recent/1')
      .then(res => res.json())
      .then(data => {
        const corId = Number(data[0]?.color);
        const cor = coresMap[corId] || { nome: '❓ Desconhecida', sugestao: '-' };
        document.getElementById('corResultado').textContent = `Resultado: ${cor.nome}`;
        document.getElementById('sugestaoEntrada').textContent = `Sugestão: ${cor.sugestao}`;
      })
      .catch(() => {
        document.getElementById('corResultado').textContent = 'Erro ao buscar resultado!';
        document.getElementById('sugestaoEntrada').textContent = '-';
      });
  };

  // Clique manual
  document.getElementById('btnIdentificarCor').onclick = buscarResultado;

  // Detectar giro novo com MutationObserver
  const alvo = document.querySelector('#roulette-slider-entries');
  if (alvo) {
    const observer = new MutationObserver(() => {
      setTimeout(buscarResultado, 500); // tempo pra garantir que já saiu
    });
    observer.observe(alvo, { childList: true });
  }
})();
