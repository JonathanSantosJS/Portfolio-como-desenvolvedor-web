// Função para coletar dados do formulário
function collectFormData() {
  const data = {};

  data.problema = document.getElementById('q1')?.value.trim() || '';
  data.pesquisa = document.getElementById('q2')?.value.trim() || '';
  data.argumentos = document.getElementById('q3')?.value.trim() || '';
  data.ofertas = document.getElementById('q4')?.value.trim() || '';
  data.publico = document.getElementById('q5')?.value.trim() || '';
  data.dores = document.getElementById('q6')?.value.trim() || '';
  data.sonorios = document.getElementById('q7')?.value.trim() || '';
  data.objecoes = document.getElementById('q8')?.value.trim() || '';
  data.valores = document.getElementById('q9')?.value.trim() || '';
  data.odeia = document.getElementById('q10')?.value.trim() || '';
  data.canais = [];

  // Corrigido: label está em parentElement do checkbox
  const checkboxes = document.querySelectorAll('#quizForm .checkbox-grid input[type="checkbox"]:checked');
  checkboxes.forEach(cb => {
    const label = cb.parentElement.textContent.trim();
    if (label) data.canais.push(label);
  });

  data.jornada = document.getElementById('q12')?.value.trim() || '';
  data.termos_bons = document.getElementById('q13')?.value.trim() || '';
  data.termos_ruins = document.getElementById('q14')?.value.trim() || '';
  data.linguagem = document.getElementById('q15')?.value.trim() || '';
  data.concorrentes_diretos = document.getElementById('q16')?.value.trim() || '';
  data.concorrentes_indiretos = document.getElementById('q17')?.value.trim() || '';
  data.diferenciais = document.getElementById('q18')?.value.trim() || '';
  data.observacoes = document.getElementById('q19')?.value.trim() || '';

  return data;
}

// Mostrar modal de confirmação com dados organizados em blocos
function showConfirmationModal(data) {
  const modalBody = document.getElementById('modalBody');
  if (!modalBody) return;

  const blocos = [
    {
      title: "Bloco 1 – Problema e Solução",
      questions: [
        { label: '1. Problemas que resolve', key: 'problema' },
        { label: '2. Como cliente busca no Google', key: 'pesquisa' },
        { label: '3. Argumentos fortes', key: 'argumentos' },
        { label: '4. Ofertas', key: 'ofertas' },
      ]
    },
    {
      title: "Bloco 2 – Público-Alvo",
      questions: [
        { label: '5. Quem é seu cliente ideal?', key: 'publico' },
        { label: '6. Dores', key: 'dores' },
        { label: '7. Sonhos e Objetivos', key: 'sonorios' },
        { label: '8. Objeções', key: 'objecoes' },
        { label: '9. O que valoriza', key: 'valores' },
        { label: '10. O que odeia', key: 'odeia' },
        { label: '11. Canais de comunicação', key: 'canais', isArray: true },
      ]
    },
    {
      title: "Bloco 3 – Comunicação e Visibilidade",
      questions: [
        { label: '12. Momento da jornada', key: 'jornada' },
        { label: '13. Termos bons', key: 'termos_bons' },
        { label: '14. Termos ruins', key: 'termos_ruins' },
        { label: '15. Linguagem que chama atenção', key: 'linguagem' },
      ]
    },
    {
      title: "Bloco 4 – Concorrência e Diferenciais",
      questions: [
        { label: '16. Concorrentes diretos', key: 'concorrentes_diretos' },
        { label: '17. Concorrentes indiretos', key: 'concorrentes_indiretos' },
        { label: '18. Diferenciais', key: 'diferenciais' },
        { label: '19. Observações', key: 'observacoes' },
      ]
    }
  ];

  let modalContent = '';
  blocos.forEach(bloco => {
    modalContent += `<h3>${bloco.title}</h3>`;
    bloco.questions.forEach(({label, key, isArray}) => {
      let val = data[key];
      if (Array.isArray(val) && isArray) {
        val = val.length ? val.join(', ') : 'Nenhum selecionado';
      }
      modalContent += `
        <div class="preview-section">
          <strong>${label}:</strong>
          <p>${val && val !== '' ? val : 'Não informado'}</p>
        </div>
      `;
    });
  });

  modalBody.innerHTML = modalContent;
  document.getElementById('modalOverlay').classList.add('active');
  // Trava a rolagem do body enquanto estiver aberto
  document.body.style.overflow = 'hidden';
}

