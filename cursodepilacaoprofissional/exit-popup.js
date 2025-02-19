document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("exit-popup");
    const closePopup = document.getElementById("close-popup");
    let popupMostrado = false;
    let popupTimer = null;

    function mostrarPopup() {
        if (!popupMostrado && !sessionStorage.getItem('popupMostrado')) {
            popup.style.display = "flex";
            popup.classList.add('popup-active');
            popupMostrado = true;
            sessionStorage.setItem('popupMostrado', 'true');
        }
    }

    function fecharPopup() {
        popup.classList.remove('popup-active');
        popup.classList.add('popup-closing');
        
        setTimeout(() => {
            popup.style.display = "none";
            popup.classList.remove('popup-closing');
        }, 300);
    }

    // Detecta movimento do mouse para fechar a aba
    document.addEventListener("mouseleave", function (event) {
        if (event.clientY <= 10) {
            clearTimeout(popupTimer);
            popupTimer = setTimeout(mostrarPopup, 300);
        }
    });

    // Volta o mouse para a página
    document.addEventListener("mouseenter", function () {
        clearTimeout(popupTimer);
    });

    closePopup.addEventListener("click", fecharPopup);

    window.addEventListener("click", function (event) {
        if (event.target === popup) {
            fecharPopup();
        }
    });
});
