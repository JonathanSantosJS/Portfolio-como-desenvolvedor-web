  const container = document.querySelector('.formas-flutuantes');
  const tipos = ['circulo', 'quadrado', 'triangulo'];
  const cores = ['branca', 'laranja'];
  const tamanhos = ['pequena', 'media', 'grande'];

  for (let i = 0; i < 20; i++) {
    const span = document.createElement('span');
    span.classList.add('forma');
    span.classList.add(tipos[Math.floor(Math.random() * tipos.length)]);
    span.classList.add(cores[Math.floor(Math.random() * cores.length)]);
    span.classList.add(tamanhos[Math.floor(Math.random() * tamanhos.length)]);
    span.style.left = Math.random() * 100 + '%';
    span.style.animationDuration = (15 + Math.random() * 15) + 's';
    container.appendChild(span);
  }

/*BOTÃO FLUTUANTE PARA VOLTAR AO TOPO*/
// Mostra o botão ao rolar
window.onscroll = function() {
    const btn = document.getElementById("btnTopo");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

// Rola suavemente até o topo
document.getElementById("btnTopo").addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

