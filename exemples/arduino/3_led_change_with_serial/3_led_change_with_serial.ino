#include <Adafruit_NeoPixel.h>

// Which pin on the Arduino is connected to the NeoPixels?
#define PIN        3 // Digital pin where the strip is attached

//How many NeoPixels are attached to the Arduino?
#define NUMPIXELS 3 // Number of leds

// When setting up the NeoPixel library, we tell it how many pixels,
// and which pin to use to send signals. Note that for older NeoPixel
// strips you might need to change the third parameter -- see the
// strandtest example for more information on possible values.
Adafruit_NeoPixel pixels(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);

int cmd = -1;
int last_cmd = -1;
byte led_intensity = 0;
byte led_intensity_increment;

void setup() {
  Serial.begin(9600);
  //delay(1000);
  Serial.setTimeout(10);
  //Serial.println("Board available");
  
  pixels.begin(); // INITIALIZE NeoPixel strip object (REQUIRED)
  delay(500);
  pixels.clear();
  pixels.show();
}

void loop() {
  cmd = Serial.parseInt();
  if (last_cmd != cmd && cmd != 0) {
    last_cmd = cmd;
  }
  if (led_intensity == 255) led_intensity_increment = -1;
  if (led_intensity == 0) led_intensity_increment = 1;
  led_intensity = (led_intensity + led_intensity_increment);

  if (last_cmd == 1) {
    pixels.clear(); // Set all pixel colors to 'off'
    pixels.setPixelColor(0, pixels.Color(led_intensity, 0, 0));
    pixels.setPixelColor(1, pixels.Color(led_intensity, 0, 0));
    pixels.show();
  } else if (last_cmd == 2) {
    pixels.clear(); // Set all pixel colors to 'off'
    for(int i = 0;i<NUMPIXELS; i++){
      pixels.setPixelColor(i, pixels.Color(0, led_intensity, 0));
    }
    
    pixels.show();
  } else if (last_cmd == 3) {
    pixels.clear(); // Set all pixel colors to 'off'
     for(int i = 0;i<NUMPIXELS; i++){
      //allume les leds pairs
      if(i % 2 == 0){
         pixels.setPixelColor(i, pixels.Color(0, led_intensity, 0));
        }
    }
    pixels.show();
  }
  else if (last_cmd == 4) {
    pixels.clear(); // Set all pixel colors to 'off'
     for(int i = 0;i<NUMPIXELS; i++){
      //allume les leds pairs
      if(i % 2 == 0){
         pixels.setPixelColor(i, pixels.Color(0, led_intensity, 0));
        }
      else{
        pixels.setPixelColor(i, pixels.Color(led_intensity, 0, 0));
        }
    }
    pixels.show();
  }


  //delay(DELAYVAL); // Pause before next pass through loop
}
