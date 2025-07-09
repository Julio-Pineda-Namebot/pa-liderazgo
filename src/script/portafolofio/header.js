import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function HeaderGsap() {
    document.addEventListener("astro:page-load", () => {
        gsap.registerPlugin(ScrollTrigger)

        const header = document.getElementById("main-header")
        const headerBg = document.getElementById("header-bg")
        const headerContent = document.getElementById("header-content")
        const brandName = document.getElementById("brand-name")

        if (header && headerBg && headerContent && brandName) {
            // Estado inicial
            gsap.set(headerBg, { opacity: 0 })

            // Crear timeline para el scroll
            const headerTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "+=150",
                    scrub: 1,
                    onUpdate: self => {
                        const progress = self.progress

                        // Aplicar transformaciones basadas en el progreso del scroll
                        gsap.to(headerBg, {
                            opacity: progress,
                            duration: 0.1
                        })

                        // Animar el contenido del header (padding y tamaño)
                        gsap.to(headerContent, {
                            paddingTop: gsap.utils.interpolate(24, 8, progress) + "px",
                            paddingBottom: gsap.utils.interpolate(24, 8, progress) + "px",
                            paddingLeft: gsap.utils.interpolate(24, 64, progress) + "px",
                            paddingRight: gsap.utils.interpolate(24, 64, progress) + "px",
                            duration: 0.1
                        })

                        // Animar el header completo (ancho y posición)
                        gsap.to(header, {
                            left: gsap.utils.interpolate(0, 400, progress) + "px",
                            right: gsap.utils.interpolate(0, 400, progress) + "px",
                            top: gsap.utils.interpolate(0, 20, progress) + "px",
                            borderRadius: gsap.utils.interpolate(0, 20, progress) + "px",
                            duration: 0.1
                        })

                        // Animar el background con border radius
                        gsap.to(headerBg, {
                            borderRadius: gsap.utils.interpolate(0, 20, progress) + "px",
                            duration: 0.1
                        })

                        // Animar el tamaño del texto
                        gsap.to(brandName, {
                            fontSize: gsap.utils.interpolate(20, 14, progress) + "px",
                            duration: 0.1
                        })
                    }
                }
            })

            // Efecto hover para el botón de menú
            const menuButton = document.getElementById("menu-button")
            if (menuButton) {
                menuButton.addEventListener("mouseenter", () => {
                    gsap.to(menuButton, {
                        scale: 1.05,
                        duration: 0.2,
                        ease: "power2.out"
                    })
                })

                menuButton.addEventListener("mouseleave", () => {
                    gsap.to(menuButton, {
                        scale: 1,
                        duration: 0.2,
                        ease: "power2.out"
                    })
                })
            }
        }

        // Inicializar el reloj (solo si no está ya inicializado por ClockManager)
        const timeElement = document.getElementById("current-time")
        if (timeElement && timeElement.textContent === "") {
            const updateTime = () => {
                const now = new Date()
                const timeString = now.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                })
                if (timeElement) {
                    timeElement.textContent = timeString
                }
            }

            updateTime()
            setInterval(updateTime, 1000)
        }
    })
}