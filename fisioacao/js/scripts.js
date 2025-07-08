document
  .getElementById('preAtendimentoForm')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const dor = document.getElementById('dor').value.trim();
    const tratamento = document.getElementById('tratamento').value.trim();

    const mensagem = `👋 *Pré-Atendimento FisioAção*

📍 *Nome:* ${nome}

📝 *Motivo do contato:*  
${dor}

💊 *Tratamentos anteriores:*  
${tratamento || 'Não informado'}

✅ *Aguardo orientações. Obrigado(a)!*`;

    const numero = '5582987353564';
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, '_blank');
  });
