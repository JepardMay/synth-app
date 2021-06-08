import { onEscKeyPress, showOverlay, hideOverlay } from './utils';

const screenRotateAlert = () => {
  const modal = document.querySelector('.modal');

  const onEscPress = (evt) => {
    onEscKeyPress(evt, closeModal);
  };

  const onOverlayClick = (evt) => {
    if (evt.target.closest('.overlay') && !evt.target.closest('.modal--active')) {
      closeModal();
    }
  };

  const closeModal = () => {
    modal.classList.remove('modal--active');
    hideOverlay();
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', onOverlayClick);
  };

  const showModal = () => {
    modal.classList.add('modal--active');
    showOverlay();
    document.addEventListener('keydown', onEscPress);
    document.addEventListener('click', onOverlayClick);
  };

  function checkOrientation() {
    if (window.innerWidth < 425 && !window.matchMedia('(orientation: landscape)').matches) {
      showModal();
    } else {
      closeModal();
    }
  }

  window.addEventListener('orientationchange', checkOrientation, false);
  window.addEventListener('resize', checkOrientation, false);
  window.onload = checkOrientation;
};

export { screenRotateAlert };
