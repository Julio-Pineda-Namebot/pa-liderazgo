import { ClockManager } from "@script/utils/clocks"
import { AnimationManager } from "@script/utils/animations"
import { DOMManager } from "@script/utils/dom"
import { PROJECTS_CONFIG, DEFAULT_BRAND_NAME } from "@script/config/projects"
import gsap from "gsap"

export class PortfolioManager {
  constructor() {
    this.projects = PROJECTS_CONFIG
    this.currentProject = null
    this.isAnimating = false
    this.animationManager = new AnimationManager()
    this.hoverTimeout = null
    this.leaveTimeout = null
    this.showingStudents = false;
  }

  init() {
    this.setupClock()
    this.setupInitialAnimations()
    this.setupEventListeners()
    this.setupViewTeamButton();
  }

  setupClock() {
    ClockManager.init()
  }

  setupInitialAnimations() {
    this.animationManager.setupInitialAnimations()
  }

  setupEventListeners() {
    DOMManager.setupProjectEventListeners(
      projectId => this.handleProjectHover(projectId),
      () => this.handleProjectLeave()
    )
  }

  killAllAnimations() {
    this.animationManager.killAllAnimations()

    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout)
      this.hoverTimeout = null
    }
    if (this.leaveTimeout) {
      clearTimeout(this.leaveTimeout)
      this.leaveTimeout = null
    }

    this.isAnimating = false
  }

  hideAllProjects() {
    this.animationManager.hideAllProjects(this.projects)
  }

  handleProjectHover(projectId) {
    if (this.currentProject === projectId) return

    this.killAllAnimations()
    this.hideAllProjects()
    this.showProject(projectId)
  }

  handleProjectLeave() {
    if (this.hoverTimeout) clearTimeout(this.hoverTimeout)
    if (this.leaveTimeout) clearTimeout(this.leaveTimeout)

    this.returnToDefault()
  }

  forceReturnToDefault() {
    this.killAllAnimations()
    this.hideAllProjects()
    this.currentProject = null

    DOMManager.updateBrandName(DEFAULT_BRAND_NAME)

    gsap.set("#initial-state", { opacity: 1 })
    gsap.set("#student-container", { opacity: 1 });
  }

  showProject(projectId) {
    this.isAnimating = true
    this.currentProject = projectId

    DOMManager.updateBrandName(this.projects[projectId].name)

    this.animationManager.showProjectAnimation(projectId, () => {
      this.isAnimating = false
    })
  }

  returnToDefault() {
    if (!this.currentProject) return

    this.killAllAnimations()

    const projectId = this.currentProject
    this.currentProject = null

    DOMManager.updateBrandName(DEFAULT_BRAND_NAME)

    this.animationManager.hideProjectAnimation(projectId, () => {
      gsap.set("#initial-state", { opacity: 1 })
      gsap.set("#student-container", { opacity: 1 });
    })
  }

  setupViewTeamButton() {
    const viewTeamButton = document.getElementById("view-team-button");
    if (!viewTeamButton) return;

    viewTeamButton.addEventListener("click", () => {
      this.showingStudents = !this.showingStudents;

      if (this.showingStudents) {
        this.killAllAnimations();
        this.animationManager.showStudentView();
        viewTeamButton.textContent = "Ver Video";
      } else {
        this.animationManager.hideStudentView();
        viewTeamButton.textContent = "Ver Integrantes";
      }
    });
  }

}
