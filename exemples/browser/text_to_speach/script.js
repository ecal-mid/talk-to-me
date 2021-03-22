var press_counter = 1;

function processCommand(serial_cmd) {
    var text_msg = "";
    if (serial_cmd =="1"){
        console.log("counter = "+ press_counter);
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
    var synth = window.speechSynthesis
    var msg = new SpeechSynthesisUtterance();
    //var voices = synth.getVoices();

    msg.rate = 0.6; // From 0.1 to 10
    msg.pitch = 1; // From 0 to 2
    msg.lang = 'en-US';
    //msg.voice = voices[12];
    msg.text = msg_to_speak;
    synth.speak(msg);

    msg.onend = function(event) {
        //console.log('Utterance has finished being spoken after ' + event.elapsedTime + ' milliseconds.');
        sendToArduino("10"); // send code 10: voice finished to speak
    } 
    //console.log(voices);
}
