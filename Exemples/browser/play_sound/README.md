# Basics

- Delcare sound

```javascript
audio = new Audio("/bell.wav");
```

- Play/Pause

```javascript
audio.play();

audio.pause();
```

- Do something at the end of the audio

```javascript
audio.onended = function () {
  // do something
};
```

Learn more on the official [documentation](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio)
