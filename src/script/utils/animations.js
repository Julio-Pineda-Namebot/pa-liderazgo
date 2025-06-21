import { gsap } from "gsap"

export class AnimationManager {
  constructor() {
    // Map para guardar todas las animaciones activas y poder cancelarlas si es necesario
    this.activeTimelines = new Map()
  }

  // Configura el estado inicial de todos los elementos animables
  // Los oculta y los posiciona para las animaciones de entrada
  setupInitialAnimations() {
    // Oculta el contenido de los proyectos y los mueve hacia abajo con escala reducida
    gsap.set(".project-content", { opacity: 0, y: 30, scale: 0.95 })

    // Oculta las imágenes, las hace más pequeñas, las rota y las mueve hacia abajo
    gsap.set(".project-image", { opacity: 0, scale: 0.7, rotation: -10, y: 20 })

    // Oculta los overlays y los mueve hacia abajo con escala reducida
    gsap.set(".project-overlay", { opacity: 0, y: 20, scale: 0.9 })

    // Oculta todos los fondos de proyectos (elementos que terminan en "-bg")
    gsap.set('[id$="-bg"]', { opacity: 0 })

    // Muestra el estado inicial (pantalla de bienvenida)
    gsap.set("#initial-state", { opacity: 1 })
  }

  /**
   * Cancela todas las animaciones activas para evitar conflictos
   * Limpia el Map de timelines activos
   */
  killAllAnimations() {
    // Recorre todas las animaciones guardadas y las cancela
    this.activeTimelines.forEach((timeline) => {
      if (timeline) {
        timeline.kill() // Método de GSAP para cancelar una animación
      }
    })
    // Limpia el Map de animaciones
    this.activeTimelines.clear()
  }

  /**
   * Oculta inmediatamente todos los proyectos sin animación
   * @param {Object} projects - Objeto con todos los proyectos disponibles
   */
  hideAllProjects(projects) {
    // Para cada proyecto, resetea todos sus elementos al estado oculto
    Object.keys(projects).forEach((projectId) => {
      // Oculta el fondo del proyecto
      gsap.set(`#${projectId}-bg`, { opacity: 0 })

      // Oculta y reposiciona el contenido
      gsap.set(`#${projectId}-content`, { opacity: 0, y: 30, scale: 0.95 })

      // Oculta y reposiciona la imagen
      gsap.set(`#${projectId}-image`, { opacity: 0, scale: 0.7, rotation: -10, y: 20 })

      // Oculta y reposiciona el overlay
      gsap.set(`#${projectId}-overlay`, { opacity: 0, y: 20, scale: 0.9 })
    })
  }

  /**
   * Anima la entrada de un proyecto específico
   * @param {string} projectId - ID del proyecto a mostrar
   * @param {Function} onComplete - Callback que se ejecuta al terminar la animación
   */
  showProjectAnimation(projectId, onComplete) {
    // Oculta inmediatamente el estado inicial
    gsap.set("#initial-state", { opacity: 0 })

    // Crea una nueva timeline (secuencia de animaciones) de GSAP
    const tl = gsap.timeline({
      onComplete: onComplete, // Se ejecuta cuando termina toda la secuencia
    })

    // Guarda la timeline para poder cancelarla después si es necesario
    this.activeTimelines.set(projectId, tl)

    // SECUENCIA DE ANIMACIONES (se ejecutan en orden con overlaps):

    // 1. Muestra el fondo del proyecto
    tl.to(`#${projectId}-bg`, {
      opacity: 1,
      duration: 0.25, // 250ms
      ease: "power2.out", // Curva de animación suave
    })
      // 2. Anima la entrada del contenido (texto, botones, etc.)
      .fromTo(
        `#${projectId}-content`,
        { opacity: 0, y: 30, scale: 0.95 }, // Estado inicial
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3, // 300ms
          ease: "power2.out",
        },
        "-=0.15", // Empieza 150ms antes de que termine la animación anterior
      )
      // 3. Anima la entrada de la imagen con efecto de rebote
      .fromTo(
        `#${projectId}-image`,
        { opacity: 0, scale: 0.7, rotation: -10, y: 20 }, // Estado inicial
        {
          opacity: 1,
          scale: 1,
          rotation: -1, // Rotación final sutil
          y: 0,
          duration: 0.4, // 400ms
          ease: "back.out(1.2)", // Efecto de rebote al final
        },
        "-=0.2", // Empieza 200ms antes de que termine la animación anterior
      )
      // 4. Anima la entrada del overlay
      .fromTo(
        `#${projectId}-overlay`,
        { opacity: 0, y: 20, scale: 0.9 }, // Estado inicial
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.25, // 250ms
          ease: "power2.out",
        },
        "-=0.15", // Empieza 150ms antes de que termine la animación anterior
      )
  }

  /**
   * Anima la salida de un proyecto y regresa al estado inicial
   * @param {string} projectId - ID del proyecto a ocultar
   * @param {Function} onComplete - Callback que se ejecuta al terminar la animación
   */
  hideProjectAnimation(projectId, onComplete) {
    // Crea una nueva timeline para la animación de salida
    const tl = gsap.timeline({
      onComplete: onComplete, // Se ejecuta cuando termina la animación
    })

    // Guarda la timeline con clave "exit"
    this.activeTimelines.set("exit", tl)

    // SECUENCIA DE SALIDA:

    // 1. Oculta todos los elementos del proyecto en orden inverso con stagger
    tl.to([`#${projectId}-overlay`, `#${projectId}-image`, `#${projectId}-content`, `#${projectId}-bg`], {
      opacity: 0,
      duration: 0.2, // 200ms para cada elemento
      ease: "power2.in", // Curva de animación que acelera al final
      stagger: 0.02, // Delay de 20ms entre cada elemento (efecto cascada)
    })
      // 2. Muestra el estado inicial
      .to(
        "#initial-state",
        {
          opacity: 1,
          duration: 0.2, // 200ms
          ease: "power2.out",
        },
        "-=0.1", // Empieza 100ms antes de que termine la animación anterior
      )
  }
}
