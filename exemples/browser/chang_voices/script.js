var press_counter = 1;

var synth = window.speechSynthesis;
var voices = {};
voices.fr = [];
voices.en = [];

console.log(voices);

let chosenVoice = 0;
let readyToSpeak = true;
let speed = 1;
let pitch = 1;

var msg = new SpeechSynthesisUtterance();

const autoPitchBox = document.getElementById("autoPitch");

let autoPitch = false;

autoPitchBox.addEventListener("change", () => {
  autoPitch = autoPitchBox.checked;
});

// Pour choisir une voix
// chosenVoice = voices.langue.index
// langue "en" ou "fr"
//
// Exemple : chosenVoice
const speedSlider = document.getElementById("speed");

speedSlider.addEventListener("input", () => {
  speed = speedSlider.value;

  msg.rate = speed; // SPEED OF THE VOICE From 0.1 to 10

  document.getElementById("speedValue").innerHTML = speed;

  if (autoPitch) {
    pitch = 2 - speed;
    pitchSlider.value = pitch;
    msg.pitch = pitch; // From 0 to 2
    document.getElementById("pitchValue").innerHTML = pitch;
  }
});

const pitchSlider = document.getElementById("pitch");

pitchSlider.addEventListener("change", () => {
  if (!autoPitch) {
    pitch = pitchSlider.value;
    msg.pitch = pitch; // From 0 to 2
    document.getElementById("pitchValue").innerHTML = pitch;
  }
});

function speakMessage(msg_to_speak) {
  if (readyToSpeak) {
    readyToSpeak = false;

    if (chosenVoice != 0) {
      msg.voice = chosenVoice;
      msg.lang = chosenVoice.lang;
      //console.log(chosenVoice);
    }

    msg.text = msg_to_speak;

    synth.speak(msg);
    // document.getElementById("speaking").style.display = "block";

    msg.onend = function (event) {
      // sendToArduino("10"); // send code 10: voice finished to speak
      readyToSpeak = true;
      document.getElementById("speaking").style.display = "none";
      //console.log("sended 10");
    };
  } else {
    //console.log("not ready to speak");
  }
}

function loadVoice() {
  synth.onvoiceschanged = () => {
    const v = synth.getVoices();
    //console.log("est-ce que ça marche")
    console.log("ready");
    console.log(v);
    for (let i = 0; i < v.length; i++) {
      const voice = v[i];
      const lang = voice.lang;
      if (lang[0] == "f" && lang[1] == "r") {
        voices.fr.push(voice);
      } else if (lang[0] == "e" && lang[1] == "n") {
        voices.en.push(voice);
      }
    }
    const container = document.getElementById("voices");
    container.style.border = "solid black";
    for (lang in voices) {
      const div = document.createElement("DIV");
      const h1 = document.createElement("DIV");
      h1.innerHTML = lang;
      div.appendChild(h1);
      for (let i = 0; i < voices[lang].length; i++) {
        var btn = document.createElement("BUTTON"); // Create a <button> element
        btn.style.textAlign = "left";
        btn.classList = "voice";

        const currentVoice = voices[lang][i];
        btn.id = currentVoice.name;
        btn.innerHTML = `${i} - ${currentVoice.name}`;
        btn.onclick = () => {
          changeVoice(currentVoice);
        }; // Insert text
        div.appendChild(btn);
      }
      container.appendChild(div);
    }
  };
}

function changeVoice(voice) {
  chosenVoice = voice;
  voices = document.getElementsByClassName("voice");

  console.log(voice.lang, "|", voice.name);
  const lang = voice.lang;

  for (let i = 0; i < voices.length; i++) {
    cVoice = voices[i];
    cVoice.style.backgroundColor = "grey";
    if (cVoice.id == voice.name) {
      cVoice.style.backgroundColor = "green";
    }
  }

  //   if (lang[0] == "e" && lang[1] == "n") {
  //     speakMessage("this is a test sentence so you can here my voice");
  //   } else {
  //     speakMessage(
  //       "Ceci est un message de test qui vous permet d'entendre ma voix"
  //     );
  //   }
}

// const btPlay = document.getElementById("btPlay");
// btPlay.addEventListener("click", () => {
//   console.log("test");
// });

function playText() {
  const text = document.getElementById("inputText").value;
  speakMessage(text);
}

function creatSpeakingSpan() {
  const speakSpan = document.createElement("SPAN");
  speakSpan.id = "speaking";
  speakSpan.innerHTML = "SPEAKING";
  speakSpan.style.speacolor = "black";
  speakSpan.style.display = "none";
  speakSpan.style.borderRadius = "300px";
  speakSpan.style.position = "fixed";
  speakSpan.style.textAlign = "center";
  speakSpan.style.top = "40%";
  speakSpan.style.backgroundColor = "white";
  // speakSpan.style.left = "25%";
  speakSpan.style.width = "90%";
  speakSpan.style.padding = "30px";
  // speakSpan.style.fontSize = "10vm";
  speakSpan.style.zIndex = 100;
  document.body.appendChild(speakSpan);
}

window.onload = function () {
  loadVoice();
  creatSpeakingSpan();
};
