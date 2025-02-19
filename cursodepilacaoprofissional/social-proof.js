document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("social-proof-container");

    const clientes = [
        { nome: "Ana", cidade: "São Paulo" },
        { nome: "Carlos", cidade: "Rio de Janeiro" },
        { nome: "Mariana", cidade: "Belo Horizonte" },
        { nome: "Roberto", cidade: "Curitiba" },
        { nome: "Fernanda", cidade: "Salvador" },
        { nome: "Patricia", cidade: "Florianópolis" },
        { nome: "Julia", cidade: "Porto Alegre" },
        { nome: "Beatriz", cidade: "Recife" }
    ];

    function mostrarNotificacao() {
        const cliente = clientes[Math.floor(Math.random() * clientes.length)];
        const notificacao = document.createElement("div");
        notificacao.className = "social-proof";
        notificacao.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">🎓</span>
                <span><strong>${cliente.nome}</strong> de ${cliente.cidade}<br>acabou de se matricular!</span>
            </div>`;

        container.appendChild(notificacao);

        setTimeout(() => {
            notificacao.classList.add('fade-out');
            setTimeout(() => {
                notificacao.remove();
            }, 500);
        }, 4500);
    }

    // Primeira notificação após 3 segundos
    setTimeout(() => {
        mostrarNotificacao();
        // Depois, mostrar a cada 15 segundos
        setInterval(mostrarNotificacao, 15000);
    }, 3000);
});
