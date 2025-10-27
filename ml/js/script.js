const chat = document.getElementById("messages");
const buttonsDiv = document.getElementById("buttons");
const statusPerfil = document.getElementById("status-perfil");

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function setStatusOnline() {
  if (statusPerfil) statusPerfil.innerText = "online";
}

function setStatusDigitando() {
  if (statusPerfil) statusPerfil.innerText = "digitando...";
}

// 🟦 Mensagens iniciais
const data = [
  { texto: "Oi! Eu sou a Helena 👋, especialista em promoções e tecnologia!" },
  { texto: "Todo dia eu trago ofertas incríveis do Mercado Livre 💸" },
  { texto: "Ah, e também posso te ajudar a colocar o seu negócio na internet com a WebJS! 👩‍💻" },
  { texto: "Mas primeiro, que tal ver as ofertas que separei pra você hoje? 😍" }
];

// 🛒 Produtos
const produtos = [
  {
    id: 1,
    introducao: `🚀 Tenho uma super oferta hoje! O **Notebook Lenovo IdeaPad Slim 3** acabou de entrar na minha lista de promoções do Mercado Livre 💻

É um modelo com **Intel Core i5 (13ª geração)**, **8GB RAM DDR5** e **SSD 512GB** — ideal pra estudar, trabalhar ou jogar leve! 🎯`,
    imagem_url: "https://http2.mlstatic.com/D_NQ_NP_2X_929328-MLA96110026015_102025-F.webp",
    produto_url: "https://mercadolivre.com/sec/1QxwiNZ",
    saibaMais: [
      `✨ Tela Full HD IPS de 15.3" com cores vivas e som Dolby Audio — imagem e som de cinema! 🍿`,
      `💡 Windows 11 original, garantia de 12 meses e suporte Lenovo oficial.`,
      `📈 Avaliações ⭐⭐⭐⭐⭐ — "Desempenho ótimo pra trabalho e estudo, leve e rápido!"`,
      `⚡ Estoque limitado! Aproveite o frete full e receba em até 2 dias úteis 🚚💨`
    ]
  },
  {
  id: 2,
  introducao: `🔥 **OFERTA DO DIA!** A **Fritadeira Elétrica Air Fryer Quad Fry Elgin** — **CAMPEÃ DE VENDAS** com avaliação estelar de **4.9⭐ de 5** baseada em **859 opiniões reais**! 

Esta beleza em **preto moderno** com **4,2L de capacidade** e **1400W de potência** vai revolucionar sua cozinha! Prepare batatas crocantes, frangos dourados e salgados perfeitos com até **80% menos óleo**! 🥑`,
  imagem_url: "https://http2.mlstatic.com/D_NQ_NP_2X_603078-MLA96143989197_102025-F.webp", 
  produto_url: "https://mercadolivre.com/sec/2ZmRMXG",
  saibaMais: [
    `🎯 **Tecnologia Air Circuit 360º** - Distribuição uniforme do ar quente para resultados perfeitos em todos os alimentos!`,
    `⏱️ **Programação inteligente** - Timer de 60min com desligamento automático e controle preciso de temperatura (80°C-200°C)!`,
    `💎 **Design premium** - Superfície antiaderente black resist, grelha removível e base antiderrapante para máxima segurança!`,
    `👨‍👩‍👧‍👦 **Capacidade familiar** - 4,2L perfeitos para preparar refeições completas para toda a família!`,
    `⭐ **DEPOIMENTOS REAIS** — "Amei! Frita tudo rapidinho e fica perfeito!" • "Compacta e potente, ideal pra quem mora sozinho!" • "Design lindo e muito eficiente!"`,
    `🛡️ **COMPRA GARANTIDA** - 30 dias de garantia Mercado Livre + 12 meses do fabricante!`,
    `⚡ **ÚLTIMAS UNIDADES!** Frete grátis para todo Brasil — entrega rápida em até 48h! Não perca essa promoção! 🏃‍♂️💨`
  ]
},
  {
  id: 3,
  introducao: `👑 **KIT DOS SONHOS!** Apresento o **Kit Desmaia Cabelo Forever Liss** — o **tratamento completo** que vai transformar seus cabelos em **sedas brilhantes**! 💖

Com **avaliação estelar** e **668 depoimentos comprovados**, este kit **VEGANO E CRUELTY-FREE** é a solução definitiva para cabelos **ressecados, com frizz e volume excessivo**! Prepare-se para **resultados de salão** na sua casa! 🏡✨`,
  imagem_url: "https://http2.mlstatic.com/D_NQ_NP_2X_737648-MLA95666828940_102025-F.webp",
  produto_url: "https://mercadolivre.com/sec/1UtH6xS",
  saibaMais: [
    `✨ **COMPOSIÇÃO PREMIUM** - Queratina Brasileira, Colágeno, D'Pantenol e Sinergia de Aminoácidos para reconstrução total dos fios!`,
    `🛡️ **PROTEÇÃO TÉRMICA AVANÇADA** - Sérum com proteção até 200°C contra secador e chapinha! Cabelos lindos e protegidos!`,
    `🎁 **KIT SUPER COMPLETO** - 5 produtos profissionais + BRINDE ESCOVA exclusiva! Tudo que você precisa em um só lugar!`,
    `🌱 **SAUDÁVEL E CONSCIENTE** - Formulação vegana, sem sulfatos, parabenos, glúten e livre de crueldade animal!`,
    `💬 **DEPOIMENTOS REAIS** — "Cabelo macio e super hidratado!" • "Consistência da máscara é maravilhosa!" • "Cheiro incrível que dura o dia todo!"`,
    `⚡ **RESULTADO IMEDIATO** - Redução do volume e controle do frizz desde a primeira lavagem! Efeito "desmaia" comprovado!`,
    `🎯 **PROMOÇÃO ESPECIAL** - Kit completo com **FRETE GRÁTIS**! Estoque limitado para entrega imediata! 🏃‍♀️💨`
  ]
}
];

