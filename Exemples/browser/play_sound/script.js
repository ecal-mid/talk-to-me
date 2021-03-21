var press_counter = 1;
var isPlaying = false;

bell = new Audio('audio/bell_short.wav');

function processCommand(serial_cmd) {
    var soundToPlay;
    if (serial_cmd =="b1"){
            console.log("here");
            soundToPlay = bell;
           
        if (press_counter == 1){
               
        }else if (press_counter == 2){
           
        }
        if(soundToPlay != ""){
            playSound(soundToPlay);
        }
        press_counter++;
    }
}

function playSound(sound){
    sound.play();
    isPlaying = true;
    sound.onended = function() {
        console.log("The audio has ended");
        isPlaying = false;
       // sendToArduino("10")
    };
}


function start(){
    console.log("script.js is loaded");
}

window.onload = start();