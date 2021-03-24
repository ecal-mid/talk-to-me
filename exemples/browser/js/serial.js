/*
This code is highly based on the webSerial tutorial by Google:
https://codelabs.developers.google.com/codelabs/web-serial/#0

The intention is to get you started with using webSerial for your Arduino project.
*/

//Define the elements
let sendText = document.getElementById("sendText");
let sendButton = document.getElementById("sendButton");
let receiveText = document.getElementById("receiveText");
let connectButton = document.getElementById("connectButton");
let statusBar = document.getElementById("statusBar");
let sendButton1 = document.getElementById("sendButton1");
let sendButton2 = document.getElementById("sendButton2");
let sendButton3 = document.getElementById("sendButton3");
let sendButton4 = document.getElementById("sendButton4");
let sendButton5 = document.getElementById("sendButton5");

let fakeMode = true;

//Couple the elements to the Events
connectButton.addEventListener("click", clickConnect)
sendButton.addEventListener("click", clickSend)
sendButton1.addEventListener("click", () => {clickSendPreset("1");}, false);
sendButton2.addEventListener("click", () => {clickSendPreset("2");}, false);
sendButton3.addEventListener("click", () => {clickSendPreset("3");}, false);
sendButton4.addEventListener("click", () => {clickSendPreset("4");}, false);
sendButton5.addEventListener("click", () => {clickSendPreset("5");}, false);


//Define outputstream, inputstream and port so they can be used throughout the sketch
var outputStream, inputStream, port;
navigator.serial.addEventListener('connect', e => {
    statusBar.innerText = `Connected to ${e.port}`;
    connectButton.innerText = "Disconnect"
  });
  
  navigator.serial.addEventListener('disconnect', e => {
    statusBar.innerText = `Disconnected`;
    connectButton.innerText = "Connect"
  });
//Connect to the Arduino
async function connect() {

    //Optional filter to only see relevant boards
    const filter = {
        //usbVendorId: 0x2341 // Arduino SA
        usbVendorId: 0x1a86 // driver Nano
        
    };

    //Try to connect to the Serial port
    try {
        port = await navigator.serial.requestPort({ /*filters: [filter]*/ });
        // Continue connecting to |port|.

        // - Wait for the port to open.
        await port.open({ baudRate: 9600 });

        statusBar.innerText = "Connected";
        connectButton.innerText = "Disconnect"
        let decoder = new TextDecoderStream();
        inputDone = port.readable.pipeTo(decoder.writable);
        inputStream = decoder.readable;

        const encoder = new TextEncoderStream();
        outputDone = encoder.readable.pipeTo(port.writable);
        outputStream = encoder.writable;

        reader = inputStream.getReader();
        readLoop();
    } catch (e) {

        //If the pipeTo error appears; clarify the problem by giving suggestions.
        if (e == "TypeError: Cannot read property 'pipeTo' of undefined") {
            e += "\n Use Google Chrome and enable-experimental-web-platform-features"
        }
        connectButton.innerText = "Connect"
        statusBar.innerText = e;
    }
}
//Write to the Serial port
async function writeToStream(line) {
    const writer = outputStream.getWriter();
    writer.write(line);
    writer.releaseLock();
}

//Disconnect from the Serial port
async function disconnect() {

    if (reader) {
        await reader.cancel();
        await inputDone.catch(() => { });
        reader = null;
        inputDone = null;
    }
    if (outputStream) {
        await outputStream.getWriter().close();
        await outputDone;
        outputStream = null;
        outputDone = null;
    }
    statusBar.innerText = "Disconnected";
    connectButton.innerText = "Connect"
    //Close the port.
    await port.close();
    port = null;
}

//Read the incoming data
async function readLoop() {
    while (true) {
        const { value, done } = await reader.read();
        if (done === true){
            break;
        }
        
        processCommand(value) // send message to the function
        //When recieved something add it to the big textarea
        //receiveText.value += value;
        printReceivedValue(value); // print it in the monitor
        //Scroll to the bottom of the text field
        //receiveText.scrollTop = receiveText.scrollHeight;
    
}
}

