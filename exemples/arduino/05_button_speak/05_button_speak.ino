int button_pin = 5;
#define msg "b1"

boolean readyToPush = true;

void setup()
{
  Serial.begin(9600);
  delay(1000);
  Serial.setTimeout(10); // more timeout if long messages
  Serial.print("Board available");
  Serial.print("press the button to test");

  pinMode(button_pin, INPUT_PULLUP);
}
void loop()
{
  int buttonState = digitalRead(button_pin);
  if (buttonState == LOW && readyToPush)
  {
    Serial.print(msg);
    readyToPush = false;
  }
  else if (buttonState == HIGH)
  {
    readyToPush = true;
  }
}
