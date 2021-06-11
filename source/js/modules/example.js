import * as Tone from 'tone';

const showConsoleLog = () => {
  let init = false;
  const piano = document.querySelector('.piano');
  const volume = document.querySelector('.volume');
  const synth = new Tone.PolySynth(Tone.Synth).toDestination();
  const keys = document.querySelectorAll('.key');
  const now = Tone.now();

  async function initPiano(evt) {
    if (!init) {
      await Tone.start();
      init = true;
    }

    // if (evt.key === )
  }

  const changeVolume = () => {
    if (volume.classList.contains('volume--off')) {
      volume.classList.remove('volume--off');
    } else {
      volume.classList.addd('volume--off');
    }
  };

  piano.addEventListener('click', initPiano);

  document.addEventListener('keydown', initPiano);

  volume.addEventListener('click', changeVolume);

  keys.forEach((key) => {
    key.addEventListener('click', () => {
      const note = key.dataset.note;
      synth.triggerAttackRelease(note, '16n');
    });
  });
};

export { showConsoleLog };