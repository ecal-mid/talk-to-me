String cmd = "";
int button_pin = 5;

#define msg "b1"

void setup()
{
  Serial.begin(9600);
  delay(1000);
  Serial.setTimeout(500); // more timeout if long messages
  Serial.print("Board available");
  delay(500);
  Serial.print("press the button to test");

  pinMode(button_pin, INPUT_PULLUP);
}
void loop()
{

  //  cmd = Serial.readString();
  //  if (cmd != "") {
  //    Serial.print(cmd);
  //  }

  // button
  int buttonState = digitalRead(button_pin);
  if (buttonState == LOW)
  {
    Serial.print(msg);
    delay(2000); // wait for 2 sec
  }
}
