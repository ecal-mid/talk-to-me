# Basic

[documentation](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio)

- Delcare sound

```javascript
audio = new Audio("/bell.wav");
```

- Play/Pause

```javascript
audio.play();

audio.pause();
```

- Do something at the end of the audi

```javascript
audio.onended = function () {
  // do something
};
```
