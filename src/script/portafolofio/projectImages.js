import gsap from "gsap"

export function ProjectImagesGsap() {
    document.addEventListener("astro:page-load", () => {
        // Escucha clicks en los botones del sidebar
        document.querySelectorAll('.project-item').forEach(btn => {
            btn.addEventListener('click', e => {
                // Evita navegación inmediata para mostrar la animación
                e.preventDefault()
                const projectId = btn.getAttribute('data-project')
                const imageDiv = document.getElementById(`${projectId}-image`)
                if (imageDiv) {
                    // Lleva la imagen al frente y la hace crecer
                    gsap.to(imageDiv, {
                        zIndex: 50,
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: "100vw",
                        height: "100vh",
                        scale: 1,
                        opacity: 1,
                        duration: 1.5,
                        ease: "power2.inOut",
                        onStart: () => {
                            imageDiv.style.pointerEvents = "none"
                            imageDiv.style.position = "fixed"
                            imageDiv.style.display = "flex"
                            imageDiv.style.alignItems = "center"
                            imageDiv.style.justifyContent = "center"
                        },
                        onComplete: () => {
                            window.location.href = btn.getAttribute('href')
                        }
                    })
                    const img = imageDiv.querySelector("img")
                    if (img) {
                        gsap.to(img, {
                            width: "100vw",
                            height: "100vh",
                            borderRadius: 0,
                            objectFit: "cover",
                            duration: 1.5,
                            ease: "power2.inOut"
                        })
                    }
                } else {
                    window.location.href = btn.getAttribute('href')
                }
            })
        })
    })
}