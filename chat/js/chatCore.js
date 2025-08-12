// chatCore.js

// Constantes para localStorage
const CHAT_USER_KEY = 'webjs_chat_user_v1';
const METRIC_KEY = 'webjs_chat_metrics_v1';
const NAME_TTL_MS = 86400000; // 24 horas em milissegundos

// Função para registrar métricas de uso (contagem de passos do chat)
function registrarMetrica(stepKey) {
  try {
    const dados = JSON.parse(localStorage.getItem(METRIC_KEY) || '{}');
    dados[stepKey] = (dados[stepKey] || 0) + 1;
    localStorage.setItem(METRIC_KEY, JSON.stringify(dados));
  } catch (e) {
    console.error('Erro ao registrar métrica:', e);
  }
}

// Salva nome do usuário com timestamp no localStorage
function saveUserName(name) {
  const payload = { name, ts: Date.now() };
  localStorage.setItem(CHAT_USER_KEY, JSON.stringify(payload));
}

// Recupera nome do usuário do localStorage se não expirou
function getSavedUserName() {
  const raw = localStorage.getItem(CHAT_USER_KEY);
  if (!raw) return null;
  try {
    const obj = JSON.parse(raw);
    if (Date.now() - (obj.ts || 0) <= NAME_TTL_MS) return obj.name;
    localStorage.removeItem(CHAT_USER_KEY);
    return null;
  } catch {
    localStorage.removeItem(CHAT_USER_KEY);
    return null;
  }
}

/**
 * Inicia o motor do chat.
 * @param {Object} conversationFlow - Objeto que define o fluxo de conversa.
 * @param {Object} config - Configurações extras (ex: telefone WhatsApp).
 */
function startChatEngine(conversationFlow, config = {}) {
  window.chatConfig = config;
  window.conversationFlow = conversationFlow;
  window.chatState = {
    step: 'start',
    name: getSavedUserName() || '',
    topic: '',
  };
  renderStep(window.chatState.step);
}

/**
 * Renderiza um passo do chat na tela.
 * @param {string} stepKey - Chave do passo atual no fluxo.
 */
