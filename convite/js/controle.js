// Função do contador regressivo
function iniciarContador() {
  const dataEvento = new Date('2025-08-02T18:30:00').getTime();
  
  const contador = setInterval(function() {
    const agora = new Date().getTime();
    const distancia = dataEvento - agora;
    
    if (distancia < 0) {
      clearInterval(contador);
      document.querySelector('.countdown-container').classList.add('countdown-expired');
      document.querySelector('.countdown-title').textContent = '🎉 É HOJE! 🎉';
      document.getElementById('dias').textContent = '00';
      document.getElementById('horas').textContent = '00';
      document.getElementById('minutos').textContent = '00';
      document.getElementById('segundos').textContent = '00';
      return;
    }
    
    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);
    
    document.getElementById('dias').textContent = dias.toString().padStart(2, '0');
    document.getElementById('horas').textContent = horas.toString().padStart(2, '0');
    document.getElementById('minutos').textContent = minutos.toString().padStart(2, '0');
    document.getElementById('segundos').textContent = segundos.toString().padStart(2, '0');
  }, 1000);
}

// Iniciar o contador quando a página carregar
document.addEventListener('DOMContentLoaded', iniciarContador);

// Código existente do formulário
document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const acompanhantes = document.getElementById("acompanhantes").value;
  const mensagem = document.getElementById("mensagem").value.trim();

  const texto = `Olá! Aqui é ${nome}. Confirmando presença para a festa do Davi com ${acompanhantes} acompanhante(s). ${
    mensagem ? "Mensagem: " + mensagem : ""
  }`;

  const numeroWhatsApp = "558299918026";
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;

  document.getElementById("resultado").innerHTML = `
    <p>Confirmação pronta! Clique no botão abaixo para enviar pelo WhatsApp:</p>
    <a href="${url}" target="_blank">
      <button>Enviar via WhatsApp</button>
    </a>
  `;

  // opcional: limpar formulário
  document.getElementById("formulario").reset();
});
