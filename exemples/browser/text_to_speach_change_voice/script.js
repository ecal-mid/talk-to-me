var press_counter = 1;

var synth = window.speechSynthesis
var voices = {};
voices.fr = [];
voices.en = [];

let chosenVoice = 0; 


// Pour choisir une voix
// chosenVoice = voices.langue.index
// langue "en" ou "fr"
//  
// Exemple : chosenVoice

let readyToSpeak = true;

function processCommand(serial_cmd) {
    var text_msg = "";
    if (serial_cmd =="1"){
        if (press_counter == 1){
            text_msg ="you just pressed me";
        }else if (press_counter == 2){
            text_msg ="you pressed me again!";
        }else if (press_counter == 5){
            text_msg ="you pressed me again, i feel very pressed!";
        }else if (press_counter == 10){
            text_msg ="are you aware that you pressed me already "+press_counter+" times?";
        }else if (press_counter == 11){
            text_msg ="you pressed me again, my life expectancy is around 20000 times, after that i will not feel your presses anymore";
        }else{
            text_msg ="you pressed me already "+press_counter+" times";
        }
        speakMessage(text_msg);
        press_counter++;
    }
 
}

function speakMessage(msg_to_speak) {

    if(readyToSpeak){
        readyToSpeak = false;
    
        var msg = new SpeechSynthesisUtterance();
    
        if(chosenVoice != 0){
            msg.voice = chosenVoice;
            msg.lang = chosenVoice.lang;
           console.log(chosenVoice);
        }
    
        msg.rate = 0.6; // SPEED OF THE VOICE From 0.1 to 10 
        msg.pitch = 1; // From 0 to 2

        msg.text = msg_to_speak;
        synth.speak(msg);
        
        document.getElementById("speaking").style.display = "block";

        msg.onend = function(event) {// at the end of the message
            sendToArduino("10"); // send code 10
            readyToSpeak = true;
            document.getElementById("speaking").style.display = "none";
            console.log("sended 10")
        }
    }else{
        console.log("not ready to speak");
    } 
}










