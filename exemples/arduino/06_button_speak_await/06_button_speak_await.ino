String cmd = "";
int button_pin = 5;
int state = 1;
#define msg "bt1"
/*
   States
   1. wait for user input
   2. wait for the voice to finish
*/
void setup()
{
  Serial.begin(9600);
  delay(1000);
  Serial.setTimeout(10); // more timeout if long messages
  Serial.print("Board available");
  delay(500);
  Serial.print("press the button to test");
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, LOW); // turn LED off

  pinMode(button_pin, INPUT_PULLUP);
}
void loop()
{
  // STATE 1. wait for user input
  if (state == 1)
  {
    digitalWrite(LED_BUILTIN, LOW);
    int buttonState = digitalRead(button_pin);
    // button
    if (buttonState == LOW)
    {
      Serial.print(msg);
      state = 2;
    }
  }
  // STATE 2. wait for the voice to finish
  if (state == 2)
  {
    cmd = Serial.readString();
    if (cmd == "10")
    {
      //Serial.print(cmd);
      state = 1;
    }
    digitalWrite(LED_BUILTIN, HIGH);
  }
}
