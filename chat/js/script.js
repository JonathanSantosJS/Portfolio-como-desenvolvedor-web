// script.js

// Estado geral do chat
const chatState = {
  step: 'start',
  name: '',
  topic: '',
};

// --- Módulo de métricas ---
const METRICS_STORAGE_KEY = 'webjs_chat_metrics_v1';

function registrarMetrica(stepKey) {
  try {
    const dados = JSON.parse(localStorage.getItem(METRICS_STORAGE_KEY) || '{}');
    dados[stepKey] = (dados[stepKey] || 0) + 1;
    localStorage.setItem(METRICS_STORAGE_KEY, JSON.stringify(dados));
  } catch (e) {
    console.error('Erro ao registrar métrica:', e);
  }
}

function obterMetricas() {
  try {
    return JSON.parse(localStorage.getItem(METRICS_STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function limparMetricas() {
  localStorage.removeItem(METRICS_STORAGE_KEY);
}

// --- Funções utilitárias DOM ---
function criarElementoMensagem(texto, classe) {
  const div = document.createElement('div');
  div.className = `message ${classe}`;
  div.innerHTML = texto.replace(/\n/g, '<br>');
  return div;
}

function criarBotaoOpcao(texto, callback) {
  const btn = document.createElement('button');
  btn.className = 'option-button';
  btn.textContent = texto;
  btn.type = 'button';
  btn.addEventListener('click', callback);
  return btn;
}

function criarInputTexto(placeholder, onSubmit) {
  const container = document.createElement('div');
  container.className = 'input-container';

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'chat-input';
  input.placeholder = placeholder;
  input.autocomplete = 'off';

  const btn = document.createElement('button');
  btn.className = 'send-button';
  btn.type = 'button';
  btn.textContent = 'Enviar';

  btn.addEventListener('click', () => {
    if (input.value.trim()) onSubmit(input.value.trim());
  });

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && input.value.trim()) {
      onSubmit(input.value.trim());
    }
  });

  container.appendChild(input);
  container.appendChild(btn);

  return { container, input, btn };
}

// --- Função principal para renderizar etapas ---
function renderStep(stepKey) {
  const flow = window.conversationFlow;
  if (!flow) {
    console.error('conversationFlow não carregado ainda.');
    return;
  }

  const step = flow[stepKey];
  if (!step) {
    console.warn(`Passo "${stepKey}" não definido no fluxo.`);
    return;
  }

  chatState.step = stepKey;
  registrarMetrica(stepKey);

  const messageBox = document.getElementById('chat-messages');
  const optionsBox = document.getElementById('options-container');
  const typing = document.getElementById('typing-indicator');
  const statusText = document.getElementById('status-text');

  // Limpa opções e mostra indicador de digitação
  optionsBox.innerHTML = '';
  if (typing) typing.classList.remove('hidden');
  if (statusText) statusText.innerText = 'Digitando...';

  // Gera texto da mensagem (string ou função)
  let textContent =
    typeof step.message === 'function' ? step.message(chatState.name) : step.message;

  // Calcula tempo de digitação dinâmico (mínimo 700ms, máximo 3000ms)
  const typingTime = Math.min(3000, Math.max(700, (textContent || '').length * 18));

  setTimeout(() => {
    // Oculta digitação e atualiza status
    if (typing) typing.classList.add('hidden');
    if (statusText) statusText.innerText = 'Online agora';

    // Exibe mensagem do bot
    const botMessage = criarElementoMensagem(textContent, 'bot-message');
    messageBox.appendChild(botMessage);
    messageBox.scrollTop = messageBox.scrollHeight;

    // Renderiza input se necessário
    if (step.input) {
      const placeholderText = stepKey === 'start' ? 'Digite seu nome...' : 'Digite aqui...';
      const { container, input } = criarInputTexto(placeholderText, (value) => {
        if (!value) return;

        // Exibe mensagem do usuário
        const userMessage = criarElementoMensagem(value, 'user-message');
        messageBox.appendChild(userMessage);
        messageBox.scrollTop = messageBox.scrollHeight;

        if (stepKey === 'start') {
          chatState.name = value;
          window.chatState = window.chatState || {};
          window.chatState.name = value;
          renderStep('after_name');
        } else if (stepKey === 'rsvp_contact' || stepKey === 'ask_topic') {
          chatState.topic = value;
          renderStep('show_cta');
        }
      });

      optionsBox.appendChild(container);
      input.focus();

    // Renderiza opções de botões, se houver
    } else if (step.options) {
      step.options.forEach((option) => {
        const btn = criarBotaoOpcao(option.text, () => {
          // Exibe mensagem do usuário ao clicar
          const userMessage = criarElementoMensagem(option.text, 'user-message');
          messageBox.appendChild(userMessage);
          messageBox.scrollTop = messageBox.scrollHeight;

          // Se for WhatsApp, atualiza a URL com dados
          if (option.next === 'go_whatsapp' || option.next === 'rsvp_send_message') {
            const phone = (window.chatConfig && window.chatConfig.phone) || '5582987353564';
            let msg = `Olá, meu nome é ${chatState.name || 'Visitante'}`;
            if (chatState.topic) msg += ` e gostaria de falar sobre: ${chatState.topic}`;
            const encodedMsg = encodeURIComponent(msg);
            const waUrl = `https://wa.me/${phone}?text=${encodedMsg}`;

            if (option.next === 'go_whatsapp') {
              window.conversationFlow.go_whatsapp.cta.url = waUrl;
            } else if (option.next === 'rsvp_send_message') {
              window.conversationFlow.rsvp_send_message.cta.url = waUrl;
            }
          }

          // Se reiniciar conversa, limpa estado
          if (option.next === 'start') {
            chatState.name = '';
            chatState.topic = '';
            messageBox.innerHTML = '';
          }

          renderStep(option.next);
        });
        optionsBox.appendChild(btn);
      });

    // Renderiza CTA (botão link), se existir
    } else if (step.cta) {
      const ctaButton = document.createElement('a');
      ctaButton.className = 'cta-button';
      ctaButton.textContent = step.cta.text;
      ctaButton.href = step.cta.url;
      ctaButton.target = '_blank';
      ctaButton.rel = 'noopener noreferrer';

      optionsBox.appendChild(ctaButton);
    }
  }, typingTime);
}

// Inicialização do chat (função pública)
function iniciarChat() {
  // Se já tiver nome salvo no motor, usa ele
  chatState.name = window.chatState?.name || '';
  renderStep(chatState.step);
}

// Exporta iniciarChat para ser chamado externamente (ex: loader.js)
window.HelenaChat = {
  iniciarChat,
  obterMetricas,
  limparMetricas,
};