// Fechar modal e liberar scroll
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = ''; 
}

// Enviar dados para WhatsApp formatados
function sendToWhatsApp() {
  const data = collectFormData();

  const blocos = [
    {
      title: "Bloco 1 – Problema e Solução",
      questions: [
        { label: '1. Problemas que resolve', key: 'problema' },
        { label: '2. Como cliente busca no Google', key: 'pesquisa' },
        { label: '3. Argumentos fortes', key: 'argumentos' },
        { label: '4. Ofertas', key: 'ofertas' },
      ]
    },
    {
      title: "Bloco 2 – Público-Alvo",
      questions: [
        { label: '5. Quem é seu cliente ideal?', key: 'publico' },
        { label: '6. Dores', key: 'dores' },
        { label: '7. Sonhos e Objetivos', key: 'sonorios' },
        { label: '8. Objeções', key: 'objecoes' },
        { label: '9. O que valoriza', key: 'valores' },
        { label: '10. O que odeia', key: 'odeia' },
        { label: '11. Canais de comunicação', key: 'canais', isArray: true },
      ]
    },
    {
      title: "Bloco 3 – Comunicação e Visibilidade",
      questions: [
        { label: '12. Momento da jornada', key: 'jornada' },
        { label: '13. Termos bons', key: 'termos_bons' },
        { label: '14. Termos ruins', key: 'termos_ruins' },
        { label: '15. Linguagem que chama atenção', key: 'linguagem' },
      ]
    },
    {
      title: "Bloco 4 – Concorrência e Diferenciais",
      questions: [
        { label: '16. Concorrentes diretos', key: 'concorrentes_diretos' },
        { label: '17. Concorrentes indiretos', key: 'concorrentes_indiretos' },
        { label: '18. Diferenciais', key: 'diferenciais' },
        { label: '19. Observações', key: 'observacoes' },
      ]
    }
  ];

  let message = `🔍 *DIAGNÓSTICO PROFISSIONAL - WebJS*\n\n`;

  blocos.forEach(bloco => {
    message += `*${bloco.title}*\n`;
    bloco.questions.forEach(({label, key, isArray}) => {
      let val = data[key];
      if (Array.isArray(val) && isArray) {
        val = val.length ? val.join(', ') : 'Nenhum selecionado';
      }
      message += `*${label}:*\n${val && val !== '' ? val : 'Não informado'}\n\n`;
    });
  });

  const now = new Date();
  message += `📅 Data: ${now.toLocaleDateString('pt-BR')}\n⏰ Hora: ${now.toLocaleTimeString('pt-BR')}\n`;

  const whatsappURL = `https://wa.me/5582987353564?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, '_blank');

  closeModal();

  alert('✅ Diagnóstico enviado com sucesso!\nVocê será redirecionado para o WhatsApp.');
}

// Gerenciamento simples do quiz e modal
document.addEventListener('DOMContentLoaded', () => {
  let currentStep = 0;
  const steps = document.querySelectorAll(".step");
  const nextBtns = document.querySelectorAll(".next-btn");
  const prevBtns = document.querySelectorAll(".prev-btn");
  const progressBar = document.getElementById('progressBar');

  function showStep(index) {
    steps.forEach((step, i) => {
      step.style.display = i === index ? "block" : "none";
    });

    const progress = ((index + 1) / steps.length) * 100;
    if(progressBar) progressBar.style.width = progress + '%';
  }

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep < steps.length -1) {
        currentStep++;
        showStep(currentStep);
      }
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if(currentStep > 0){
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  const form = document.getElementById('quizForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = collectFormData();
    showConfirmationModal(data);
  });

  showStep(currentStep);
});
