import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

export function setupSlideGsap() {    
    gsap.registerPlugin(Draggable, InertiaPlugin);

    var slideDelay = 5;
    var slideDuration = 0.3;
    var wrap = true;

    var slides = document.querySelectorAll(".slide");
    var numSlides = slides.length;
    var currentIndex = 0;
    var isAnimating = false;

    var timer = gsap.delayedCall(slideDelay, autoPlay);

    // Función para actualizar las clases de las slides
    function updateSlideClasses() {
        slides.forEach((slide, idx) => {
            slide.classList.remove('active', 'next', 'prev');
            
            if (idx === currentIndex) {
                slide.classList.add('active');
            } else if (idx === (currentIndex + 1) % numSlides) {
                slide.classList.add('next');
            } else if (idx === (currentIndex - 1 + numSlides) % numSlides) {
                slide.classList.add('prev');
            }
        });
    }

    // Función para ir a una slide específica
    function goToSlide(index, animate = true) {
        if (isAnimating) return;
        
        isAnimating = true;
        var previousIndex = currentIndex;
        currentIndex = wrap ? ((index % numSlides) + numSlides) % numSlides : Math.max(0, Math.min(index, numSlides - 1));
        
        if (animate && previousIndex !== currentIndex) {
            // Animar la transición
            gsap.to(slides[previousIndex], {
                duration: slideDuration,
                ease: "power2.out",
                onComplete: () => {
                    updateSlideClasses();
                    isAnimating = false;
                }
            });
        } else {
            updateSlideClasses();
            isAnimating = false;
        }
        
        timer.restart(true);
    }

    // Función para siguiente slide
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    // Función para slide anterior
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // Autoplay
    function autoPlay() {
        if (!isAnimating) {
            nextSlide();
        } else {
            timer.restart(true);
        }
    }

    // Configurar draggable en el contenedor
    var startX = 0;
    var currentX = 0;
    var isDragging = false;
    var threshold = 50; // Umbral mínimo para cambiar slide

    var draggable = new Draggable(".slides-container", {
        type: "x",
        inertia: true,
        onPress: function(e) {
            timer.pause();
            startX = e.x || e.clientX;
            isDragging = true;
        },
        onDrag: function(e) {
            if (!isDragging) return;
            currentX = e.x || e.clientX;
        },
        onRelease: function(e) {
            if (!isDragging) return;
            
            var deltaX = currentX - startX;
            
            if (Math.abs(deltaX) > threshold) {
                if (deltaX > 0) {
                    // Arrastró hacia la derecha - slide anterior
                    prevSlide();
                } else {
                    // Arrastró hacia la izquierda - siguiente slide
                    nextSlide();
                }
            }
            
            isDragging = false;
            timer.resume();
        }
    });

    // Controles con teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Pausar autoplay al hacer hover
    var container = document.querySelector(".slides-container");
    container.addEventListener("mouseenter", () => timer.pause());
    container.addEventListener("mouseleave", () => timer.resume());

    // Inicializar
    updateSlideClasses();
    timer.restart(true);

    // Manejar resize
    window.addEventListener("resize", function() {
        draggable.update();
    });
}