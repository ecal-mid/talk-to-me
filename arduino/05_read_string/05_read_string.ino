String cmd = "";
int button_pin = 5;
int press_counter = 0;
void setup() {
  Serial.begin(9600);
  delay(1000);
  Serial.setTimeout(500); // more timeout if long messages
  Serial.print("Board available");
  delay(500);
  Serial.print("press a button to test");

  pinMode(button_pin, INPUT_PULLUP);
}
void loop() {

  //  cmd = Serial.readString();
  //  if (cmd != "") {
  //    Serial.print(cmd);
  //  }

  // button
  int buttonState = digitalRead(button_pin);
  if (buttonState == LOW) {
    if (press_counter < 1) {
      Serial.print("you just pressed a button");
    } else {
      Serial.print("you pressed a button " + String(press_counter) + " times");
    }
    delay (2000); // wait for 2 sec
    press_counter++;
  }
}
