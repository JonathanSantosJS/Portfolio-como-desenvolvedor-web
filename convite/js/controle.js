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
