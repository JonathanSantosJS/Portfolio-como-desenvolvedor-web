let chatState = {
  step: 'start',
  name: '',
  diagnosticFinal: '',
};

const conversationFlow = {
  start: {
    message: 'Oi! Posso saber seu nome antes da gente começar? 😊',
    input: true,
  },

  emotion_prompt: {
    message: (name) =>
      `Ei, ${name}... posso te perguntar uma coisa meio pessoal? Você já se sentiu exausta tentando cuidar de tudo — da casa, do trabalho, da família — e mesmo assim parece que nunca sobra tempo pra cuidar de você? 😓`,
    options: [
      { text: 'Sim… já senti isso 😔', next: 'story_open' },
      { text: 'Não muito', next: 'neutral_exit' },
    ],
  },

  neutral_exit: {
    message:
      'Tudo bem! Às vezes a rotina pesa diferente pra cada mulher. 💭 Mas talvez você conheça alguém que vive esse desafio — posso te mostrar um conteúdo pra compartilhar com ela?',
    options: [
      { text: 'Quero ver pra indicar 💌', next: 'share_link_chat' },
      { text: 'Prefiro encerrar por enquanto 🕊️', next: 'end_chat' },
    ],
  },

  story_open: {
    message:
      'A Maria também se sentia assim. Cuidava de todos, mas não conseguia cuidar dela mesma. Até que encontrou um conteúdo simples que virou a chave. Posso te contar como ela começou a mudar isso?',
    options: [
      { text: 'Quero saber sim! 💚', next: 'show_evidence' },
      { text: 'Me identifiquei muito…', next: 'show_evidence' },
    ],
  },

  show_evidence: {
    message:
      'Ela descobriu um guia digital criado por um nutricionista — nada radical, só práticas reais que encaixam na vida corrida. Sem cortar pãozinho, sem precisar de academia. Quer ver como ele funciona?',
    options: [
      { text: 'Sim, mostra 🧠', next: 'method_summary' },
      { text: 'Parece bom demais… 🤨', next: 'objection_too_good' },
    ],
  },

  method_summary: {
    message:
      '📘 O Guia ensina:\n\n✅ Como perder peso sem passar fome\n✅ Como comer bem sem culpa\n✅ Como manter resultados sem sacrifício\n\nTudo com base científica, criado por Yuri Viana — nutricionista especializado em saúde da mulher. Com acesso imediato por R$50 e garantia de reembolso!',
    options: [
      { text: 'Quero garantir o guia 🚀', next: 'go_checkout' },
      { text: 'Ainda tenho dúvidas… 🤔', next: 'final_doubt' },
    ],
  },

  objection_too_good: {
    message:
      'A Maria também achou bom demais… mas o autor tem formação em Nutrição Clínica pela USP, e já ajudou milhares de mulheres. Ah, e tem garantia de 7 dias: se não gostar, recebe tudo de volta. 💸',
    options: [
      { text: 'Agora faz sentido! ✅', next: 'go_checkout' },
      { text: 'Ainda tenho dúvidas…', next: 'final_doubt' },
    ],
  },

  final_doubt: {
    message:
      'Entendo perfeitamente. Me conta com sinceridade:\n👀 Você ainda tem interesse em conhecer o conteúdo do guia?\nOu prefere compartilhar esse chat com alguém que pode se interessar mais?',
    options: [
      { text: 'Ainda tô interessada! 👀', next: 'confirm_interest' },
      { text: 'Não é pra mim… mas conheço alguém 💌', next: 'share_link_chat' },
      { text: 'Acho que não quero continuar 🙏', next: 'end_chat' },
    ],
  },

  confirm_interest: {
    message:
      'Antes de te levar direto pra página, posso te perguntar rapidinho:\nQual é sua maior dificuldade hoje pra manter hábitos saudáveis?\n(Pode ser IMC, rotina, falta de tempo, compulsão…)',
    input: true,
  },

  confirm_result: {
    message: (name) =>
      `Obrigada por compartilhar isso, ${name}! 😊 Pelo que você descreveu, parece que esse guia pode te ajudar bastante.\n\nQuer que eu te leve pra página com todos os detalhes agora ou prefere encerrar por enquanto?`,
    options: [
      { text: 'Quero ver o guia completo 💻', next: 'go_checkout' },
      { text: 'Prefiro deixar pra depois 🙏', next: 'end_chat' },
    ],
  },

  go_checkout: {
    cta: {
      text: '⭐ QUERO MEU GUIA ⭐',
      url: 'https://go.hotmart.com/L100798133T',
    },
    message:
      'Clique no botão abaixo para acessar a página segura de pagamento.\n✅ Apenas R$50\n✅ Garantia de 7 dias\n✅ Acesso imediato no celular ou computador 💻📱',
  },

  share_link_chat: {
    message:
      'Obrigada por pensar nisso! 💬 Essa conversa pode ajudar alguém que esteja passando pelo mesmo…',
    cta: {
      text: '👉 Compartilhar o chat com alguém',
      url: 'https://webjs.com.br/chat',
    },
    options: [
      { text: 'Quero compartilhar, Obrigada! 🤗', next: 'end_chat' },
      { text: 'Prefiro deixar pra outra hora', next: 'end_chat' },
    ],
  },

  end_chat: {
    message:
      'Obrigada por conversar comigo! 🕊️ Quando quiser voltar, estarei aqui.\nSe quiser salvar o link para enviar depois:\n🔗 https://webjs.com.br/chat \nCuide de você com carinho — você merece. 💚',
  },
};

