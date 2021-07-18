const initVolume = () => {
  const volume = document.querySelector('.volume');

  // Change volume button
  const changeVolume = () => {
    if (volume.classList.contains('volume--off')) {
      volume.classList.remove('volume--off');
    } else {
      volume.classList.add('volume--off');
    }
  };

  // Event listeners
  volume.addEventListener('click', changeVolume);
};

export { initVolume };
