export function setupInitialContent() {
  const video = document.getElementById("video-element");
  const wrapper = document.getElementById("video-poster-wrapper");
  const playButton = document.getElementById("play-button");
  const viewTeamButton = document.getElementById("view-team-button");
  const initialState = document.getElementById("initial-state");

  const showPoster = () => {
    video?.pause();
    video?.classList.add("hidden");
    if (wrapper) wrapper.style.display = "flex";
  };

  const hidePoster = () => {
    if (wrapper) wrapper.style.display = "none";
    video?.classList.remove("hidden");
    video?.play();
  };

  playButton?.addEventListener("click", (e) => {
    e.stopPropagation();
    hidePoster();
  });

  video?.addEventListener("pause", () => {
    if (!video.ended) {
      showPoster();
    }
  });

  setTimeout(() => {
    const studentContainer = document.getElementById("student-container");
    let showingSlide = false;

    if (viewTeamButton && studentContainer) {
      viewTeamButton.addEventListener("click", () => {
        showingSlide = !showingSlide;

        if (showingSlide) {
          studentContainer.classList.remove("hidden");
          studentContainer.classList.add("flex");
          initialState?.classList.add("hidden");
          video?.pause();
          viewTeamButton.textContent = "Ver Video";
        } else {
          studentContainer.classList.add("hidden");
          studentContainer.classList.remove("flex");
          initialState?.classList.remove("hidden");
          viewTeamButton.textContent = "Ver Integrantes";
        }
      });
    }
  }, 100);
}
