let chatState = {
  step: 'start',
  name: '',
};

function registrarMetrica(stepKey) {
  const dados = JSON.parse(localStorage.getItem('chat_metrics') || '{}');
  dados[stepKey] = (dados[stepKey] || 0) + 1;
  localStorage.setItem('chat_metrics', JSON.stringify(dados));
}

const conversationFlow = {
  start: {
    message: 'Olá! 👋 Eu sou a Helena, assistente virtual do Jônathan. Qual seu nome? 😊',
    input: true,
  },
  intro: {
    message: (name) =>
      `Prazer, ${name}! Você sabia que mais de 70% dos consumidores pesquisam online antes de contratar um serviço? Se seu negócio ainda não tem presença digital, pode estar perdendo clientes todos os dias. 😱 Mas fica tranquilo, eu tô aqui pra ajudar! Quer saber como?`,
    options: [
      { text: 'Fala diretamente com Jônathan', next: 'ask_topic'},
      { text: 'Claro, quero saber!', next: 'education' },
      { text: 'Prefiro visitar o site', next: 'go_site' },
    ],
  },
  education: {
    message:
      'Ter um site profissional não é só “estar na internet”. É sobre transmitir confiança, ser encontrado no Google, e facilitar o contato com seus clientes — tudo isso com um visual bonito e rápido, feito sob medida pra você. Aqui na WebJS, criamos sites que funcionam bem no celular, têm botão direto pro WhatsApp e integração com Google Maps. Também temos chatbots para automatizar seu atendimento! 🤖 Quer saber sobre nossos pacotes e preços?',
    options: [
      { text: 'Sim, quero os pacotes', next: 'pricing' },
      { text: 'Prefiro visitar o site', next: 'go_site' },
    ],
  },
  pricing: {
    message:
      'Nossos pacotes são acessíveis e pensados pra você:\n\n' +
      '💻 Presença Online — R$297\n1 página única, design responsivo, botão WhatsApp\n\n' +
      '⭐ Profissional Local — R$897 (mais vendido)\nAté 5 páginas, SEO local, WhatsApp e Google Maps\n\n' +
      '🤖 Chatbot Inteligente — R$197\nAtendimento 24h, fluxo personalizado, integração WhatsApp\n\n' +
      '🎉 Convite Digital — R$147\nLayout personalizado, RSVP automático, galeria e contagem regressiva\n\n' +
      'Quer que eu te envie o link para o site para escolher ou prefere conversar direto com Jônathan pelo WhatsApp?',
    options: [
      { text: 'Enviar link do site', next: 'go_site' },
      { text: 'Quero falar no WhatsApp', next: 'ask_topic' },
    ],
  },
  ask_topic: {
    message: 'Pra eu entender melhor, me conta rapidinho qual o assunto que quer tratar com o Jônathan?',
    input: true,
  },
  show_cta: {
    message:
      'Beleza! Agora é só clicar no botão abaixo para enviar sua mensagem no WhatsApp para o Jônathan, ou visitar o site para conhecer mais sobre nossos serviços.',
    options: [
      { text: 'Enviar mensagem no WhatsApp 📲', next: 'go_whatsapp' },
      { text: 'Visitar site oficial 🌐', next: 'go_site' },
    ],
  },
  go_whatsapp: {
    message: 'Abrindo WhatsApp para você enviar sua mensagem. Aguarde…',
    cta: {
      text: 'Abrir WhatsApp',
      url: '',
    },
  },
  go_site: {
    message:
      'Aqui está o link para o site oficial da WebJS. Fique à vontade para explorar e escolher o melhor pacote para você! 🌟',
    cta: {
      text: 'Visitar webjs.com.br',
      url: 'https://webjs.com.br/',
    },
  },
  end_chat: {
    message: 'Obrigado pelo contato! Qualquer coisa, estarei aqui para ajudar. Até mais! 👋',
  },
};

function renderStep(stepKey) {
  const step = conversationFlow[stepKey];
  if (!step) return;

  chatState.step = stepKey;
  registrarMetrica(stepKey);

  const messageBox = document.getElementById('chat-messages');
  const optionsBox = document.getElementById('options-container');
  const typing = document.getElementById('typing-indicator');
  const statusText = document.getElementById('status-text');

  optionsBox.innerHTML = '';
  typing.classList.remove('hidden');
  if (statusText) statusText.innerText = 'Digitando...';

  let textContent =
    typeof step.message === 'function' ? step.message(chatState.name) : step.message;

  const typingTime = Math.min(3000, Math.max(1000, textContent.length * 20));

  setTimeout(() => {
    typing.classList.add('hidden');
    if (statusText) statusText.innerText = 'Online agora';

    const botMessage = document.createElement('div');
    botMessage.className = 'message bot-message';
    botMessage.innerHTML = textContent.replace(/\n/g, '<br>');
    messageBox.appendChild(botMessage);
    messageBox.scrollTop = messageBox.scrollHeight;

    if (step.input) {
      const inputContainer = document.createElement('div');
      inputContainer.className = 'input-container';

      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'chat-input';
      input.placeholder = stepKey === 'start' ? 'Digite seu nome...' : 'Digite aqui...';

      const sendButton = document.createElement('button');
      sendButton.className = 'send-button';
      sendButton.textContent = 'Enviar';

      const handleInputSubmit = () => {
        const value = input.value.trim();
        if (value || stepKey === 'start') {
          const userMessage = document.createElement('div');
          userMessage.className = 'message user-message';
          userMessage.textContent = value || 'Amiga';
          messageBox.appendChild(userMessage);
          messageBox.scrollTop = messageBox.scrollHeight;

          if (stepKey === 'start') {
            chatState.name = value || 'Amiga';
            renderStep('intro');
          } else if (stepKey === 'ask_topic') {
            chatState.topic = value;
            renderStep('show_cta');
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
    } else if (step.options) {
      step.options.forEach((option) => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = option.text;

        button.addEventListener('click', () => {
          const userMessage = document.createElement('div');
          userMessage.className = 'message user-message';
          userMessage.textContent = option.text;
          messageBox.appendChild(userMessage);
          messageBox.scrollTop = messageBox.scrollHeight;

          if (option.next === 'go_whatsapp') {
            const phone = '5582987353564'; // Troque para seu número real
            const msg = encodeURIComponent(
              `Olá, meu nome é ${chatState.name} e gostaria de falar sobre: ${chatState.topic}`
            );
            conversationFlow.go_whatsapp.cta.url = `https://wa.me/${phone}?text=${msg}`;
          }

          renderStep(option.next);
        });

        optionsBox.appendChild(button);
      });
    } else if (step.cta) {
      const ctaButton = document.createElement('a');
      ctaButton.className = 'cta-button';
      ctaButton.textContent = step.cta.text;
      ctaButton.href = step.cta.url;
      ctaButton.target = '_blank';
      optionsBox.appendChild(ctaButton);
    }
  }, typingTime);
}

document.addEventListener('DOMContentLoaded', () => {
  renderStep(chatState.step);
});
