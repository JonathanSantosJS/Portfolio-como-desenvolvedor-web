document.addEventListener('DOMContentLoaded', function() {
    const exitPopup = document.getElementById('exit-popup');
    const closeButton = document.querySelector('.close');

    exitPopup.style.display = 'none';

    document.addEventListener('mouseout', function(e) {
        if (e.clientY <= 0) {
            exitPopup.style.display = 'flex';
        }
    });

    closeButton.addEventListener('click', function() {
        exitPopup.style.display = 'none';
    });
});
