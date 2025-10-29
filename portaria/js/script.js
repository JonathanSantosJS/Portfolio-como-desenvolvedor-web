const buttonsDiv = document.getElementById("buttons");
const chat = document.getElementById("messages");
const statusPerfil = document.getElementById("status-perfil");

// Lista de moradores
const moradores = ["Jonathan Barbosa", "Emanuelle cristine", "Lucas Paulo", "Janycleia Barbosa", "Jonas Barbosa", "Maria Gorete"];

// Mapear números para cada morador
const numerosMoradores = {
  "Jônathan Barbosa": "5582987353564",
  "Emanuelle cristine": "5582993743566",
  "Lucas Paulo": "5582988123444",
  "Janycléa Barbosa": "5582999918026",
  "Jonas Barbosa": "5582987315598",
  "Maria Gorete": "5582988469214"
};

// Funções de status
function setStatusOnline() { if(statusPerfil) statusPerfil.innerText = "online"; }
function setStatusDigitando() { if(statusPerfil) statusPerfil.innerText = "digitando..."; }

function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

// Criar mensagem no chat
function criarMensagem(texto, tipo = "helena") {
  const div = document.createElement("div");
  div.classList.add("mensagem", tipo);
  div.innerHTML = `<div class="conteudo"><p>${texto.replace(/\n/g,'<br>')}</p></div>`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// Criar botão
function criarBotao(texto, onClick) {
  const btn = document.createElement("button");
  btn.classList.add("botao");
  btn.innerText = texto;
  btn.onclick = onClick;
  return btn;
}

// Função principal do fluxo
async function iniciarFluxo() {
  setStatusDigitando();

  const hora = new Date().getHours();
  let saudacao = "Olá!";
  if (hora >= 6 && hora < 12) saudacao = "Bom dia!";
  else if (hora >= 12 && hora < 18) saudacao = "Boa tarde!";
  else if (hora >= 18 && hora <= 20) saudacao = "Boa noite!";

  await delay(800);
  criarMensagem(`${saudacao} Eu sou Helena, sua assistente virtual!`);

  // Fora do horário comercial
  if (hora < 6 || hora > 20) {
    await delay(500);
    criarMensagem("Atualmente estamos fora do horário comercial. Você pode conferir nossos serviços e ofertas online:", "helena");
    buttonsDiv.innerHTML = "";
    buttonsDiv.appendChild(criarBotao("Visitar WebJS.com.br", () => window.open("https://webjs.com.br/chat/?negocios", "_blank")));
    return;
  }

  // Durante o horário comercial, fluxo normal de entregador
  await delay(500);
  criarMensagem("Você é entregador?");

  buttonsDiv.innerHTML = "";
  buttonsDiv.appendChild(criarBotao("Sim", () => fluxoEmpresa()));
  buttonsDiv.appendChild(criarBotao("Não", () => {
    buttonsDiv.innerHTML = "";
    criarMensagem("Que legal! Então confira nossas ofertas e serviços.", "helena");
    buttonsDiv.appendChild(criarBotao("Visitar WebJS.com.br", () => window.open("https://webjs.com.br/ml", "_blank")));
  }));
}

// Fluxo para informar empresa
function fluxoEmpresa() {
  buttonsDiv.innerHTML = "";
  criarMensagem("Informe o nome da empresa da entrega (ex: Mercado Livre)");

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Nome da empresa";
  input.style.width = "100%";
  input.style.padding = "12px";
  input.style.marginBottom = "8px";
  buttonsDiv.appendChild(input);

  const btnOk = criarBotao("OK", () => {
    const empresa = input.value.trim();
    if(!empresa) return alert("Por favor, informe a empresa.");
    fluxoMorador(empresa);
  });

  buttonsDiv.appendChild(btnOk);
}

// Fluxo para selecionar o morador
function fluxoMorador(empresa) {
  buttonsDiv.innerHTML = "";
  criarMensagem(`Entrega da empresa ${empresa}. Para quem é a entrega?`);

  moradores.forEach(nome => {
    buttonsDiv.appendChild(criarBotao(nome, () => fluxoMensagemMorador(nome, empresa)));
  });
}

// Mensagem oculta para o morador (botão envia WhatsApp ou site fora do horário)
function fluxoMensagemMorador(nomeMorador, empresa) {
  buttonsDiv.innerHTML = "";

  const horaAtual = new Date().getHours();
  let saudacao = "Olá";
  if(horaAtual >= 6 && horaAtual < 12) saudacao = "Bom dia";
  else if(horaAtual >= 12 && horaAtual < 18) saudacao = "Boa tarde";
  else if(horaAtual >= 18 && horaAtual <= 20) saudacao = "Boa noite";

  const mensagemMorador = `${saudacao} ${nomeMorador}! 🌟 Eu sou Helena, sua assistente virtual. Sua entrega da ${empresa} chegou 📦 e está esperando na porta. Tenha um ótimo dia!`;

  // Fora do horário comercial, mostrar botão do site
  if(horaAtual < 6 || horaAtual > 20) {
    criarMensagem(`Olá! Agora estamos fora do horário comercial. Confira nossos serviços no WebJS.`, "helena");
    buttonsDiv.appendChild(criarBotao("Visitar WebJS.com.br", () => window.open("https://webjs.com.br/ml", "_blank")));
    return;
  }

  // Botão WhatsApp
  const numero = numerosMoradores[nomeMorador] || "5582987353564"; // padrão
  const whatsappLink = `https://wa.me/${numero}?text=${encodeURIComponent(mensagemMorador)}`;

  criarMensagem(`Entrega registrada para ${nomeMorador}. Clique no botão abaixo para informar via WhatsApp.`, "helena");
  buttonsDiv.appendChild(criarBotao("Clique aqui para chamar", () => window.open(whatsappLink, "_blank")));
}

// Inicializar fluxo ao carregar página
window.onload = function() {
  setStatusOnline();
  iniciarFluxo();
};


