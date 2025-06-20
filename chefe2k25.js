(() => {
  const coresMap = {
    0: { nome: '⬜ Branco', sugestao: '🟥 ou ⬛ Apostar Vermelho ou Preto' },
    1: { nome: '🟥 Vermelho', sugestao: '⬛ Apostar Preto' },
    2: { nome: '⬛ Preto', sugestao: '🟥 Apostar Vermelho' },
  };

  let historicoCores = [];

  const analisarPadroes = () => {
    const ultimos = historicoCores.slice(-5);
    const conta = { 0: 0, 1: 0, 2: 0 };
    ultimos.forEach(cor => conta[cor]++);

    if (conta[1] >= 3) return { cor: 2, padrao: 'Sequência Vermelho' };
    if (conta[2] >= 3) return { cor: 1, padrao: 'Sequência Preto' };
    if (historicoCores.length >= 10 && historicoCores.slice(-10).every(c => c !== 0)) {
      return { cor: 0, padrao: 'Branco ausente há 10 rodadas' };
    }
    return null;
  };

  const fetchResultado = () => {
    fetch('https://blaze.bet.br/api/singleplayer-originals/originals/roulette_games/recent/1')
      .then(res => res.json())
      .then(data => {
        const corId = Number(data[0]?.color);
        if (isNaN(corId)) return;

        historicoCores.push(corId);
        const cor = coresMap[corId]?.nome || '❓ Desconhecida';
        let sugestao = coresMap[corId]?.sugestao || '-';

        const padrao = analisarPadroes();
        if (padrao) sugestao = coresMap[padrao.cor]?.sugestao + ` (${padrao.padrao})`;

        document.getElementById('corResultado').textContent = `Resultado: ${cor}`;
        document.getElementById('sugestaoEntrada').textContent = `Sugestão: ${sugestao}`;
      })
      .catch(() => {
        document.getElementById('corResultado').textContent = 'Erro ao buscar resultado!';
        document.getElementById('sugestaoEntrada').textContent = '-';
      });
  };

  const menu = document.createElement('div');
  menu.id = 'blazeMenu';
  menu.style = 'position:fixed;top:100px;left:20px;width:230px;background:#111;padding:10px;border-radius:10px;z-index:99999;color:#fff;font-family:sans-serif;box-shadow:0 0 10px #0f0;';
  menu.innerHTML = `
    <h3 style="margin:0 0 5px;color:#0f0;text-align:center">🤖 Chefe - 2k25 Pro</h3>
    <button id="btnVerificar" style="width:100%;padding:10px;background:#0f0;color:#000;border:none;border-radius:5px;font-weight:bold;margin-bottom:5px">🎯 Identificar Cor</button>
    <div id="corResultado" style="margin-top:5px;text-align:center">Resultado: ?</div>
    <div id="sugestaoEntrada" style="margin-top:5px;text-align:center">Sugestão: -</div>
    <div style="text-align:center;color:#aaa;font-size:11px;margin-top:8px">By: Allan Santos</div>
  `;
  document.body.appendChild(menu);

  document.getElementById('btnVerificar').addEventListener('click', fetchResultado);

  const observer = new MutationObserver(() => {
    fetchResultado();
  });

  const target = document.querySelector('#roulette-slider-entries');
  if (target) observer.observe(target, { childList: true });
})();