function renderStep(stepKey) {
  const step = conversationFlow[stepKey];
  if (!step) return;
  chatState.step = stepKey;

  const messageBox = document.getElementById('chat-messages');
  const optionsBox = document.getElementById('options-container');
  const typing = document.getElementById('typing-indicator');
  const statusText = document.getElementById('status-text');

  // Limpa as opções anteriores
  optionsBox.innerHTML = '';

  // Mostra indicador de digitação
  typing.classList.remove('hidden');
  if (statusText) statusText.innerText = 'Digitando...';

  // Obtém o conteúdo da mensagem
  const textContent =
    typeof step.message === 'function'
      ? step.message(chatState.name)
      : step.message;

  // Calcula tempo de digitação (entre 1 e 3 segundos)
  const typingTime = Math.min(3000, Math.max(1000, textContent.length * 20));

  setTimeout(() => {
    typing.classList.add('hidden');
    if (statusText) statusText.innerText = 'Online agora';

    // Adiciona mensagem do bot
    const botMessage = document.createElement('div');
    botMessage.className = 'message bot-message';
    botMessage.innerHTML = textContent.replace(/\n/g, '<br>');
    messageBox.appendChild(botMessage);
    messageBox.scrollTop = messageBox.scrollHeight;

    // Lógica para campos de input
    if (step.input) {
      const inputContainer = document.createElement('div');
      inputContainer.className = 'input-container';

      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'chat-input';
      input.placeholder =
        stepKey === 'start' ? 'Digite seu nome...' : 'Digite aqui...';

      const sendButton = document.createElement('button');
      sendButton.className = 'send-button';
      sendButton.innerHTML = 'Enviar';

      const handleInputSubmit = () => {
        const value = input.value.trim();
        if (value || stepKey === 'start') {
          // Permite nome vazio
          // Adiciona mensagem do usuário
          const userMessage = document.createElement('div');
          userMessage.className = 'message user-message';
          userMessage.textContent = value || 'Amiga';
          messageBox.appendChild(userMessage);
          messageBox.scrollTop = messageBox.scrollHeight;

          // Atualiza estado e avança para o próximo passo
          if (stepKey === 'start') {
            chatState.name = value || 'Amiga';
            renderStep('emotion_prompt');
          } else if (stepKey === 'confirm_interest') {
            chatState.diagnosticFinal = value;
            renderStep('confirm_result');
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
    }
    // Lógica para opções de botão
    else if (step.options) {
      step.options.forEach((option) => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = option.text;

        button.addEventListener('click', () => {
          // Adiciona mensagem do usuário
          const userMessage = document.createElement('div');
          userMessage.className = 'message user-message';
          userMessage.textContent = option.text;
          messageBox.appendChild(userMessage);
          messageBox.scrollTop = messageBox.scrollHeight;

          // Avança para o próximo passo
          renderStep(option.next);
        });

        optionsBox.appendChild(button);
      });
    }
    // Lógica para CTA (Call to Action)
    else if (step.cta) {
      const ctaButton = document.createElement('a');
      ctaButton.className = 'cta-button';
      ctaButton.textContent = step.cta.text;
      ctaButton.href = step.cta.url;
      ctaButton.target = '_blank';
      optionsBox.appendChild(ctaButton);
    }
  }, typingTime);
}

// Inicia o chat quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  renderStep(chatState.step);
});
