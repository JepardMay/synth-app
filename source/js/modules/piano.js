import * as Tone from 'tone';

let init = false;
const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const notes = document.querySelectorAll('.key');
const keys = [
  'Tab',
  '1',
  'q',
  '2',
  'w',
  'e',
  '4',
  'r',
  '5',
  't',
  '6',
  'y',
  'u',
  '8',
  'i',
  '9',
  'o',
  'p',
  '-',
  '[',
  '=',
  ']',
  'Backspace',
  '\\'
];

// Start Tone.js
async function startPiano() {
  await Tone.start();
  init = true;
}

const initPiano = () => {
  const pressNote = (note, isClicked) => {
    const playedNote = note.dataset.note;
    if (isClicked) {
      synth.triggerAttackRelease(playedNote, '16n');
      note.classList.add('active');
      setTimeout(() => {
        note.classList.remove('active');
      }, 150);
    } else {
      synth.triggerAttack(playedNote, Tone.context.currentTime);
      note.classList.add('active');
    }
  };

  const releaseNote = (note) => {
    const releasedNote = note.dataset.note;
    synth.triggerRelease(releasedNote);
    note.classList.remove('active');
  };

  // Event listeners
  document.addEventListener('keydown', (evt) => {
    if (!init) {
      startPiano();
    }

    evt.preventDefault();

    keys.forEach((key, i) => {
      if (evt.key === key) {
        releaseNote(notes[i]);
        pressNote(notes[i]);
      }
    });
  });

  document.addEventListener('keyup', (evt) => {
    keys.forEach((key, i) => {
      if (evt.key === key) {
        evt.preventDefault();
        releaseNote(notes[i]);
      }
    });
  });

  document.addEventListener('click', () => {
    if (!init) {
      startPiano();
    }
  });

  notes.forEach((note) => {
    note.addEventListener('click', () => {
      pressNote(note, true);
    });
  });
};

export { initPiano, startPiano };
