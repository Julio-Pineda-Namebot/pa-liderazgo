export class ClockManager {
  static init() {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
      const timeElement = document.getElementById("current-time")
      if (timeElement) {
        timeElement.textContent = `${timeString}`
      }
    }

    updateTime()
    setInterval(updateTime, 1000)
  }
}