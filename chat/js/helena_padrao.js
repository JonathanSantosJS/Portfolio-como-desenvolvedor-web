// helena_padrao.js

window.conversationFlow = {
  start: {
    message: 'Olá! 👋 Eu sou a Helena, assistente virtual do Jônathan. Qual seu nome? 😊',
    input: true,
    next: 'intro',
  },

  // 🔹 Conecta com o vídeo
  intro: {
    message: (name) =>
      `Prazer, ${name}. Deixa eu te fazer uma pergunta sincera.\n\nHoje, se alguém procurar o seu serviço no Google, você sabe exatamente o que essa pessoa vai encontrar?`,
    options: [
      { text: 'Nunca pensei nisso', next: 'pain_1' },
      { text: 'Acho que só minhas redes sociais', next: 'pain_1' },
      { text: 'Tenho site ou algo parecido', next: 'has_site' },
    ],
  },

  // 🔹 Amplia a dor
  pain_1: {
    message:
      'Isso é mais comum do que parece. O problema é que, nesse momento, muita gente compara opções e escolhe quem transmite mais confiança.\n\nPosso te perguntar rapidinho: qual é o tipo do seu negócio?',
    options: [
      { text: 'Comércio local', next: 'segment' },
      { text: 'Prestador de serviço', next: 'segment' },
      { text: 'Clínica / saúde', next: 'segment' },
      { text: 'Outro', next: 'segment' },
    ],
  },

  has_site: {
    message:
      'Legal. Ter um site já ajuda bastante. Mas me conta: ele realmente gera contatos ou está mais parado?',
    options: [
      { text: 'Quase não gera', next: 'segment' },
      { text: 'Gera, mas poderia melhorar', next: 'segment' },
      { text: 'Funciona bem', next: 'segment' },
    ],
  },

  // 🔹 Termômetro + autoridade
  segment: {
    message:
      'Perfeito. Muitos negócios como o seu acabam perdendo oportunidades simplesmente porque não têm um ponto central online que organize tudo.\n\nÉ exatamente isso que o Jônathan faz: ajuda empreendedores locais a transformarem presença digital em algo que realmente funcione.',
    options: [
      { text: 'Como assim?', next: 'authority' },
      { text: 'Prefiro ver direto no site', next: 'go_site' },
      { text: 'Quero falar com ele', next: 'ask_topic' },
    ],
  },

  // 🔹 Autoridade sem pitch
  authority: {
    message:
      'Ele cria sites pensados para negócios reais, com foco em:\n\n' +
      '✔ ser encontrado no Google\n' +
      '✔ passar mais confiança\n' +
      '✔ facilitar o contato pelo WhatsApp\n' +
      '✔ funcionar perfeitamente no celular\n\nNada de site bonito que não gera resultado.\n\nComo você prefere continuar?',
    options: [
      { text: 'Quero entender melhor', next: 'soft_offer' },
      { text: 'Quero falar com ele direto', next: 'ask_topic' },
      { text: 'Ver no site', next: 'go_site' },
    ],
  },

  // 🔹 Oferta suave
  soft_offer: {
    message:
      'Existem soluções diferentes dependendo do momento do negócio — desde presença básica até projetos mais completos.\n\nVocê prefere analisar isso com calma no site ou conversar direto com o Jônathan para entender o que faz mais sentido pra você?',
    options: [
      { text: 'Conversar com ele', next: 'ask_topic' },
      { text: 'Ver no site', next: 'go_site' },
    ],
  },

  // 🔹 Captura de intenção
  ask_topic: {
    message:
      'Perfeito 😊 Me conta rapidinho qual é a sua dúvida ou o que você gostaria de melhorar no seu negócio.',
    input: true,
    next: 'show_cta',
  },

  show_cta: {
    message:
      'Show! Agora é só escolher como prefere continuar 👇',
    options: [
      { text: 'Falar com o Jônathan no WhatsApp 📲', next: 'go_whatsapp' },
      { text: 'Visitar o site 🌐', next: 'go_site' },
    ],
  },

  go_whatsapp: {
    message: 'Abrindo o WhatsApp para você continuar a conversa…',
    cta: {
      text: 'Abrir WhatsApp',
      url: '',
    },
  },

  go_site: {
    message:
      'Aqui está o site oficial da WebJS. Fique à vontade para explorar 👇',
    cta: {
      text: 'Visitar webjs.com.br',
      url: 'https://webjs.com.br/',
    },
  },

  end_chat: {
    message: 'Qualquer coisa, estarei por aqui. 😊',
  },
};

// init
window.addEventListener('DOMContentLoaded', () => {
  if (window.startChatEngine) {
    window.startChatEngine(conversationFlow, {
      phone: '5582987353564',
    });
  }
});
