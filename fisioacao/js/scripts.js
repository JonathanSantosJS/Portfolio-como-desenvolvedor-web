/**
 * Configura o manipulador de envio para o formulário de pré-atendimento
 * @module PreAtendimentoForm
 */
document.addEventListener('DOMContentLoaded', function () {
  const preAtendimentoForm = document.getElementById('preAtendimentoForm');

  if (preAtendimentoForm) {
    preAtendimentoForm.addEventListener('submit', handleFormSubmit);
  }
});

/**
 * Manipula o envio do formulário de pré-atendimento
 * @param {Event} event - O evento de submissão do formulário
 */
function handleFormSubmit(event) {
  event.preventDefault();

  try {
    // Validação dos campos
    const formData = validateAndGetFormData();

    // Construção da mensagem
    const whatsappMessage = buildWhatsAppMessage(formData);

    // Configuração e abertura do WhatsApp
    openWhatsAppWithMessage(whatsappMessage);

    // Feedback visual (opcional)
    showSuccessFeedback();
  } catch (error) {
    console.error('Erro no processamento do formulário:', error);
    showErrorFeedback(error.message);
  }
}

/**
 * Valida e obtém os dados do formulário
 * @returns {Object} Dados do formulário validados
 * @throws {Error} Se a validação falhar
 */
function validateAndGetFormData() {
  const nome = document.getElementById('nome').value.trim();
  const dor = document.getElementById('dor').value.trim();
  const tratamento = document.getElementById('tratamento').value.trim();

  // Validação básica
  if (!nome) throw new Error('Por favor, insira seu nome completo');
  if (!dor) throw new Error('Por favor, descreva seu desconforto ou dor');

  return {
    nome,
    dor,
    tratamento: tratamento || 'Não informado',
  };
}

/**
 * Constrói a mensagem para o WhatsApp
 * @param {Object} formData - Dados do formulário
 * @returns {string} Mensagem formatada
 */
function buildWhatsAppMessage(formData) {
  return (
    `👋 *Pré-Atendimento FisioAção*\n\n` +
    `📍 *Nome:* ${formData.nome}\n\n` +
    `📝 *Motivo do contato:*\n${formData.dor}\n\n` +
    `💊 *Tratamentos anteriores:*\n${formData.tratamento}\n\n` +
    `✅ *Aguardo orientações. Obrigado(a)!*`
  );
}

/**
 * Abre o WhatsApp com a mensagem pré-preenchida
 * @param {string} message - Mensagem a ser enviada
 */
function openWhatsAppWithMessage(message) {
  const phoneNumber = '9999999999'; // Número formatado sem caracteres especiais
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // Boa prática: abrir em nova aba
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}

/**
 * Mostra feedback visual de sucesso
 */
function showSuccessFeedback() {
  // Implementação opcional: poderia ser um toast, modal ou animação
  console.log('Formulário enviado com sucesso!');
}

/**
 * Mostra feedback visual de erro
 * @param {string} errorMessage - Mensagem de erro a ser exibida
 */
function showErrorFeedback(errorMessage) {
  // Implementação opcional: exibir mensagem próximo ao formulário
  console.error('Erro no formulário:', errorMessage);
  alert(errorMessage); // Substituir por um feedback mais elegante
}

// Opcional: Adicionar máscara para telefone se necessário
// document.getElementById('telefone').addEventListener('input', function(e) {
//   e.target.value = formatPhoneNumber(e.target.value);
// });

