// helena_padrao_v2.js

window.conversationFlow = {
  start: {
    message:
      'Olá 👋 Eu sou a Helena, assistente da WebJS.\n\nAntes de te direcionar ao Jônathan, preciso entender rapidamente seu cenário.\n\nQual seu nome?',
    input: true,
    next: 'intro',
  },

  // 🔹 Pergunta sobre presença no Google
  intro: {
    message: (name) =>
      `Prazer, ${name}.\n\nHoje, quando alguém pesquisa seu serviço no Google, o que essa pessoa encontra?`,
    options: [
      { text: 'Só redes sociais', next: 'pain_1' },
      { text: 'Quase nada relevante', next: 'pain_1' },
      { text: 'Tenho site, mas não sei se converte', next: 'has_site' },
    ],
  },

  // 🔹 Tipo de negócio
  pain_1: {
    message:
      'Entendi.\n\nNegócios que não têm uma estrutura clara online acabam perdendo espaço para concorrentes mais organizados.\n\nQual melhor define seu negócio hoje?',
    options: [
      { text: 'Comércio local (loja física)', next: 'segment' },
      { text: 'Prestação de serviços', next: 'segment' },
      { text: 'Clínica / área da saúde', next: 'segment' },
      { text: 'Outro tipo de negócio', next: 'segment' },
    ],
  },

  // 🔹 Quem já tem site
  has_site: {
    message:
      'Perfeito.\n\nSobre seu site atual, qual situação mais se aproxima da realidade?',
    options: [
      { text: 'Quase não gera contatos', next: 'segment' },
      { text: 'Gera alguns contatos, mas poderia melhorar', next: 'segment' },
      { text: 'Funciona bem, mas quero evoluir', next: 'segment' },
    ],
  },

  // 🔹 Posicionamento estratégico
  segment: {
    message:
      'Certo.\n\nMuitos negócios locais perdem oportunidades simplesmente por não terem uma estrutura digital que organize tudo em um só lugar.\n\nO Jônathan trabalha justamente criando essa estrutura para gerar mais contato e autoridade.\n\nComo você prefere continuar?',
    options: [
      { text: 'Quero entender como funciona', next: 'authority' },
      { text: 'Prefiro analisar no site primeiro', next: 'go_site' },
      { text: 'Quero falar direto com ele', next: 'ask_topic' },
    ],
  },

  // 🔹 Explicação objetiva
  authority: {
    message:
      'O foco não é apenas ter um site bonito.\n\nÉ criar uma estrutura que:\n\n' +
      '✔ Apareça no Google\n' +
      '✔ Passe confiança\n' +
      '✔ Facilite contato no WhatsApp\n' +
      '✔ Funcione perfeitamente no celular\n\nQual próximo passo faz mais sentido para você?',
    options: [
      { text: 'Falar direto com o especialista 📲', next: 'ask_topic' },
      { text: 'Ver detalhes no site 🌐', next: 'go_site' },
    ],
  },

  // 🔹 Captura leve antes do WhatsApp
  ask_topic: {
    message:
      'Perfeito.\n\nMe conta em poucas palavras: qual principal desafio você quer resolver hoje?',
    input: true,
    next: 'show_cta',
  },

  show_cta: {
    message:
      'Ótimo.\n\nAgora é só escolher como prefere continuar 👇',
    options: [
      { text: 'Conversar no WhatsApp agora 📲', next: 'go_whatsapp' },
      { text: 'Explorar o site primeiro 🌐', next: 'go_site' },
    ],
  },

  go_whatsapp: {
    message:
      'Perfeito. Clique abaixo para continuar a conversa diretamente com o Jônathan 👇',
    cta: {
      text: 'Abrir WhatsApp',
      url: 'https://wa.me/5582987353564',
    },
  },

  go_site: {
    message:
      'Aqui está o site oficial da WebJS.\n\nFique à vontade para explorar e entender melhor a estrutura 👇',
    cta: {
      text: 'Visitar webjs.com.br',
      url: 'https://webjs.com.br/',
    },
  },

  end_chat: {
    message: 'Se precisar, estarei por aqui.',
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
