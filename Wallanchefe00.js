javascript:(function() {
  const script = document.createElement('script');
  confirm("Inicializando System Bot00 2k25... 💻");

  script.innerText = `
    function closeMenu() {
      let contextOptions = document.getElementsByClassName('custom-menu')[0];
      contextOptions.style.display = 'none';
    }

    const menuHTML = \`
      <div class="custom-menu">
        <div class="menu-header">Entrada Confirmada</div>
        <div class="instagram-overlay">
          <i class="fab fa-instagram instagram-icon"></i>
          <span class="instagram-text">@bot00blaze</span>
        </div>
        <div class="menu-content">
          <img src="https://i.ibb.co/qxHVbFj/8940cf41-1499-47fe-a789-57c376aba99d-20241117-133119-0000.jpg" alt="Fundo" class="background-image">
          <div class="menu-overlay">
            <div class="status">
              <span>Status:</span>
              <i class="fas fa-clock status-icon"></i>
            </div>
            <div class="entry">
              <span>Entrada:</span>
              <div class="icon entry-icon"></div>
            </div>
          </div>
        </div>
        <span class="context-option closeMenu" onclick="closeMenu();">Fechar Menu</span>
      </div>
    \`;

    const styleTag = document.createElement('style');
    styleTag.innerHTML = \`
      .custom-menu {
        position: fixed;
        top: 50px;
        left: 50px;
        width: 300px;
        border: 2px solid #a020f0; /* Borda roxa aumentada para 2px */
        border-radius: 8px;
        background-color: #1b1b1b;
        color: #fff;
        font-family: Arial, sans-serif;
        z-index: 9999;
        display: block;
      }

      .menu-header {
        background-color: #282828;
        text-align: center;
        font-weight: bold;
        padding: 10px;
        font-size: 18px;
        border-bottom: 2px solid #a020f0;
      }

      .instagram-overlay {
        position: absolute;
        top: 60px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 5px;
        z-index: 2;
      }

      .instagram-icon {
        font-size: 20px;
        color: #E1306C; /* Cor do ícone do Instagram */
      }

      .instagram-text {
        color: #fff;
        font-size: 14px;
        font-weight: bold;
      }

      .menu-content {
        position: relative;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .background-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 1;
      }

      .menu-overlay {
        position: relative;
        z-index: 2;
        display: flex;
        justify-content: space-between;
        width: 90%;
      }

      .status, .entry {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;
      }

      .status-icon {
        font-size: 40px;
        color: #ffffff;
        margin-top: 5px;
      }

      .icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 5px;
      }

      .entry-icon {
        background-color: #ff0000;
        border: 2px solid #fff;
      }

      .context-option {
        display: block;
        text-align: center;
        padding: 5px;
        background-color: #282828;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
        border-top: 2px solid #a020f0;
      }

      .context-option:hover {
        background-color: #444;
      }
    \`;

    const menuDiv = document.createElement('div');
    menuDiv.innerHTML = menuHTML;

    const fontAwesome = document.createElement('script');
    fontAwesome.src = 'https://kit.fontawesome.com/a076d05399.js';
    fontAwesome.crossorigin = 'anonymous';

    document.body.appendChild(styleTag);
    document.body.appendChild(menuDiv);
    document.body.appendChild(fontAwesome);
  `;

  document.body.appendChild(script);
})();
