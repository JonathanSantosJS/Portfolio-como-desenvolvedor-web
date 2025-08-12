// loader.js (versão corrigida)

/**
 * Função para carregar scripts dinamicamente
 * @param {string} src - Caminho do script
 * @returns {Promise<void>}
 */
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = false; // Importante para manter a ordem
    script.onload = () => {
      console.log(`✅ Script carregado: ${src}`);
      resolve();
    };
    script.onerror = (err) => {
      console.error(`❌ Erro ao carregar script: ${src}`, err);
      reject(new Error(`Falha ao carregar ${src}`));
    };
    document.head.appendChild(script); // Melhor colocar no head
  });
}

(async function mainLoader() {
  try {
    console.log('Iniciando carregamento do chat...');

    // 1. Carrega primeiro o motor principal
    await loadScript('js/chatCore.js');
    console.log('Motor do chat carregado');

    // 2. Carrega o fluxo específico baseado na URL
    const params = new URLSearchParams(window.location.search);
    let fluxoCarregado = 'padrão';

    if (params.has('rsvp')) {
      await loadScript('js/helena_rsvp.js');
      fluxoCarregado = 'RSVP';
    } else if (params.has('negocios')) {
      await loadScript('js/helena_negocios.js');
      fluxoCarregado = 'Negócios';
    } else {
      await loadScript('js/helena_padrao.js');
    }

    console.log(`Fluxo ${fluxoCarregado} carregado com sucesso`);

    // 3. Inicializa o chat usando a função do chatCore.js
    if (window.startChatEngine && window.conversationFlow) {
      console.log('Inicializando chat...');
      window.startChatEngine(window.conversationFlow, {
        phone: '5582987353564', // Substitua pelo seu número
        debug: true // Opcional para logs extras
      });
    } else {
      throw new Error('Função startChatEngine não encontrada');
    }

  } catch (error) {
    console.error('Falha na inicialização do chat:', error);
    
    // Fallback visual para o usuário
    const messageBox = document.getElementById('chat-messages');
    if (messageBox) {
      messageBox.innerHTML = `
        <div class="message bot-message">
          Ops! O chat não carregou corretamente. Por favor, recarregue a página.
          <br><small>Erro: ${error.message}</small>
        </div>`;
    }
  }
})();