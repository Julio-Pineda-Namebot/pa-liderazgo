export class DOMManager {
  static updateBrandName(text) {
    const brandElement = document.getElementById("brand-name")
    if (brandElement) {
      brandElement.textContent = text
    }
  }

  static setupProjectEventListeners(onHover, onLeave) {
    document.querySelectorAll(".project-item").forEach(button => {
      const projectId = button.dataset.project

      button.addEventListener("mouseenter", () => {
        onHover(projectId)
      })

      button.addEventListener("mouseleave", () => {
        onLeave()
      })
    })
  }
}