// 🧡 Mensagem final
const mensagemFinal = {
  texto: "Ah, antes de encerrar 😄 Se você tem um pequeno negócio e quer ter um site profissional, posso te ajudar com isso!",
  extra: [
    "Eu faço parte da equipe da WebJS 🌐 — especializada em criar sites incríveis para empreendedores.",
    "Quer que eu te mostre como seu site pode ficar?"
  ],
  botoes: [
    { texto: "Falar com a Helena sobre meu site", link: "https://webjs.com.br/chat" },
    { texto: "Visitar WebJS.com.br", link: "https://webjs.com.br" }
  ]
};

let produtoIndex = 0;

// 📦 Criar mensagem
function criarMensagem(texto, tipo = "helena", imagem_url = "", produto_url = "") {
  const div = document.createElement("div");
  div.classList.add("mensagem", tipo);

  let conteudo = tipo === "helena"
    ? `<div class="conteudo">
        <div class="texto"><p>${texto.replace(/\n/g, '<br>')}</p></div>
        ${imagem_url ? `<div class="card"><img src="${imagem_url}" alt="Produto" loading="lazy" onclick="window.open('${produto_url}','_blank')"></div>` : ""}
      </div>`
    : `<div class="conteudo usuario"><p>${texto}</p></div>`;

  div.innerHTML = conteudo;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// ✍️ Mostrar digitando
async function mostrarDigitando(ms) {
  setStatusDigitando();
  
  // Criar elemento de digitando
  const typingDiv = document.createElement("div");
  typingDiv.classList.add("mensagem", "helena");
  typingDiv.innerHTML = `
    <div class="conteudo">
      <div class="digitando">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  `;
  typingDiv.id = "current-typing";
  chat.appendChild(typingDiv);
  chat.scrollTop = chat.scrollHeight;
  
  await delay(ms);
  
  // Remover o digitando
  const currentTyping = document.getElementById("current-typing");
  if (currentTyping) {
    currentTyping.remove();
  }
  setStatusOnline();
}

// 🔘 Criar botão empilhado
function criarBotao(texto, onClick) {
  const btn = document.createElement("button");
  btn.classList.add("botao");
  btn.innerText = texto;
  btn.onclick = onClick;
  return btn;
}

// 🚀 Mostrar mensagens iniciais
async function mostrarMensagens() {
  for (let msg of data) {
    await mostrarDigitando(Math.min(msg.texto.length * 40, 2000));
    criarMensagem(msg.texto, "helena");
  }
  mostrarProduto(0);
}

// 🛍️ Mostrar produto
async function mostrarProduto(index) {
  if (index >= produtos.length) {
    buttonsDiv.innerHTML = "";
    await delay(800);
    mostrarMensagemFinal();
    return;
  }

  produtoIndex = index;
  const prod = produtos[index];
  await mostrarDigitando(Math.min(prod.introducao.length * 40, 2000));
  criarMensagem(prod.introducao, "helena", prod.imagem_url, prod.produto_url);

  // Botões
  buttonsDiv.innerHTML = "";
  buttonsDiv.appendChild(criarBotao("Saiba mais", () => dialogoProduto(prod)));
  buttonsDiv.appendChild(criarBotao("Ver produto no Mercado Livre", () => window.open(prod.produto_url, "_blank")));
  
  if (index < produtos.length - 1) {
    buttonsDiv.appendChild(criarBotao("Próximo produto", () => mostrarProduto(produtoIndex + 1)));
  } else {
    buttonsDiv.appendChild(criarBotao("Ver ofertas finais", () => mostrarProduto(produtoIndex + 1)));
  }
}

// 💬 Fluxo "Saiba mais"
async function dialogoProduto(produto) {
  buttonsDiv.innerHTML = "";
  for (let msg of produto.saibaMais) {
    await mostrarDigitando(Math.min(msg.length * 35, 1800));
    criarMensagem(msg, "helena");
  }

  // Botões finais do produto
  buttonsDiv.appendChild(criarBotao("Ver produto no Mercado Livre", () => window.open(produto.produto_url, "_blank")));
  
  if (produtoIndex < produtos.length - 1) {
    buttonsDiv.appendChild(criarBotao("Próximo produto", () => mostrarProduto(produtoIndex + 1)));
  } else {
    buttonsDiv.appendChild(criarBotao("Ver ofertas finais", () => mostrarProduto(produtoIndex + 1)));
  }
}

// 🌐 Mensagem final
async function mostrarMensagemFinal() {
  await mostrarDigitando(1200);
  criarMensagem(mensagemFinal.texto, "helena");

  for (const linha of mensagemFinal.extra) {
    await mostrarDigitando(Math.min(linha.length * 40, 1500));
    criarMensagem(linha, "helena");
  }

  buttonsDiv.innerHTML = "";
  mensagemFinal.botoes.forEach(btnInfo => {
    buttonsDiv.appendChild(criarBotao(btnInfo.texto, () => window.open(btnInfo.link, "_blank")));
  });
}

// 🎯 Inicializar chatbot
window.onload = function() {
  setStatusOnline();
  mostrarMensagens();
};