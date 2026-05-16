// ===== VARIÁVEIS EDITÁVEIS =====
const LINK_HOTMART = "https://go.hotmart.com/L100798133T";
const LINK_MERCADO_LIVRE = "https://meli.la/2ooy1np";

// ===== ELEMENTOS DO DOM =====
const screenForm = document.getElementById('screenForm');
const screenLoading = document.getElementById('screenLoading');
const screenResult = document.getElementById('screenResult');
const calcularBtn = document.getElementById('calcularBtn');
const restartBtn = document.getElementById('restartBtn');
const loadingSteps = document.querySelectorAll('.loading-step');
const inputPeso = document.getElementById('peso');
const inputAltura = document.getElementById('altura');

// ===== FUNÇÕES DE NAVEGAÇÃO =====
function showScreen(screen) {
  const allScreens = [screenForm, screenLoading, screenResult];
  
  // Remove active de todas as telas com transição suave
  allScreens.forEach(s => {
    if (s.classList.contains('active')) {
      s.style.opacity = '0';
      s.style.transform = 'translateY(8px)';
      
      setTimeout(() => {
        s.classList.remove('active');
        s.style.opacity = '';
        s.style.transform = '';
      }, 200);
    }
  });
  
  // Adiciona nova tela com delay para transição
  setTimeout(() => {
    screen.classList.add('active');
    
    // Scroll to top on mobile
    if (window.innerWidth < 768) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, 250);
}

function showLoading() {
  showScreen(screenLoading);
  iniciarLoadingAnimation();
}

function showResult() {
  showScreen(screenResult);
}

function showForm() {
  showScreen(screenForm);
}

// ===== SANITIZAÇÃO DE NÚMEROS (ACEITA VÍRGULA) =====
function sanitizarNumero(valor) {
  if (valor === null || valor === undefined || valor === '') return NaN;
  
  // Converte para string e remove espaços
  let str = String(valor).trim();
  
  // Se estiver vazio, retorna NaN
  if (str === '') return NaN;
  
  // Substitui vírgula por ponto (formato brasileiro)
  str = str.replace(',', '.');
  
  // Remove caracteres não numéricos (exceto ponto decimal)
  str = str.replace(/[^\d.]/g, '');
  
  // Garante que só existe um ponto decimal
  const partes = str.split('.');
  if (partes.length > 2) {
    str = partes[0] + '.' + partes.slice(1).join('');
  }
  
  // Se começa com ponto, adiciona zero
  if (str.startsWith('.')) {
    str = '0' + str;
  }
  
  // Se termina com ponto, remove
  if (str.endsWith('.')) {
    str = str.slice(0, -1);
  }
  
  const resultado = parseFloat(str);
  return isNaN(resultado) ? NaN : resultado;
}

// ===== AUTO-CORREÇÃO DE VÍRGULA EM TEMPO REAL =====
function configurarAutoCorrecaoInputs() {
  [inputPeso, inputAltura].forEach(input => {
    // Corrige vírgula enquanto digita
    input.addEventListener('input', (e) => {
      const valorAtual = e.target.value;
      const cursorPos = e.target.selectionStart;
      
      // Se contém vírgula, substitui por ponto
      if (valorAtual.includes(',')) {
        const novoValor = valorAtual.replace(/,/g, '.');
        e.target.value = novoValor;
        
        // Reposiciona o cursor
        const novaPosicao = cursorPos - (valorAtual.length - novoValor.length);
        e.target.setSelectionRange(novaPosicao, novaPosicao);
      }
    });
    
    // Previne caracteres inválidos
    input.addEventListener('keypress', (e) => {
      const char = e.key;
      const valorAtual = e.target.value;
      
      // Permite números, vírgula, ponto e teclas de controle
      if (/[\d,.]/.test(char) || e.ctrlKey || e.metaKey || e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Tab' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        // Se for vírgula e já existe vírgula ou ponto, previne
        if (char === ',' && (valorAtual.includes(',') || valorAtual.includes('.'))) {
          e.preventDefault();
          return;
        }
        
        // Se for ponto e já existe ponto ou vírgula, previne
        if (char === '.' && (valorAtual.includes('.') || valorAtual.includes(','))) {
          e.preventDefault();
          return;
        }
        
        return;
      }
      
      e.preventDefault();
    });
    
    // Corrige ao colar (Ctrl+V)
    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const colado = (e.clipboardData || window.clipboardData).getData('text');
      const sanitizado = colado.replace(',', '.').replace(/[^\d.]/g, '');
      const cursorPos = input.selectionStart;
      const valorAtual = input.value;
      const novoValor = valorAtual.slice(0, cursorPos) + sanitizado + valorAtual.slice(input.selectionEnd);
      input.value = novoValor;
    });
  });
}

