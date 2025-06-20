
(() => {
  const coresMap = {
    0: { nome: 'â¬œ Branco', sugestao: 'ðŸŸ¥ ou â¬› Apostar Vermelho ou Preto' },
    1: { nome: 'ðŸŸ¥ Vermelho', sugestao: 'â¬› Apostar Preto' },
    2: { nome: 'â¬› Preto', sugestao: 'ðŸŸ¥ Apostar Vermelho' },
  };

  const style = document.createElement('style');
  style.textContent = `
    #blazeMenu {
      position: fixed;
      top: 100px;
      left: 20px;
      width: 240px;
      background: #111;
      padding: 12px;
      z-index: 99999;
      border-radius: 12px;
      box-shadow: 0 0 10px #54eb00;
      font-family: 'Segoe UI', sans-serif;
      color: #fff;
    }
    #blazeMenu h3 {
      margin: 0 0 10px;
      text-align: center;
      color: #54eb00;
      font-size: 14px;
    }
    #blazeMenu button {
      width: 100%;
      margin: 6px 0;
      padding: 8px;
      background: #54eb00;
      border: none;
      border-radius: 6px;
      font-weight: bold;
      font-size: 13px;
      cursor: pointer;
      color: #000;
    }
    #corResultado, #sugestaoEntrada {
      background: #222;
      color: #fff;
      padding: 8px;
      margin-top: 6px;
      text-align: center;
      border-radius: 5px;
      font-size: 13px;
    }
    #blazeMenu .dev {
      text-align: center;
      margin-top: 8px;
      font-size: 11px;
      color: #aaa;
    }
    .closeBtn {
      position: absolute;
      top: 6px;
      right: 10px;
      cursor: pointer;
      font-weight: bold;
      color: #f00;
      font-size: 16px;
    }
  `;
  document.head.appendChild(style);

  document.getElementById('blazeMenu')?.remove();

  const menu = document.createElement('div');
  menu.id = 'blazeMenu';
  menu.innerHTML = `
    <h3>ðŸ¤– Chefe - 2k25 Pro <span class="closeBtn">Ã—</span></h3>
    <button id="btnIdentificarCor">ðŸŽ¯ Identificar Cor</button>
    <div id="corResultado">Resultado: ?</div>
    <div id="sugestaoEntrada">SugestÃ£o: -</div>
    <div class="dev">By: Allan Santos</div>
  `;
  document.body.appendChild(menu);

  document.querySelector('.closeBtn').onclick = () => menu.remove();

  const buscarResultado = () => {
    fetch('https://blaze.bet.br/api/singleplayer-originals/originals/roulette_games/recent/1')
      .then(res => res.json())
      .then(data => {
        const corId = Number(data[0]?.color);
        const cor = coresMap[corId] || { nome: 'â“ Desconhecida', sugestao: '-' };
        document.getElementById('corResultado').textContent = `Resultado: ${cor.nome}`;
        document.getElementById('sugestaoEntrada').textContent = `SugestÃ£o: ${cor.sugestao}`;
      })
      .catch(() => {
        document.getElementById('corResultado').textContent = 'Erro ao buscar resultado!';
        document.getElementById('sugestaoEntrada').textContent = '-';
      });
  };

  document.getElementById('btnIdentificarCor').onclick = buscarResultado;

  const alvo = document.querySelector('#roulette-slider-entries');
  if (alvo) {
    const observer = new MutationObserver(() => {
      setTimeout(buscarResultado, 500);
    });
    observer.observe(alvo, { childList: true });
  }
})();
