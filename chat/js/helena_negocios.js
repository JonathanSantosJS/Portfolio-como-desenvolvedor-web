window.conversationFlow = {
  start: {
    message: 'Olá! 👋 Eu sou a Helena, assistente virtual da WebJS. Antes de mais nada, fico feliz que você esteja aqui buscando novas ideias para o seu negócio. 😊 Qual é o seu nome?',
    input: true,
    next: 'intro',
    onInput: (input) => {
      window.chatState = window.chatState || {};
      window.chatState.name = input.trim();
    }
  },

  intro: {
    message: () => {
      const name = window.chatState?.name || 'Visitante';
      return `Prazer em falar com você, ${name}! 🎯 Me diga, você gostaria de aumentar clientes e vendas do seu negócio usando presença digital e automação inteligente? Posso te mostrar como fazemos isso de forma simples e eficaz.`;
    },
    options: [
      { text: 'Sim, quero saber!', next: 'business_details' },
      { text: 'Visitar site', next: 'go_site' },
      { text: 'Prefiro falar direto com Jônathan', next: 'ask_topic' },
    ],
  },

  business_details: {
    message:
      'Trabalhamos para transformar negócios em referências no mercado local:\n\n' +
      '📈 **Marketing Digital** para atrair clientes certos\n' +
      '🌐 **Sites Profissionais** que passam credibilidade\n' +
      '🤖 **Chatbots Inteligentes** para atendimento 24h\n\n' +
      'Quer conhecer nossos pacotes mais indicados para empresários como você?',
    options: [
      { text: 'Sim, mostrar pacotes', next: 'business_packages' },
      { text: 'Prefiro falar com Jônathan', next: 'ask_topic' },
    ],
  },

  business_packages: {
    message:
      'Olha só o que preparamos para negócios que querem crescer rápido:\n\n' +
      
      '⭐ **Profissional Local** — R$897,00 *(Mais vendido)*\n' +
      '- Site com até 5 páginas\n' +
      '- SEO local (Google Meu Negócio)\n' +
      '- Integração com WhatsApp e Google Maps\n\n' +
      
      '💻 **Presença Online** — R$297,00\n' +
      '- Página única profissional (landing page)\n' +
      '- Design responsivo (celular e desktop)\n' +
      '- Botão direto para WhatsApp\n\n' +
      
      '🤖 **Chatbot Inteligente** — R$197,00\n' +
      '- Fluxo personalizado para seu atendimento\n' +
      '- Integração com WhatsApp Business\n' +
      '- Atendimento automático 24h\n\n' +
      'Quer que eu envie o link do site ou prefere conversar direto com o Jônathan pelo WhatsApp?',
    options: [
      { text: 'Visitar site', next: 'go_site' },
      { text: 'Falar no WhatsApp', next: 'ask_topic' },
    ],
  },

  ask_topic: {
    message: 'Antes de te passar para o Jônathan, me conta rapidinho: qual o assunto que você quer tratar com ele? 😉',
    input: true,
    next: 'show_cta',
    onInput: (input) => {
      window.chatState = window.chatState || {};
      window.chatState.topic = input.trim();
    }
  },

  show_cta: {
    message: () => {
      const name = window.chatState?.name || 'Visitante';
      const topic = window.chatState?.topic || '(assunto não informado)';
      return `Perfeito, ${name}! 📩 Então vamos encaminhar sua mensagem sobre "${topic}" para o Jônathan agora mesmo.`;
    },
    options: [
      { text: 'Enviar mensagem no WhatsApp 📲', next: 'go_whatsapp' },
      { text: 'Visitar site oficial 🌐', next: 'go_site' },
    ],
  },

  go_whatsapp: {
    message: 'Abrindo WhatsApp para você enviar sua mensagem. Aguarde…',
    cta: {
      text: 'Abrir WhatsApp',
      url: () => {
        const phone = '5582987353564';
        const name = window.chatState?.name || 'Visitante';
        const topic = window.chatState?.topic || '';
        return `https://wa.me/${phone}?text=${encodeURIComponent(
          `Olá, meu nome é ${name} e gostaria de falar sobre: ${topic}`
        )}`;
      },
    },
  },

  go_site: {
    message: 'Aqui está o link para o site oficial da WebJS. Explore nossas soluções e inspire-se! 🌟',
    cta: {
      text: 'Visitar webjs.com.br',
      url: 'https://webjs.com.br/',
    },
  },
};

window.addEventListener('DOMContentLoaded', () => {
  if (window.startChatEngine) {
    window.startChatEngine(window.conversationFlow, {
      phone: '5582987353564',
    });
  } else {
    console.error('Motor do chat não encontrado. Verifique se chatCore.js foi carregado.');
  }
});

