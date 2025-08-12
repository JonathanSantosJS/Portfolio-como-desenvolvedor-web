// helena_padrao.js

window.conversationFlow = {
  start: {
    message: 'Olá! 👋 Eu sou a Helena, assistente virtual do Jônathan. Qual seu nome? 😊',
    input: true,
  },
  intro: {  // renomeado de after_name para intro para alinhar com script.js
    message: (name) =>
      `Prazer, ${name}! Você sabia que mais de 70% dos consumidores pesquisam online antes de contratar um serviço? Se seu negócio ainda não tem presença digital, pode estar perdendo clientes todos os dias. 😱 Mas fica tranquilo, eu tô aqui pra ajudar! Quer saber como?`,
    options: [
        { text: 'Claro, quero saber!', next: 'education' },
        { text: 'Prefiro visitar o site', next: 'go_site' },
        { text: 'Fala diretamente com Jônathan', next: 'ask_topic' },
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
      url: '', // será gerado dinamicamente no script.js/chatCore.js
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


// Iniciar o chat usando chatCore.js
window.addEventListener('DOMContentLoaded', () => {
  if (window.startChatEngine) {
    window.startChatEngine(conversationFlow, {
      phone: '5582987353564', // coloque seu telefone real aqui
    });
  } else {
    console.error('Motor do chat não encontrado. Verifique se chatCore.js foi carregado.');
  }
});
