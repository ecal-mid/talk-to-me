// NeoPixel Ring simple sketch (c) 2013 Shae Erisson
// Released under the GPLv3 license to match the rest of the
// Adafruit NeoPixel library

#include <Adafruit_NeoPixel.h>

// Which pin on the Arduino is connected to the NeoPixels?
#define PIN        3 // On Trinket or Gemma, suggest changing this to 1

// How many NeoPixels are attached to the Arduino?
#define NUMPIXELS 1 // Popular NeoPixel ring size

// When setting up the NeoPixel library, we tell it how many pixels,
// and which pin to use to send signals. Note that for older NeoPixel
// strips you might need to change the third parameter -- see the
// strandtest example for more information on possible values.
Adafruit_NeoPixel pixels(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);

#define DELAYVAL 100 // Time (in milliseconds) to pause between pixels

int cmd = -1;

void setup() {
  Serial.begin(9600);
  delay(1000);
  Serial.setTimeout(10);
  Serial.println("Board available");
  
  pixels.begin(); // INITIALIZE NeoPixel strip object (REQUIRED)
  delay(500);
  pixels.clear();
  pixels.show();
}

void loop() {
  cmd = Serial.parseInt();
  if (cmd == 1) {
    pixels.clear(); // Set all pixel colors to 'off'
    pixels.setPixelColor(0, pixels.Color(100, 0, 0));
    pixels.show();
  } else if (cmd == 2) {
    pixels.clear(); // Set all pixel colors to 'off'
    pixels.setPixelColor(0, pixels.Color(0, 100, 0));
    pixels.show();
  } else if (cmd == 3) {
    pixels.clear(); // Set all pixel colors to 'off'
    pixels.setPixelColor(0, pixels.Color(0, 100, 150));
    pixels.show();
  }

 
    //delay(DELAYVAL); // Pause before next pass through loop
}
