// Configurações globais
const CONFIG = {
  animationDuration: 300,
  scrollThreshold: 0.1,
  particleCount: 50,
  enableHapticFeedback: true,
  loadingDuration: 2000 // Duração da tela de loading em ms
};

// Classe principal da aplicação
class ModernApp {
  constructor() {
    console.log('🚀 Iniciando ModernApp...');
    this.init();
  }

  init() {
    console.log('⚙️ Executando init()...');
    this.initThemeToggle();
    this.initScrollAnimations();
    this.initInteractiveElements();
    this.setupLoadingScreen();
    this.setupEventListeners();
    this.initializeAnimations();
    this.setupHapticFeedback();
    this.initializePWA();
    console.log('✅ init() concluído!');
  }

  initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Verificar preferência salva ou do sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      body.className = savedTheme;
    } else if (prefersDark) {
      body.className = 'dark-mode';
    } else {
      body.className = 'light-mode';
    }
    
    // Alternar tema
    themeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const currentTheme = body.className;
      const newTheme = currentTheme === 'light-mode' ? 'dark-mode' : 'light-mode';
      body.className = newTheme;
      localStorage.setItem('theme', newTheme);
      // Feedback visual simplificado
      themeToggle.classList.add('theme-toggle-anim');
      setTimeout(() => {
        themeToggle.classList.remove('theme-toggle-anim');
      }, 300);
    });

    // Remover qualquer evento de blur após o clique
    themeToggle.onblur = null;

    // Observar mudanças na preferência do sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        body.className = e.matches ? 'dark-mode' : 'light-mode';
      }
    });
  }

  setupLoadingScreen() {
    console.log('🔍 Iniciando setupLoadingScreen...');
    const loadingScreen = document.getElementById('loading-screen');
    console.log('📱 Elemento loading-screen encontrado:', loadingScreen);
    
    if (!loadingScreen) {
      console.error('❌ Elemento loading-screen não encontrado!');
      return;
    }

    console.log('⏱️ Configurando timer de loading...');
    // Simular tempo de carregamento
    setTimeout(() => {
      console.log('✅ Adicionando classe hidden...');
      loadingScreen.classList.add('hidden');
      
      // Remover completamente após a animação
      setTimeout(() => {
        console.log('🗑️ Removendo loading screen...');
        loadingScreen.remove();
      }, 500);
    }, CONFIG.loadingDuration);
  }

  setupEventListeners() {
    // Contatos Emergenciais com animação melhorada
  const emergencyBtn = document.getElementById('emergency-btn');
  const emergencyContacts = document.getElementById('emergency-contacts');
  const toggleIcon = document.querySelector('.toggle-icon');

    if (emergencyBtn && emergencyContacts) {
      emergencyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleEmergencyContacts(emergencyBtn, emergencyContacts, toggleIcon);
      });
    }

    // Links com efeitos avançados
    const appLinks = document.querySelectorAll('.app-link');
    appLinks.forEach(link => {
      this.setupLinkEffects(link);
    });

    // Botão de tutoriais
    const tutorialBtn = document.querySelector('.tutorial-btn');
    if (tutorialBtn) {
      // Apenas efeitos visuais, sem manipulação de display/opacity
      tutorialBtn.addEventListener('mouseenter', () => {
        this.add3DEffect(tutorialBtn);
      });
      tutorialBtn.addEventListener('mouseleave', () => {
        this.remove3DEffect(tutorialBtn);
      });
      tutorialBtn.addEventListener('click', (e) => {
        this.createRippleEffect(e, tutorialBtn);
        this.triggerHapticFeedback();
      });
    }

    // Redes sociais
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
      this.setupSocialIconEffects(icon);
    });

    // Prevenção de zoom em dispositivos móveis
    document.addEventListener('gesturestart', (e) => e.preventDefault());
    document.addEventListener('gesturechange', (e) => e.preventDefault());
    document.addEventListener('gestureend', (e) => e.preventDefault());

    // Melhorar acessibilidade
    this.setupAccessibility();
  }

  setupAccessibility() {
    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        // Fechar contatos emergenciais se estiverem abertos
        const emergencyContacts = document.getElementById('emergency-contacts');
        if (emergencyContacts && !emergencyContacts.classList.contains('hidden')) {
          const emergencyBtn = document.getElementById('emergency-btn');
          const toggleIcon = document.querySelector('.toggle-icon');
          this.toggleEmergencyContacts(emergencyBtn, emergencyContacts, toggleIcon);
        }
      }
    });

    // Melhorar foco visual
    const focusableElements = document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(element => {
      element.addEventListener('focus', () => {
        element.style.outline = '3px solid var(--secondary)';
        element.style.outlineOffset = '2px';
      });
      
      element.addEventListener('blur', () => {
        element.style.outline = '';
        element.style.outlineOffset = '';
      });
    });
  }

  toggleEmergencyContacts(btn, contacts, icon) {
    const isHidden = contacts.classList.contains('hidden');
    
    // Atualizar aria-expanded
    btn.setAttribute('aria-expanded', !isHidden);
    
    // Animação suave
    if (isHidden) {
      contacts.style.display = 'block';
      contacts.style.opacity = '0';
      contacts.style.transform = 'translateY(-20px)';
      
      setTimeout(() => {
        contacts.classList.remove('hidden');
        contacts.style.opacity = '1';
        contacts.style.transform = 'translateY(0)';
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
        btn.style.borderRadius = '20px 20px 0 0';
      }, 10);
    } else {
      contacts.style.opacity = '0';
      contacts.style.transform = 'translateY(-20px)';
      
      setTimeout(() => {
        contacts.classList.add('hidden');
        contacts.style.display = 'none';
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
        btn.style.borderRadius = '20px';
      }, 300);
    }

    // Feedback tátil
    this.triggerHapticFeedback();
  }

  setupLinkEffects(link) {
    const icon = link.querySelector('.link-icon');
    const badge = link.querySelector('.link-badge');
    // Efeito hover com animação 3D
    link.addEventListener('mouseenter', () => {
      this.add3DEffect(link);
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg) translateZ(20px)';
      }
      if (badge) {
        badge.style.transform = 'scale(1.1) rotate(5deg)';
      }
    });
    link.addEventListener('mouseleave', () => {
      this.remove3DEffect(link);
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0) translateZ(0)';
      }
      if (badge) {
        badge.style.transform = 'scale(1) rotate(0)';
      }
    });
    // Feedback ao clicar
    link.addEventListener('mousedown', () => {
      link.style.transform = 'translateY(-5px) scale(0.98)';
      this.triggerHapticFeedback();
    });
    link.addEventListener('mouseup', () => {
      link.style.transform = 'translateY(-12px) scale(1.02)';
    });
    // Efeito de ripple
    link.addEventListener('click', (e) => {
      this.createRippleEffect(e, link);
    });
    // Adicionar loading state para links externos
    if (link.href && link.href.startsWith('http')) {
      link.addEventListener('click', () => {
        this.showLoading(link);
        setTimeout(() => {
          this.hideLoading(link);
        }, 1000);
      });
    }
  }

  setupButtonEffects(button) {
    button.addEventListener('mouseenter', () => {
      this.add3DEffect(button);
    });
    
    button.addEventListener('mouseleave', () => {
      this.remove3DEffect(button);
    });

    button.addEventListener('click', (e) => {
      this.createRippleEffect(e, button);
      this.triggerHapticFeedback();
    });
  }

  setupSocialIconEffects(icon) {
    icon.addEventListener('mouseenter', () => {
      icon.style.transform = 'scale(1.15) rotate(5deg) translateZ(10px)';
    });
    
    icon.addEventListener('mouseleave', () => {
      icon.style.transform = 'scale(1) rotate(0) translateZ(0)';
    });

    icon.addEventListener('click', () => {
      this.triggerHapticFeedback();
    });
  }

  add3DEffect(element) {
    element.style.transform = 'translateY(-12px) scale(1.02) rotateX(5deg)';
    element.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 30px rgba(255, 215, 0, 0.3)';
  }

  remove3DEffect(element) {
    element.style.transform = 'translateY(0) scale(1) rotateX(0)';
    element.style.boxShadow = '';
  }

  createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.7) 0%, transparent 70%);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
      z-index: 1000;
    `;

    element.style.position = 'relative';
    element.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  initializeAnimations() {
    // Adicionar CSS para animação de ripple
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        25% { transform: translateY(-10px) rotate(1deg); }
        50% { transform: translateY(-5px) rotate(0deg); }
        75% { transform: translateY(-15px) rotate(-1deg); }
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.05); opacity: 0.8; }
      }
      
      .particle {
        position: fixed;
        pointer-events: none;
        z-index: -1;
        animation: float 6s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
  }

  initScrollAnimations() {
    // Removido: efeitos de scroll que causavam problemas
    // Cards agora ficam sempre visíveis
    const elementsToShow = document.querySelectorAll('.app-link, .emergency-section, .social-media');
    elementsToShow.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.classList.add('visible');
    });
  }

  createParticleBackground() {
    // Removido: partículas que causavam lentidão
    // Site agora é mais rápido sem efeitos de fundo
    console.log('✨ Partículas removidas para melhor performance');
  }

  setupHapticFeedback() {
    if (!CONFIG.enableHapticFeedback) return;

    // Verificar se o dispositivo suporta vibração
    if ('vibrate' in navigator) {
      this.triggerHapticFeedback = () => {
        navigator.vibrate(10);
      };
    } else {
      this.triggerHapticFeedback = () => {
        // Fallback visual
        document.body.style.transform = 'scale(0.99)';
        setTimeout(() => {
          document.body.style.transform = 'scale(1)';
        }, 50);
      };
    }
  }

  initializePWA() {
    // Verificar se é PWA instalado
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('🚀 Executando como PWA instalado');
      document.body.classList.add('pwa-mode');
    }

    // Service Worker - Registro otimizado e atualização automática
    if ('serviceWorker' in navigator) {
      const registerSW = () => {
        navigator.serviceWorker.register('service-worker.js', {
          scope: '/',
          updateViaCache: 'none'
        })
        .then(registration => {
          // Sempre busca a versão mais recente do SW
          registration.update();

          // Se um novo SW estiver esperando, força ativação imediata
          if (registration.waiting) {
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          }

          // Escuta mudanças de controle e recarrega a página
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            window.location.reload();
          });
        })
        .catch(error => {
          console.warn('⚠️ Erro no Service Worker:', error);
        });
      };

      if ('requestIdleCallback' in window) {
        requestIdleCallback(registerSW, { timeout: 5000 });
      } else {
        setTimeout(registerSW, 1000);
      }
    }

    // Detectar mudanças de conectividade
    window.addEventListener('online', () => {
      this.showNotification('Conexão restaurada', 'success');
    });

    window.addEventListener('offline', () => {
      this.showNotification('Sem conexão com a internet', 'warning');
    });
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      border-radius: 10px;
      color: white;
      font-weight: 500;
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    `;

    document.body.appendChild(notification);

    // Animar entrada
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Remover após 3 segundos
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  // Método para adicionar efeito de loading
  showLoading(element) {
    element.classList.add('loading');
  }

  hideLoading(element) {
    element.classList.remove('loading');
  }

  // Método para adicionar efeito de sucesso
  showSuccess(element) {
    element.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    element.style.color = 'white';
    setTimeout(() => {
      element.style.background = '';
      element.style.color = '';
    }, 1000);
  }

  initInteractiveElements() {
    // Inicializar elementos interativos dos cards
    const appLinks = document.querySelectorAll('.app-link');
    appLinks.forEach(link => {
      this.setupLinkEffects(link);
    });

    // Botão de tutoriais
    const tutorialBtn = document.querySelector('.tutorial-btn');
    if (tutorialBtn) {
      tutorialBtn.addEventListener('mouseenter', () => {
        this.add3DEffect(tutorialBtn);
      });
      tutorialBtn.addEventListener('mouseleave', () => {
        this.remove3DEffect(tutorialBtn);
      });
      tutorialBtn.addEventListener('click', (e) => {
        this.createRippleEffect(e, tutorialBtn);
        this.triggerHapticFeedback();
      });
    }

    // Redes sociais
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
      this.setupSocialIconEffects(icon);
    });
  }
}

