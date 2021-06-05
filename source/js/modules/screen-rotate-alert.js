import { showOverlay, hideOverlay } from './utils';

const screenRotateAlert = () => {
  function checkOrientation() {
    if (window.innerWidth < 425 && !window.matchMedia('(orientation: landscape)').matches) {
      showOverlay();
    } else {
      hideOverlay();
    }
  }

  window.addEventListener('orientationchange', checkOrientation, false);
  window.addEventListener('resize', checkOrientation, false);
};

export { screenRotateAlert };
