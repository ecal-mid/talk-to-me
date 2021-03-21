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
    writeToStream(sendText.value)
     // print in the monitor
    printSentValue(sendText.value)
    //and clear the input field, so it's clear it has been sent
    sendText.value = "";

}

function clickSendPreset(btn) {
    val = document.getElementById("value_btn"+btn).value;
    //send the message
    writeToStream(val)
    // print in the monitor
    printSentValue(val)

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