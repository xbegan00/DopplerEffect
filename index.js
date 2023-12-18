// to play 1 second we need an array of 44100 numbers
const sampleRate = 44100;

// create a typed array of size 44100 float numbers
const sineWaveArray440Hz = new Float32Array(sampleRate);
const sineWaveArray200Hz = new Float32Array(sampleRate);
const sineWaveArray800Hz = new Float32Array(sampleRate);

// fill all 44100 elements of arrays with Math.sin() values
for (let i = 0; i < sineWaveArray440Hz.length; i++) {
  sineWaveArray440Hz[i] = Math.sin((i * Math.PI * 8) / 440);
}

for (let i = 0; i < sineWaveArray200Hz.length; i++) {
  sineWaveArray200Hz[i] = Math.sin((i * Math.PI * 8) / 200);
}

for (let i = 0; i < sineWaveArray800Hz.length; i++) {
  sineWaveArray800Hz[i] = Math.sin((i * Math.PI * 8) / 800);
}

function playSound({ array, sampleRate }) {
  // We have to start with creating AudioContext
  const audioContext = new AudioContext({ sampleRate });
  // create audio buffer of the same length as our array
  const audioBuffer = audioContext.createBuffer(1, array.length, sampleRate);
  // this copies our sine wave to the audio buffer
  audioBuffer.copyToChannel(array, 0);
  // some JavaScript magic to actually play the sound
  const source = audioContext.createBufferSource();
  source.connect(audioContext.destination);
  source.buffer = audioBuffer;
  source.start();
}

function playSineWave440Hz() {
  playSound({ array: sineWaveArray440Hz, sampleRate });
}

function playSineWave200Hz() {
  playSound({ array: sineWaveArray200Hz, sampleRate });
}

function playSineWave800Hz() {
  playSound({ array: sineWaveArray800Hz, sampleRate });
}
