const overlay = document.querySelector('.overlay');

const showOverlay = function () {
  overlay.classList.add('overlay--show');
};

const hideOverlay = function () {
  overlay.classList.remove('overlay--show');
};

export { showOverlay, hideOverlay };
