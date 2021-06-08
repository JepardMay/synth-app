import * as Tone from 'tone';

const initPiano = () => {
  let init = false;
  const piano = document.querySelector('.piano');
  const synth = new Tone.PolySynth(Tone.Synth).toDestination();
  const keys = document.querySelectorAll('.key');
  // const now = Tone.now();

  // Start Tone.js
  async function startPiano(evt) {
    if (!init) {
      await Tone.start();
      init = true;
    }

    // if (evt.key === )
  }

  // Event listeners
  piano.addEventListener('click', startPiano);

  document.addEventListener('keydown', startPiano);

  keys.forEach((key) => {
    key.addEventListener('click', () => {
      const note = key.dataset.note;
      synth.triggerAttackRelease(note, '16n');
    });
  });
};

export { initPiano };
