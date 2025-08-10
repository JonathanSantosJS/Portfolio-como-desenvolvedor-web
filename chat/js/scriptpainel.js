// Configurações
const config = {
  updateInterval: 30000, // 30 segundos
};

// Dados do fluxo
const flowSteps = {
  start: 'Iniciaram o chat',
  emotion_prompt: 'Responderam sobre a rotina',
  story_open: 'Ouviram a história da Maria',
  show_evidence: 'Viram o método do nutricionista',
  method_summary: 'Chegaram no resumo do guia',
  go_checkout: 'Clicaram para comprar',
  final_doubt: 'Tiveram dúvidas finais',
  share_link_chat: 'Quiseram compartilhar',
  end_chat: 'Encerraram o chat',
};

// Elementos DOM
const elements = {
  metricsContainer: document.getElementById('metrics'),
  diagnosticsContainer: document.getElementById('diagnostics-container'),
  resetBtn: document.getElementById('reset-btn'),
  refreshBtn: document.getElementById('refresh-btn'),
  updateTime: document.getElementById('update-time'),
  tabButtons: document.querySelectorAll('.tab-btn'),
  tabContents: document.querySelectorAll('.tab-content'),
};

// Atualiza o horário da última atualização
function updateTimestamp() {
  const now = new Date();
  elements.updateTime.textContent = now.toLocaleTimeString('pt-BR');
}

// Carrega as métricas do localStorage
function loadMetrics() {
  const data = JSON.parse(localStorage.getItem('chat_metrics') || '{}');

  // Limpa o container
  elements.metricsContainer.innerHTML = '';

  // Cria os cards de métricas
  Object.entries(flowSteps).forEach(([stepKey, stepLabel]) => {
    const count = data[stepKey] || 0;
    const card = document.createElement('div');
    card.className = 'metric-card';

    card.innerHTML = `
            <div class="metric-title">${stepLabel}</div>
            <div class="metric-value">${count}</div>
            <div class="metric-progress">
                <progress value="${count}" max="${Math.max(
      count,
      10
    )}"></progress>
            </div>
        `;

    elements.metricsContainer.appendChild(card);
  });

  updateTimestamp();
}

// Carrega os diagnósticos
function loadDiagnostics() {
  const respostas = JSON.parse(localStorage.getItem('diagnosticos') || '[]');

  elements.diagnosticsContainer.innerHTML = '';

  if (respostas.length === 0) {
    elements.diagnosticsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-list"></i>
                <h3>Nenhum diagnóstico registrado</h3>
                <p>Os diagnósticos informados pelos usuários aparecerão aqui.</p>
            </div>
        `;
    return;
  }

  respostas.forEach((resposta, index) => {
    const item = document.createElement('div');
    item.className = 'diagnostic-item';

    // Simula uma data - você pode substituir por dados reais se disponível
    const date = new Date();
    date.setDate(date.getDate() - (respostas.length - index));

    item.innerHTML = `
            <p>${resposta}</p>
            <div class="diagnostic-time">
                <i class="far fa-clock"></i> ${date.toLocaleString('pt-BR')}
            </div>
        `;

    elements.diagnosticsContainer.appendChild(item);
  });
}

// Reseta as métricas
function resetMetrics() {
  if (
    confirm(
      'Tem certeza que deseja resetar todas as métricas? Esta ação não pode ser desfeita.'
    )
  ) {
    localStorage.removeItem('chat_metrics');
    localStorage.removeItem('diagnosticos');
    loadMetrics();
    loadDiagnostics();
    showNotification('Métricas resetadas com sucesso!', 'success');
  }
}

// Atualiza todos os dados
function refreshData() {
  loadMetrics();
  loadDiagnostics();
  showNotification('Dados atualizados com sucesso!', 'success');
}

// Mostra notificação
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <i class="fas fa-${
          type === 'success' ? 'check-circle' : 'info-circle'
        }"></i>
        ${message}
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('fade-out');
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}

// Controle de abas
function setupTabs() {
  elements.tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Remove classe active de todos
      elements.tabButtons.forEach((btn) => btn.classList.remove('active'));
      elements.tabContents.forEach((content) =>
        content.classList.remove('active')
      );

      // Adiciona ao selecionado
      button.classList.add('active');
      const tabName = button.getAttribute('data-tab');
      document
        .querySelector(`.tab-content[data-tab="${tabName}"]`)
        .classList.add('active');
    });
  });
}

// Inicialização
function init() {
  setupTabs();
  loadMetrics();
  loadDiagnostics();

  // Event listeners
  elements.resetBtn.addEventListener('click', resetMetrics);
  elements.refreshBtn.addEventListener('click', refreshData);

  // Atualização automática
  setInterval(refreshData, config.updateInterval);
}

// Inicia quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', init);
