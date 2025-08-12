window.conversationFlow = {
  start: {
    message: 'Olá! 👋 Aqui é a Helena, pronta para ajudar com seus convites digitais RSVP. Você já conhece nosso serviço de convite online para festas e eventos?',
    options: [
      { text: 'Sim, quero saber mais detalhes', next: 'rsvp_details' },
      { text: 'Não, me explique o serviço', next: 'rsvp_explain' },
      { text: 'Quero falar com Jônathan', next: 'rsvp_contact' },
    ],
  },

  rsvp_explain: {
    message: 'Nosso convite digital RSVP permite que você envie convites online para seus convidados, com confirmação automática, galeria de fotos, contagem regressiva para o evento e muito mais! Tudo simples e prático, sem papelada e com total controle na palma da mão. Quer saber sobre preço e o pacote?',
    options: [
      { text: 'Sim, quero o pacote', next: 'rsvp_pricing' },
      { text: 'Prefiro falar com Jônathan', next: 'rsvp_contact' },
    ],
  },

  rsvp_details: {
    message: 'Com nosso RSVP digital, você cria convites personalizados, acompanha confirmações em tempo real, compartilha galerias exclusivas e ainda conta com suporte dedicado. Ideal para festas, aniversários, casamentos e eventos corporativos. Quer ver o pacote e o preço?',
    options: [
      { text: 'Sim, quero o pacote', next: 'rsvp_pricing' },
      { text: 'Quero falar com Jônathan', next: 'rsvp_contact' },
    ],
  },

  rsvp_pricing: {
    message: 'Nosso pacote Convite Digital com RSVP inclui:\n\n' +
      '🎨 Layout personalizado (tema infantil, casamento etc.)\n' +
      '✅ RSVP com confirmação automática\n' +
      '🖼️ Galeria de fotos e localização\n' +
      '⏳ Contagem regressiva do evento\n\n' +
      'Tudo isso por apenas R$147,00!\n\n' +
      'Quer que eu envie o link para você escolher ou prefere conversar direto com o Jônathan pelo WhatsApp?',
    options: [
      { text: 'Enviar link do site', next: 'rsvp_link' },
      { text: 'Falar no WhatsApp', next: 'rsvp_contact' },
    ],
  },

  rsvp_link: {
    message: 'Aqui está o link para o site oficial com os detalhes completos do RSVP. Fique à vontade! 🌐',
    cta: {
      text: 'Visitar webjs.com.br',
      url: 'https://webjs.com.br',
    },
  },

  rsvp_contact: {
    message: 'Por favor, me diga seu nome.',
    input: true,
    next: 'ask_topic',
    onInput: (input) => {
      window.chatState.name = input.trim() || 'Visitante';
      window.saveUserName(window.chatState.name);
    },
  },

  ask_topic: {
    message: 'Agora me conta rapidinho: qual o tipo de evento você quer criar o convite RSVP? (aniversário, casamento, etc.)',
    input: true,
    next: 'show_cta',
    onInput: (input) => {
      window.chatState.topic = input.trim() || '';
    },
  },

  show_cta: {
    message: () => {
      const name = window.chatState?.name || 'Visitante';
      return `Obrigado, ${name}! Agora é só clicar no botão abaixo para enviar sua mensagem no WhatsApp para o Jônathan, ou visitar o site para conhecer mais sobre nossos serviços.`;
    },
    options: [
      { text: 'Enviar mensagem no WhatsApp 📲', next: 'go_whatsapp' },
      { text: 'Visitar site oficial 🌐', next: 'rsvp_link' },
    ],
  },

  go_whatsapp: {
    message: 'Abrindo WhatsApp para você enviar sua mensagem. Aguarde…',
    cta: {
      text: 'Abrir WhatsApp',
      url: () => {
        const phone = (window.chatConfig && window.chatConfig.phone) || '5582987353564';
        const name = window.chatState?.name || 'Visitante';
        const topic = window.chatState?.topic || 'Convite Digital RSVP';
        return `https://wa.me/${phone}?text=${encodeURIComponent(
          `Olá, meu nome é ${name} e gostaria de falar sobre: ${topic}`
        )}`;
      },
    },
  },
};
