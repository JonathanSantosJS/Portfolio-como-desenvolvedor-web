document.addEventListener('DOMContentLoaded', function() {
    function startCountdown() {
        const countdownElement = document.getElementById('countdown');
        let duration = 2 * 60 * 60; // 2 hours in seconds
        
        function updateCountdown() {
            const hours = Math.floor(duration / 3600);
            const minutes = Math.floor((duration % 3600) / 60);
            const seconds = duration % 60;
            
            countdownElement.innerHTML = `
                <span>${String(hours).padStart(2, '0')}</span>:
                <span>${String(minutes).padStart(2, '0')}</span>:
                <span>${String(seconds).padStart(2, '0')}</span>
            `;
            
            if (duration > 0) {
                duration--;
                setTimeout(updateCountdown, 1000);
            }
        }
        
        updateCountdown();
    }

    startCountdown();
});
