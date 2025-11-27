// script.js (Lógica do Carrossel)

document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.querySelector('.carousel-container');
    // CORRIGIDO: O elemento que se move é o track-container, não o carousel
    const carouselTrack = document.querySelector('.carousel-track-container'); 
    
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');

    if (!carouselContainer || !carouselTrack || slides.length === 0) {
        console.error("Carrossel não encontrado ou mal configurado no HTML.");
        return; // Sai se a estrutura HTML não estiver presente
    }
    
    let counter = 0;
    let intervalId;
    const slideCount = slides.length;

    // Função principal de movimento
    function goToSlide(slideIndex) {
        if (slideIndex < 0) {
            counter = slideCount - 1;
        } else if (slideIndex >= slideCount) {
            counter = 0;
        } else {
            counter = slideIndex;
        }
        
        // Aplica a translação horizontal no track-container
        carouselTrack.style.transform = `translateX(-${counter * 100}%)`;
        updateDots();
    }
    
    function nextSlide() {
        goToSlide(counter + 1);
    }

    function prevSlide() {
        goToSlide(counter - 1);
    }
    
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === counter);
        });
    }

    // 1. Funcionalidade de Clique (Avançar/Voltar)
    if (nextButton && prevButton) {
        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);
    }

    // 2. Funcionalidade dos Dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopAutoSlide(); // Para o autoplay ao interagir
            startAutoSlide(); // Reinicia
        });
    });

    // 3. Autoplay
    function startAutoSlide() {
        if (!intervalId) {
            intervalId = setInterval(nextSlide, 5000); // Troca a cada 5 segundos
        }
    }

    function stopAutoSlide() {
        clearInterval(intervalId);
        intervalId = null;
    }

    // Inicia o autoplay e pausa/reinicia ao passar o mouse
    if (carouselContainer) {
        startAutoSlide(); 
        carouselContainer.addEventListener('mouseenter', stopAutoSlide); // Pausa
        carouselContainer.addEventListener('mouseleave', startAutoSlide); // Retoma
    }
    
    // Inicializa os dots
    updateDots();
});