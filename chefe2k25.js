(() => { const coresMap = { 0: '⬜ Branco', 1: '🟥 Vermelho', 2: '⬛ Preto' };

const getSugestao = (ultimos) => { const contagem = { 0: 0, 1: 0, 2: 0 }; ultimos.forEach(c => contagem[c]++);

if (contagem[0] > 0) return '🟥 ou ⬛ Apostar Vermelho ou Preto';

const maisProvavel = contagem[1] >= contagem[2] ? 1 : 2;
return maisProvavel === 1 ? '🟥 Repetição Provável' : '⬛ Repetição Provável';

};

const style = document.createElement('style'); style.textContent = #blazeMenu { position: fixed; top: 100px; left: 20px; width: 260px; background: linear-gradient(to bottom, #222, #111); padding: 12px; z-index: 99999; border-radius: 12px; box-shadow: 0 0 15px #00ff77; font-family: 'Segoe UI', sans-serif; color: #fff; } #blazeMenu h3 { margin: 0 0 8px; text-align: center; color: #00ff77; font-size: 15px; } .closeBtn { position: absolute; right: 12px; top: 12px; font-size: 16px; font-weight: bold; color: #f00; cursor: pointer; } #blazeMenu button { display: none; } #corResultado, #sugestaoEntrada { background: #1a1a1a; color: #fff; padding: 7px; margin-top: 6px; text-align: center; border-radius: 5px; font-size: 13px; } .dev { text-align: center; margin-top: 8px; font-size: 11px; color: #aaa; }; document.head.appendChild(style);

document.getElementById('blazeMenu')?.remove();

const menu = document.createElement('div'); menu.id = 'blazeMenu'; menu.innerHTML = <h3>🤖 Chefe - 2k25 Pro <span class="closeBtn">×</span></h3> <div id="corResultado">Resultado: ?</div> <div id="sugestaoEntrada">Sugestão: -</div> <div class="dev">By: Allan Santos</div>; document.body.appendChild(menu);

document.querySelector('.closeBtn').onclick = () => menu.remove();

const buscarResultado = () => { fetch('https://blaze.bet.br/api/singleplayer-originals/originals/roulette_games/recent/3') .then(res => res.json()) .then(data => { const cores = data.map(g => Number(g.color)); const ultima = cores[0]; const corNome = coresMap[ultima] || '❓ Desconhecida'; const sugestao = getSugestao(cores); document.getElementById('corResultado').textContent = Resultado: ${corNome}; document.getElementById('sugestaoEntrada').textContent = Sugestão: ${sugestao}; }) .catch(() => { document.getElementById('corResultado').textContent = 'Erro ao buscar!'; document.getElementById('sugestaoEntrada').textContent = '-'; }); };

const alvo = document.querySelector('#roulette-slider-entries'); if (alvo) { const observer = new MutationObserver(() => { setTimeout(buscarResultado, 500); }); observer.observe(alvo, { childList: true }); }

buscarResultado(); })();