// Inicializar aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  console.log('📄 DOM carregado, criando aplicação...');
  try {
    new ModernApp();
  } catch (error) {
    console.error('❌ Erro ao inicializar aplicação:', error);
    // Fallback: remover loading screen mesmo com erro
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => loadingScreen.remove(), 500);
      }, 1000);
    }
  }
});

// Fallback adicional para garantir que a loading screen seja removida
window.addEventListener('load', () => {
  console.log('🌐 Página totalmente carregada');
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
    console.log('⚠️ Loading screen ainda visível, removendo...');
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      setTimeout(() => loadingScreen.remove(), 500);
    }, 500);
  }
});

// Otimizações de performance
window.addEventListener('load', () => {
  // Lazy loading para imagens
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
});

// Prevenção de zoom em dispositivos móveis
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
  const now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);

// Função para detectar se é mobile
function isMobile() {
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

// Lógica de instalação do PWA
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showPwaInstallBtn();
});

window.addEventListener('appinstalled', () => {
  hidePwaInstallBtn();
});

function showPwaInstallBtn() {
  if (!isMobile() || window.matchMedia('(display-mode: standalone)').matches) return;
  const btn = document.getElementById('pwa-install-btn');
  btn.innerHTML = `
    <button id="install-pwa-btn" style="
      background: linear-gradient(135deg, #14305c 60%, #ffd700 100%);
      color: #fff;
      font-family: 'Exo 2', 'Urbanist', Arial, sans-serif;
      font-weight: 700;
      font-size: 1.1rem;
      border: none;
      border-radius: 32px;
      padding: 16px 32px;
      box-shadow: 0 8px 32px 0 rgba(20,48,92,0.22);
      display: flex;
      align-items: center;
      gap: 14px;
      cursor: pointer;
      transition: box-shadow 0.3s, filter 0.3s, transform 0.3s;
      animation: pwaBtnPop 0.7s cubic-bezier(0.4,0,0.2,1);
    ">
      <i class="fas fa-download" style="font-size:1.5em;color:#ffd700;"></i>
      <span>Instalar o App</span>
    </button>
    <style>
      @keyframes pwaBtnPop {
        0% { transform: scale(0.7); opacity: 0; }
        70% { transform: scale(1.1); opacity: 1; }
        100% { transform: scale(1); }
      }
      #install-pwa-btn:hover {
        filter: brightness(1.08);
        box-shadow: 0 12px 40px 0 rgba(20,48,92,0.32);
        transform: translateY(-2px) scale(1.04);
      }
    </style>
  `;
  btn.style.display = 'block';
  document.getElementById('install-pwa-btn').onclick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        hidePwaInstallBtn();
      }
      deferredPrompt = null;
    }
  };
}

function hidePwaInstallBtn() {
  const btn = document.getElementById('pwa-install-btn');
  btn.style.display = 'none';
  btn.innerHTML = '';
}

// Esconder botão se já estiver instalado (iOS/PWA)
if (window.matchMedia('(display-mode: standalone)').matches) {
  hidePwaInstallBtn();
}