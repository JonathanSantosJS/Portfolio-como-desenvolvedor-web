function initSocialProof() {
    const notifications = [
        { name: 'Ana Silva', location: 'São Paulo', action: 'comprou o curso' },
        { name: 'Maria Santos', location: 'Rio de Janeiro', action: 'se inscreveu' },
        { name: 'Julia Costa', location: 'Belo Horizonte', action: 'começou agora' }
    ];

    const container = document.createElement('div');
    container.id = 'social-proof-container';
    document.body.appendChild(container);

    function showNotification(data) {
        const notification = document.createElement('div');
        notification.className = 'social-proof-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <strong>${data.name}</strong> de ${data.location}<br>
                ${data.action} 🎉
            </div>
        `;
        
        container.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    }

    let index = 0;
    setInterval(() => {
        showNotification(notifications[index]);
        index = (index + 1) % notifications.length;
    }, 8000);
}

document.addEventListener('DOMContentLoaded', initSocialProof);
