// SPLASHSCREEN INFORMATIVA - Configuração e controle
// Edite o objeto abaixo para ativar/desativar, trocar mensagem, imagem, botão e datas
// Para desativar, basta colocar ativo: false ou ajustar as datas
// Para imagens do Google Drive, use o formato: https://drive.google.com/uc?id=ID_DA_IMAGEM

const splashConfig = {
  ativo: false, // true para ativar, false para desativar manualmente
  dataInicio: '2025-06-28', // formato: 'YYYY-MM-DD'
  dataFim: '2025-07-03',
  mensagem: 'É amanhã',
  botao: {
    texto: 'Compareça', //deixe vazio para desativar o botão
    url: ''
  },
  imagem: '/assets/images/splash' // Agora usando imagem local
};

// --- NÃO ALTERE ABAIXO DESTA LINHA, APENAS SE SOUBER JS ---
(function(){
  // Só exibe se estiver online
  if (!navigator.onLine) return;

  // Controle por data
  const hoje = new Date();
  const inicio = new Date(splashConfig.dataInicio + 'T00:00:00');
  const fim = new Date(splashConfig.dataFim + 'T23:59:59');
  const dentroPeriodo = hoje >= inicio && hoje <= fim;

  // Ativo manual ou por período
  if (!splashConfig.ativo && !dentroPeriodo) return;

  // Elementos
  const splash = document.getElementById('splash-informativo');
  const msg = document.getElementById('splash-msg');
  const img = document.getElementById('splash-img');
  const btn = document.getElementById('splash-btn');

  // Mensagem
  msg.innerHTML = splashConfig.mensagem || '';

  // Imagem: só mostra se for link válido e acessível
  function isValidImageUrl(url) {
    return url && url.trim().length > 0;
  }
  if (isValidImageUrl(splashConfig.imagem)) {
    // Para evitar cache, adiciona um parâmetro único na URL
    const noCacheUrl = splashConfig.imagem + '?v=' + Date.now();
    img.src = noCacheUrl;
    img.style.display = 'block';
  } else {
    img.style.display = 'none';
  }

  // Botão: só aparece se houver texto real (não vazio ou só espaços)
  if (splashConfig.botao && splashConfig.botao.texto && splashConfig.botao.texto.trim().length > 0) {
    btn.textContent = splashConfig.botao.texto;
    btn.style.display = 'inline-block';
    if (splashConfig.botao.url && splashConfig.botao.url.trim().length > 0) {
      btn.href = splashConfig.botao.url;
      btn.target = '_blank';
      btn.onclick = null;
    } else {
      btn.href = '#';
      btn.removeAttribute('target');
      btn.onclick = function(e) {
        e.preventDefault();
        splash.style.display = 'none';
      };
    }
  } else {
    // Remove o botão do DOM para garantir que não aparece
    btn.parentNode && btn.parentNode.removeChild(btn);
  }

  // Exibir splash
  splash.style.display = 'flex';

  // Adicionar logo no topo da splash, se ainda não existir
  if (!splash.querySelector('.splash-logo')) {
    const logo = document.createElement('img');
    logo.src = 'assets/images/logo.png';
    logo.alt = 'Logo Colégio Vicente Rijo';
    logo.className = 'splash-logo';
    logo.style.cssText = 'width: 80px; height: 80px; object-fit: contain; margin: 0 auto 12px auto; display: block;';
    splash.querySelector('.splash-content').prepend(logo);
  }

  // Ícone X de fechar no canto superior direito
  const closeIcon = document.createElement('button');
  closeIcon.innerHTML = '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="11" fill="white"/><path d="M7 7L15 15M15 7L7 15" stroke="#e53935" stroke-width="2.2" stroke-linecap="round"/></svg>';
  closeIcon.className = 'splash-close-x';
  closeIcon.setAttribute('aria-label', 'Fechar aviso');
  closeIcon.onclick = () => splash.style.display = 'none';
  splash.querySelector('.splash-content').prepend(closeIcon);

  // Fechar ao clicar fora do modal
  splash.addEventListener('mousedown', function(e) {
    if (e.target === splash) {
      splash.style.display = 'none';
    }
  });
})(); 