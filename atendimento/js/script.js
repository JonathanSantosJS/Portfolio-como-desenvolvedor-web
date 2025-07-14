let chatState = {
  step: 'start',
  name: '',
  messageToSend: '',
};

const conversationFlow = {
  start: {
    message:
      'Olá! 👋 Sou a Eloise, assistente virtual do Jônathan. Antes de começarmos, qual o seu nome?',
    input: true,
  },
  main_options: {
    message: (name) =>
      `Muito bem, ${name}! Sobre o que você gostaria de falar hoje?`,
    options: [
      { text: 'Criação de site ou convite digital 💻', next: 'site_info' },
      {
        text: 'Falar sobre um produto que vi nos stories 📲',
        next: 'product_info_check',
      },
      {
        text: 'Assunto pessoal ou confidencial 🔒',
        next: 'personal_sensitive_check',
      },
    ],
  },
  site_info: {
    message:
      'Ótimo! Você pode descrever brevemente o que precisa? Vou repassar isso ao Jônathan. ✍️',
    input: true,
  },
  product_info_check: {
    message:
      'Legal! Esse produto que você viu é voltado para saúde, alimentação e bem-estar feminino. É isso mesmo que você quer saber? 👀',
    options: [
      { text: 'Sim, é esse mesmo ✅', next: 'product_info_summary' },
      { text: 'Não, era outra coisa 🙅‍♀️', next: 'site_info' },
    ],
  },
  product_info_summary: {
    message: () => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `
      <div class="product-container">
        <div class="product-image-wrapper">
          <div class="loading-state">Carregando</div>
          <img src="img/produto.webp" 
               alt="Guia de Alimentação Saudável" 
               class="product-image" />
          <div class="error-state">
            Imagem não disponível. Continue para ver detalhes.
          </div>
        </div>
        <div class="product-description">
          <p>Esse produto é um guia prático criado por um especialista. Ele ajuda mulheres a melhorarem sua relação com a alimentação sem dietas malucas. 😍</p>
          <p>Quer saber mais sobre ele direto no chat personalizado?</p>
        </div>
      </div>
    `;

      const img = wrapper.querySelector('img');
      const loading = wrapper.querySelector('.loading-state');
      const error = wrapper.querySelector('.error-state');

      img.onload = () => {
        img.classList.add('loaded');
        loading.style.display = 'none';
      };

      img.onerror = () => {
        loading.style.display = 'none';
        error.style.display = 'flex';
      };

      return wrapper;
    },
    options: [
      {
        text: 'Quero sim, me leva até lá 🚀',
        next: 'redirect_to_product_chat',
      },
      {
        text: 'Não, era só curiosidade 😊',
        next: 'site_info',
      },
    ],
  },

  redirect_to_product_chat: {
    message:
      'Clique abaixo para acessar o chat exclusivo sobre esse produto! Lá você terá todas as informações detalhadas. 💬👇',
    cta: {
      text: 'Ir para o chat do produto 🔗',
      url: 'https://webjs.com.br/chat',
    },
  },
  personal_sensitive_check: {
    message:
      'Esse assunto envolve dados sensíveis como senha bancária, CPF ou informações sigilosas? 🔐',
    options: [
      { text: 'Sim, é confidencial 🛡️', next: 'sensitive_direct' },
      {
        text: 'Não, posso descrever aqui mesmo 📝',
        next: 'describe_personal_message',
      }, // Alterado para um novo passo
    ],
  },

  // Adicionando este novo passo
  describe_personal_message: {
    message:
      'Entendi! Por favor, descreva brevemente sobre o que gostaria de conversar. Vou repassar ao Jônathan. ✍️',
    input: true,
  },

  sensitive_direct: {
    message: (name) =>
      `Tudo bem, ${name}. Por segurança, clique no botão abaixo para falar diretamente com o Jônathan.`,
    cta: {
      text: '🔒 Falar diretamente com o Jônathan',
      url: () => {
        const phone = '5582987353564';
        const encodedMsg = encodeURIComponent(
          `Jônathan, ${chatState.name} precisa falar diretamente com você.`
        );
        return `https://wa.me/${phone}?text=${encodedMsg}`;
      },
    },
  },

  // Adicionando este passo para finalizar
  forward_message: {
    message: (name) =>
      `Obrigado, ${name}! Sua mensagem foi registrada e será encaminhada ao Jônathan. Ele entrará em contato em breve. 📨`,
    cta: {
      text: 'Enviar mensagem no WhatsApp',
      url: () => {
        const phone = '5582987353564';
        const encodedMsg = encodeURIComponent(
          `Olá Jônathan, sou ${chatState.name}. Acabei de conversar com a Eloise:\n\n"${chatState.messageToSend}"`
        );
        return `https://wa.me/${phone}?text=${encodedMsg}`;
      },
    },
  },
};

