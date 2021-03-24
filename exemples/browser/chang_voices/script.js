var press_counter = 1;

var synth = window.speechSynthesis
var voices = {};
voices.fr = [];
voices.en = [];

let chosenVoice = 0; 
let readyToSpeak = true;

// Pour choisir une voix
// chosenVoice = voices.langue.index
// langue "en" ou "fr"
//  
// Exemple : chosenVoice

function speakMessage(msg_to_speak) {

    if(readyToSpeak){
        readyToSpeak = false;
    
        var msg = new SpeechSynthesisUtterance();
    
        if(chosenVoice != 0){
            msg.voice = chosenVoice;
        }
    
        msg.rate = 0.6; // SPEED OF THE VOICE From 0.1 to 10 
        msg.pitch = 1; // From 0 to 2
        msg.lang = 'en-US';
      
        msg.text = msg_to_speak;

        synth.speak(msg); 
        document.getElementById("speaking").style.display = "block";
        msg.onend = function(event) {
            
           // sendToArduino("10"); // send code 10: voice finished to speak
            readyToSpeak = true;
            document.getElementById("speaking").style.display = "none";
            console.log("sended 10")
        }
    }else{
        //console.log("not ready to speak");
    } 
}

function loadVoice (){
    synth.onvoiceschanged = ()=>{
        const v = synth.getVoices();
        //console.log("est-ce que ça marche")
        console.log("ready");
        console.log(v)
        for (let i = 0 ; i<v.length;i++){
            const voice = v[i];
           const lang  = voice.lang;
           if(lang[0] == "f" && lang[1] == "r"){
               voices.fr.push(voice);
           }else if (lang[0] == "e" && lang[1] == "n"){
            voices.en.push(voice);
            }
        }
        const container = document.getElementById("voices");
        container.style.border =  "solid black";
        for(lang in voices){
            const div = document.createElement("DIV");
            const h1 = document.createElement("DIV");
            h1.innerHTML = lang;
            div.appendChild(h1);
            for(let i = 0;i<voices[lang].length;i++){
                var btn = document.createElement("BUTTON");   // Create a <button> element
                btn.style.textAlign = "left";
                btn.innerHTML = `${i} - ${voices[lang][i].name}`;  
                btn.onclick = () => {changeVoice(lang, i)};                 // Insert text
                div.appendChild(btn);
            }
            container.appendChild(div);    
        }
    }

}

function changeVoice(lang, index){
    
    chosenVoice = voices[lang][index];
    console.log(lang, index, "|", chosenVoice.name);
    
    const l  = lang.toString();
    console.log(l);
    if(l == "en"){
        speakMessage("This is a test message so you can here my voice");
    }else{
        speakMessage("Ceci est un message de test qui vous permet d'entendre ma voix");
    }
    
    console.warn(
    `Pour utiliser cette voix :
    ~ligne 8
    ChosenVoice = voices.${lang}.${index}`);
   

}

function  creatSpeakingSpan(){
   
    const speakSpan = document.createElement("SPAN");
    speakSpan.id = "speaking";
    speakSpan.innerHTML = "SPEAKING"; 
    speakSpan.style.speacolor = "black"; 
    speakSpan.style.display= "none";
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

window.onload  = function(){
    loadVoice();
    creatSpeakingSpan();
}