// ===== ANIMAÇÃO DE LOADING =====
function iniciarLoadingAnimation() {
  // Reset steps
  loadingSteps.forEach(step => {
    step.classList.remove('active', 'completed');
    step.querySelector('.step-indicator').textContent = '';
  });
  
  // Step 1: Calculando IMC (200ms)
  setTimeout(() => {
    loadingSteps[0].classList.add('active');
  }, 200);
  
  // Step 1 completo + Step 2 ativo (700ms)
  setTimeout(() => {
    loadingSteps[0].classList.remove('active');
    loadingSteps[0].classList.add('completed');
    loadingSteps[0].querySelector('.step-indicator').textContent = '✓';
    loadingSteps[1].classList.add('active');
  }, 700);
  
  // Step 2 completo + Step 3 ativo (1400ms)
  setTimeout(() => {
    loadingSteps[1].classList.remove('active');
    loadingSteps[1].classList.add('completed');
    loadingSteps[1].querySelector('.step-indicator').textContent = '✓';
    loadingSteps[2].classList.add('active');
  }, 1400);
  
  // Todos completos (1900ms)
  setTimeout(() => {
    loadingSteps[2].classList.remove('active');
    loadingSteps[2].classList.add('completed');
    loadingSteps[2].querySelector('.step-indicator').textContent = '✓';
  }, 1900);
}

// ===== FUNÇÃO DE CÁLCULO DO IMC =====
function calcularIMC(peso, altura) {
  // Se altura for maior que 3, considera que está em centímetros
  if (altura > 3) {
    altura = altura / 100;
  }
  
  const imc = peso / (altura * altura);
  return parseFloat(imc.toFixed(1));
}

// ===== FUNÇÃO DE CLASSIFICAÇÃO =====
function classificarIMC(imc) {
  if (imc < 18.5) return 'abaixo do peso';
  if (imc < 25) return 'na faixa equilibrada';
  if (imc < 30) return 'com sobrepeso';
  if (imc < 35) return 'com obesidade grau I';
  if (imc < 40) return 'com obesidade grau II';
  return 'com obesidade grau III';
}