function renderStep(stepKey) {
  const step = conversationFlow[stepKey];
  if (!step) return;

  chatState.step = stepKey;
  const messagesContainer = document.getElementById('chat-messages');
  const optionsContainer = document.getElementById('options-container');
  const typingIndicator = document.getElementById('typing-indicator');
  const statusIndicator = document.getElementById('status-indicator');
  const statusText = document.getElementById('status-text');

  optionsContainer.innerHTML = '';
  typingIndicator.classList.remove('hidden');
  if (statusIndicator) statusIndicator.classList.replace('online', 'typing');
  if (statusText) statusText.textContent = 'Digitando...';

  const content =
    typeof step.message === 'function'
      ? step.message(chatState.name)
      : step.message;

  const typingTime = Math.min(3000, Math.max(1000, content.length * 20));

  setTimeout(() => {
    typingIndicator.classList.add('hidden');
    if (statusIndicator) statusIndicator.classList.replace('typing', 'online');
    if (statusText) statusText.textContent = 'Online agora';

    const botMessage = document.createElement('div');
    botMessage.className = 'message bot-message';
    if (typeof content === 'string') {
      botMessage.innerHTML = content.replace(/\n/g, '<br>');
    } else {
      botMessage.innerHTML = '';
      botMessage.appendChild(content);
    }

    messagesContainer.appendChild(botMessage);
    smoothScrollToBottom(messagesContainer);

    if (step.input) {
      setupInputField(messagesContainer, optionsContainer, stepKey);
    } else if (step.options) {
      setupOptionsButtons(messagesContainer, optionsContainer, step.options);
    } else if (step.cta) {
      setupCallToAction(optionsContainer, step.cta);
    }

    if (step.next) {
      setTimeout(() => renderStep(step.next), 2000);
    }
  }, typingTime);
}

function smoothScrollToBottom(element) {
  element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
}

function setupInputField(messagesContainer, optionsContainer, stepKey) {
  const inputContainer = document.createElement('div');
  inputContainer.className = 'input-container';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Digite aqui...';
  input.className = 'chat-input';
  input.id = 'chat-input-field';

  const sendButton = document.createElement('button');
  sendButton.className = 'send-button';
  sendButton.innerText = 'Enviar';

  const handleSubmit = () => {
    const value = input.value.trim();
    if (!value) return;

    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.textContent = value;
    messagesContainer.appendChild(userMessage);
    smoothScrollToBottom(messagesContainer);
    input.value = '';

    if (stepKey === 'start') {
      chatState.name = value;
      renderStep('main_options');
    } else {
      chatState.messageToSend = value;
      renderStep('forward_message');
    }
  };

  sendButton.addEventListener('click', handleSubmit);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSubmit();
  });

  inputContainer.appendChild(input);
  inputContainer.appendChild(sendButton);
  optionsContainer.appendChild(inputContainer);
  input.focus();
}

function setupOptionsButtons(messagesContainer, optionsContainer, options) {
  options.forEach((option) => {
    const button = document.createElement('button');
    button.className = 'option-button';
    button.textContent = option.text;

    button.addEventListener('click', () => {
      const userChoice = document.createElement('div');
      userChoice.className = 'message user-message';
      userChoice.textContent = option.text;
      messagesContainer.appendChild(userChoice);
      smoothScrollToBottom(messagesContainer);
      renderStep(option.next);
    });

    optionsContainer.appendChild(button);
  });
}

function setupCallToAction(optionsContainer, cta) {
  const url = typeof cta.url === 'function' ? cta.url() : cta.url;
  const ctaButton = document.createElement('a');
  ctaButton.className = 'cta-button';
  ctaButton.href = url;
  ctaButton.target = '_blank';
  ctaButton.textContent = cta.text;
  optionsContainer.appendChild(ctaButton);
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => renderStep('start'), 500);
});