function renderStep(stepKey) {
  const step = window.conversationFlow[stepKey];
  if (!step) {
    console.warn(`Passo "${stepKey}" não encontrado no fluxo.`);
    return;
  }

  window.chatState.step = stepKey;
  registrarMetrica(stepKey);

  const messageBox = document.getElementById('chat-messages');
  const optionsBox = document.getElementById('options-container');
  const typing = document.getElementById('typing-indicator');
  const statusText = document.getElementById('status-text');

  // Limpa opções e mostra indicador de digitação
  optionsBox.innerHTML = '';
  if (typing) typing.classList.remove('hidden');
  if (statusText) statusText.innerText = 'Digitando...';

  // Obtém texto da mensagem (string ou função que recebe nome)
  let textContent =
    typeof step.message === 'function'
      ? step.message(window.chatState.name)
      : step.message;

  // Calcula tempo de digitação: mínimo 700ms, máximo 3s, proporcional ao tamanho da mensagem
  const typingTime = Math.min(
    3000,
    Math.max(700, (textContent || '').length * 18)
  );

  setTimeout(() => {
    if (typing) typing.classList.add('hidden');
    if (statusText) statusText.innerText = 'Online agora';

    // Cria e exibe a mensagem do bot
    const botMessage = document.createElement('div');
    botMessage.className = 'message bot-message';
    botMessage.innerHTML = (textContent || '').replace(/\n/g, '<br>');
    messageBox.appendChild(botMessage);
    messageBox.scrollTop = messageBox.scrollHeight;

    // Se o passo espera input de texto
    if (step.input) {
      const inputContainer = document.createElement('div');
      inputContainer.className = 'input-container';

      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'chat-input';

      // Placeholder personalizado
      if (step.placeholder) {
        input.placeholder = step.placeholder;
      } else if (stepKey === 'start') {
        input.placeholder = 'Digite seu nome...';
      } else {
        input.placeholder = 'Digite aqui...';
      }

      const sendButton = document.createElement('button');
      sendButton.className = 'send-button';
      sendButton.textContent = 'Enviar';

      // Função para enviar o valor digitado
      const handleInputSubmit = () => {
        const value = input.value.trim();

        if (value || stepKey === 'start') {
          // Exibe mensagem do usuário
          const userMessage = document.createElement('div');
          userMessage.className = 'message user-message';
          userMessage.textContent = value || 'Visitante';
          messageBox.appendChild(userMessage);
          messageBox.scrollTop = messageBox.scrollHeight;

          // Executa função onInput se existir no passo
          if (typeof step.onInput === 'function') {
            step.onInput(value);
          } else {
            // Comportamento padrão para salvar nome e tópico
            if (stepKey === 'start') {
              window.chatState.name = value || 'Visitante';
              saveUserName(window.chatState.name);
            } else if (stepKey === 'rsvp_contact') {
              window.chatState.name = value || 'Visitante';
              saveUserName(window.chatState.name);
            } else if (stepKey === 'ask_topic') {
              window.chatState.topic = value || '';
            }
          }

          // Avança para o próximo passo definido em step.next
          if (step.next) {
            renderStep(step.next);
          } else {
            // fallback para casos sem step.next definido
            if (stepKey === 'start') {
              renderStep('intro'); // passo padrão após o start
            } else if (stepKey === 'rsvp_contact') {
              renderStep('ask_topic');
            } else if (stepKey === 'ask_topic') {
              renderStep('show_cta');
            }
          }
        }
      };

      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleInputSubmit();
      });
      sendButton.addEventListener('click', handleInputSubmit);

      inputContainer.appendChild(input);
      inputContainer.appendChild(sendButton);
      optionsBox.appendChild(inputContainer);
      input.focus();

    // Se o passo tem opções de resposta (botões)
    } else if (step.options) {
      step.options.forEach((option) => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = option.text;

        button.addEventListener('click', () => {
          // Exibe mensagem do usuário
          const userMessage = document.createElement('div');
          userMessage.className = 'message user-message';
          userMessage.textContent = option.text;
          messageBox.appendChild(userMessage);
          messageBox.scrollTop = messageBox.scrollHeight;

          // Tratamento especial para ações específicas
          if (option.next === 'go_whatsapp') {
            const phone =
              (window.chatConfig && window.chatConfig.phone) || '5582987353564';
            const msg = encodeURIComponent(
              `Olá, meu nome é ${
                window.chatState.name || 'Visitante'
              } e gostaria de falar sobre: ${window.chatState.topic || ''}`
            );
            window.location.href = `https://wa.me/${phone}?text=${msg}`;
            return;
          }

          // Se opção redireciona para outro fluxo via query params
          if (option.next === 'rsvp' || option.next === 'negocios') {
            const base = window.location.pathname;
            window.location.href =
              base + (option.next === 'rsvp' ? '?rsvp' : '?negocios');
            return;
          }

          // Passa para o próximo passo do fluxo
          renderStep(option.next);
        });

        optionsBox.appendChild(button);
      });

    // Se o passo tem um CTA (botão-link)
    } else if (step.cta) {
      const ctaButton = document.createElement('a');
      ctaButton.className = 'cta-button';
      ctaButton.textContent = step.cta.text;
      ctaButton.href =
        typeof step.cta.url === 'function' ? step.cta.url() : step.cta.url;
      ctaButton.target = '_blank';
      optionsBox.appendChild(ctaButton);
    }
  }, typingTime);
}

// Expor as funções para uso externo, se necessário
window.startChatEngine = startChatEngine;
window.renderStep = renderStep;
window.saveUserName = saveUserName;
window.getSavedUserName = getSavedUserName;
window.registrarMetrica = registrarMetrica;