// ===== FUNÇÃO DE MENSAGENS (TOM WELLNESS) =====
function gerarMensagens(imc, classificacao) {
  const mensagens = {
    'abaixo do peso': {
      emoji: '🌱',
      titulo: 'Seu corpo pede mais energia',
      mensagem: `Seu IMC está em ${imc}, indicando que você está abaixo do peso. Isso pode estar relacionado a diversos fatores do dia a dia.`,
      sugestao: 'Pequenas mudanças na rotina alimentar podem ajudar. Que tal incluir mais proteínas e gorduras boas nas refeições?',
      cor: '#E67E22'
    },
    'na faixa equilibrada': {
      emoji: '✨',
      titulo: 'Você está em equilíbrio',
      mensagem: `Seu IMC está em ${imc}, dentro da faixa considerada equilibrada. Isso é um ótimo sinal!`,
      sugestao: 'A constância é sua aliada. Continue cuidando da alimentação e mantendo seu corpo em movimento.',
      cor: '#27AE60'
    },
    'com sobrepeso': {
      emoji: '🎯',
      titulo: 'Uma oportunidade de ajuste',
      mensagem: `Seu IMC está em ${imc}, indicando que você está com sobrepeso. Este pode ser um bom momento para observar seus hábitos com atenção.`,
      sugestao: 'Pequenos ajustes diários fazem diferença. Reduzir processados e incluir mais movimento na rotina já é um grande passo.',
      cor: '#E67E22'
    },
    'com obesidade grau I': {
      emoji: '💪',
      titulo: 'Hora de cuidar com mais atenção',
      mensagem: `Seu IMC está em ${imc}, classificado como obesidade grau I. Buscar informação de qualidade é um excelente primeiro passo.`,
      sugestao: 'Começar com caminhadas leves e organizar melhor as refeições são atitudes que trazem resultados consistentes.',
      cor: '#E74C3C'
    },
    'com obesidade grau II': {
      emoji: '🧡',
      titulo: 'Seu bem-estar merece prioridade',
      mensagem: `Seu IMC está em ${imc}, classificado como obesidade grau II. Buscar orientação profissional pode fazer toda diferença.`,
      sugestao: 'Atividades de baixo impacto como natação ou hidroginástica são excelentes pontos de partida.',
      cor: '#C0392B'
    },
    'com obesidade grau III': {
      emoji: '🤝',
      titulo: 'Você não está sozinho nessa',
      mensagem: `Seu IMC está em ${imc}, classificado como obesidade grau III. O acompanhamento profissional é fundamental.`,
      sugestao: 'Procure um nutricionista ou endocrinologista. Cuidar da saúde é um ato de coragem e amor próprio.',
      cor: '#922B21'
    }
  };
  
  return mensagens[classificacao];
}

// ===== FUNÇÃO DE RECOMENDAÇÃO =====
function gerarRecomendacao(rotina) {
  if (rotina === 'sedentaria') {
    return {
      texto: 'Com base no seu perfil, um e-book com receitas e dicas de organização alimentar pode ser útil para criar novos hábitos no seu ritmo.',
      produto: 'E-book de receitas e planejamento'
    };
  }
  
  return {
    texto: 'Com base no seu perfil, selecionamos alguns produtos de bem-estar que podem apoiar sua rotina de forma prática.',
    produto: 'Lista de produtos selecionados'
  };
}

// ===== FUNÇÃO DE DEFINIÇÃO DO CTA =====
function definirCTA(rotina) {
  if (rotina === 'sedentaria') {
    return {
      texto: '📖 Quero conhecer o e-book',
      link: LINK_HOTMART
    };
  }
  
  return {
    texto: '🛍️ Ver produtos recomendados',
    link: LINK_MERCADO_LIVRE
  };
}

// ===== FUNÇÃO DE VALIDAÇÃO =====
function validarFormulario(peso, altura, alimento, rotina) {
  if (isNaN(peso) || peso <= 0) {
    alert('Por favor, informe um peso válido.\nUse vírgula ou ponto (ex: 68,5 ou 68.5)');
    inputPeso.focus();
    return false;
  }
  
  if (peso < 20 || peso > 300) {
    alert('Por favor, informe um peso entre 20 e 300 kg.');
    inputPeso.focus();
    return false;
  }
  
  if (isNaN(altura) || altura <= 0) {
    alert('Por favor, informe uma altura válida.\nUse vírgula ou ponto (ex: 1,75 ou 1.75)');
    inputAltura.focus();
    return false;
  }
  
  if (altura < 0.5 || altura > 2.5) {
    // Verifica se está em centímetros
    if (altura >= 50 && altura <= 250) {
      // Altura em cm é válida, será convertida depois
    } else {
      alert('Por favor, informe uma altura entre 0.5 e 2.5 metros (ou 50 e 250 cm).');
      inputAltura.focus();
      return false;
    }
  }
  
  if (!alimento) {
    alert('Selecione como é sua alimentação para continuar.');
    return false;
  }
  
  if (!rotina) {
    alert('Selecione seu nível de atividade para continuar.');
    return false;
  }
  
  return true;
}

