import { PortfolioManager } from "@script/Portafolio-manager";
import { HeaderGsap } from "@script/portafolofio/header";
import { setupSlideGsap } from "./utils/slideGsap";
import { ProjectImagesGsap } from "./portafolofio/projectImages";
import { setupInitialContent } from "./portafolofio/initialContent";
import { setupVideoModalEvents } from "./portafolofio/videoModal";

export function initPortfolioApp() {
  HeaderGsap()
  document.addEventListener("astro:page-load", () => {
    ProjectImagesGsap()
    const portfolioManager = new PortfolioManager();
    portfolioManager.init()
    setupInitialContent()
    setupSlideGsap()
    setupVideoModalEvents()
  });
}
