var press_counter = 0;
var isPlaying = false;

bell = new Audio('audio/bell_short.wav');
whoSThere = new Audio('audio/who-s-there.wav');

function processCommand(serial_cmd) {
    var soundToPlay = 0;

    // button is clicked and no sound is playing
    if (serial_cmd =="b1" && isPlaying == false){
        
        if (press_counter < 5){
            soundToPlay = bell;
        }else if (press_counter == 5){
           soundToPlay = whoSThere;
        }


        if(soundToPlay != 0){
            playSound(soundToPlay);
        }
        press_counter++;
    }
}

function playSound(sound){
    sound.play();
    isPlaying = true;

    // when the sound end
    sound.onended = function() {
       // console.log(audio ended");
        isPlaying = false;
       // sendToArduino("10")
    };
}


function start(){
    console.log("script.js is loaded");
}

window.onload = start();