// ===== FUNÇÃO DE RENDERIZAÇÃO DO RESULTADO =====
function renderizarResultado(imc, classificacao, mensagem, recomendacao, cta) {
  const resultEmoji = document.getElementById('resultEmoji');
  const resultTitle = document.getElementById('resultTitle');
  const resultContent = document.getElementById('resultContent');
  const recommendationText = document.getElementById('recommendationText');
  const ctaButton = document.getElementById('ctaButton');
  
  resultEmoji.textContent = mensagem.emoji;
  resultTitle.textContent = mensagem.titulo;
  
  resultContent.innerHTML = `
    <div class="imc-display">
      <div class="imc-value" style="color: ${mensagem.cor}">${imc}</div>
      <div class="imc-classification" style="background: ${mensagem.cor}15; color: ${mensagem.cor};">
        IMC • ${classificacao}
      </div>
    </div>
    
    <div class="diagnostic-message">
      <p>${mensagem.mensagem}</p>
      <p class="suggestion">✨ ${mensagem.sugestao}</p>
    </div>
  `;
  
  recommendationText.textContent = recomendacao.texto;
  ctaButton.textContent = cta.texto;
  ctaButton.href = cta.link;
  ctaButton.target = '_blank';
  ctaButton.rel = 'noopener noreferrer';
}

// ===== FUNÇÃO PRINCIPAL =====
function processarQuiz() {
  // Sanitiza os valores (aceita vírgula)
  const peso = sanitizarNumero(inputPeso.value);
  const altura = sanitizarNumero(inputAltura.value);
  
  const alimentoSelecionado = document.querySelector('input[name="alimento"]:checked');
  const rotinaSelecionada = document.querySelector('input[name="rotina"]:checked');
  
  const alimento = alimentoSelecionado ? alimentoSelecionado.value : null;
  const rotina = rotinaSelecionada ? rotinaSelecionada.value : null;
  
  if (!validarFormulario(peso, altura, alimento, rotina)) {
    return;
  }
  
  // Mostra loading com animação
  showLoading();
  
  // Processa após 2.2 segundos (tempo da animação)
  setTimeout(() => {
    const imc = calcularIMC(peso, altura);
    const classificacao = classificarIMC(imc);
    const mensagem = gerarMensagens(imc, classificacao);
    const recomendacao = gerarRecomendacao(rotina);
    const cta = definirCTA(rotina);
    
    renderizarResultado(imc, classificacao, mensagem, recomendacao, cta);
    showResult();
  }, 2200);
}

// ===== FUNÇÃO DE RESET =====
function resetarQuiz() {
  inputPeso.value = '';
  inputAltura.value = '';
  
  document.querySelectorAll('input[name="alimento"]').forEach(r => r.checked = false);
  document.querySelectorAll('input[name="rotina"]').forEach(r => r.checked = false);
  
  // Reset loading steps
  loadingSteps.forEach(step => {
    step.classList.remove('active', 'completed');
    step.querySelector('.step-indicator').textContent = '';
  });
  
  showForm();
}

// ===== EVENT LISTENERS =====
calcularBtn.addEventListener('click', processarQuiz);
restartBtn.addEventListener('click', resetarQuiz);

// ===== PREVINE SCROLL EM INPUTS NUMÉRICOS (MOBILE) =====
document.querySelectorAll('input[type="number"]').forEach(input => {
  input.addEventListener('wheel', (e) => e.preventDefault());
  
  input.addEventListener('keydown', (e) => {
    // Previne a letra 'e' (notação científica)
    if (e.key === 'e' || e.key === 'E') {
      e.preventDefault();
    }
  });
});

// ===== MELHORA ACESSIBILIDADE DOS RADIO CARDS =====
document.querySelectorAll('.radio-card').forEach(card => {
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const radio = card.previousElementSibling;
      radio.checked = true;
      radio.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  
  // Permite clique no card inteiro
  card.addEventListener('click', (e) => {
    const radio = card.previousElementSibling;
    radio.checked = true;
    radio.dispatchEvent(new Event('change', { bubbles: true }));
  });
});

// ===== INICIALIZAÇÃO =====
function inicializar() {
  configurarAutoCorrecaoInputs();
}

// Inicia quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializar);
} else {
  inicializar();
}

// ===== PREVINE COMPORTAMENTOS INDESEJADOS EM TELAS TOUCH =====
document.addEventListener('touchmove', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
    return;
  }
}, { passive: true });