//When the connectButton is pressed
async function clickConnect() {
    if (port) {
        //if already connected, disconnect
        disconnect();

    } else {
        //otherwise connect
        await connect();
    }
}

//When the send button is pressed
function clickSend() {
    //send the message
    sendToArduino(sendText.value)
    //and clear the input field, so it's clear it has been sent
    sendText.value = "";

}

function clickSendPreset(btn) {
    val = document.getElementById("value_btn"+btn).value;
    //send the message
    sendToArduino(val);
}

function sendToArduino(cmd){
    //send the message
    if(fakeMode == false){
        writeToStream(cmd)
    }
    // print in the monitor
    printSentValue(cmd)
}

function printSentValue(val){
    receiveText.value += 'sent → '+ val +'\r\n';
    //Scroll to the bottom of the text field
    receiveText.scrollTop = receiveText.scrollHeight;
}

function printReceivedValue(val){
    receiveText.value += 'received → '+ val +'\r\n';
    //Scroll to the bottom of the text field
    receiveText.scrollTop = receiveText.scrollHeight;
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

function creatButton(){

    var input = document.createElement("input");
    input.type = "checkbox";
    input.id = "fakeMode";
    input.style.width = "auto"

    var label = document.createElement("label");
    label.for = "fakeMode";
    label.innerHTML = "Arduino Simulation"
    

    document.body.appendChild(label);
    document.body.appendChild(input);
    
    
    var div = document.createElement("div");
    div.id  = "arduinoButtons";
    var h1  = document.createElement("h1");
    h1.innerHTML = " Fake arduino send";
    h1.style.backgroundColor = "white";
    h1.style.borderRadius = "300px";
    
    div.appendChild(h1);    
    const imgWidth = window.innerWidth*0.6
    div.style.width = imgWidth;
    div.style.height = imgWidth * 0.65;
    div.style.display = "none";

   

    div.style.backgroundImage = "url(https://1.bp.blogspot.com/-fL0dNzv_b4w/XNVzdNC8DsI/AAAAAAAAIVA/iw-Kd_clkakI7C_dpfHf0-o9WHN8v2m5gCLcBGAs/s1280/breadboard.png)";
    div.style.backgroundSize = "103% 104%"
    div.style.backgroundPosition = "center center";
    div.style.backgroundRepeat =  "no-repeat";
    
    for( let i = 1;i<4;i++){
        var btn = document.createElement("BUTTON");   // Create a <button> element
        
        btn.innerHTML = i;  
        btn.style.borderRadius = "50%";
        const radius = window.innerWidth/10;
        btn.style.width  = `${radius}px`;
        btn.style.height  = `${radius}px`;
        btn.style.position = "relative";
        btn.style.top = "15%";
        btn.style.left = `${10 + i*10}%`;
        btn.style.boxShadow = "0 9px #999" ;
        btn.style.cursor = "pointer";
        btn.style.outline =  "none";
        btn.classList = "arduinoBTN"

        let btColor;
        let fakeMsg;

        if(i == 1){
            fakeMsg = i.toString();
            btColor = "green";
        }else if(i == 2){
            fakeMsg = i.toString();
            btColor = "red";
        }else if(i ==3){
            fakeMsg = i.toString();
            btColor = "blue";
        }

        btn.style.backgroundColor = btColor

        btn.onclick = () => {
           
            processCommand(fakeMsg);
            printReceivedValue(fakeMsg);
        };   
        
        div.appendChild(btn);
    } 
    input.addEventListener('change', function() {
        if (this.checked) {
          fakeMode = true;
          div.style.display  = "block"
          
        } else {
         fakeMode = false;
         div.style.display  = "none"
        }
      });
    document.body.appendChild(div);
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
    console.log(lang);
    if(lang == "en"){
        speakMessage("This is a test message so you can here my voice");
    }else{
        speakMessage("Ceci est un message de test qui vous permet d'entendre ma voix");
    }
    
    console.warn(
    `Pour utiliser cette voix :
    ~ligne 8
    ChosenVoice = voices.${lang}.${index}`);
}

window.onload = function(){

    creatButton();
    creatSpeakingSpan();
    loadVoice();
  
}

