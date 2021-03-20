String cmd = "";

void setup() {
  Serial.begin(9600);
  delay(1000);
  Serial.setTimeout(500);
  pinMode(LED_BUILTIN, OUTPUT);
}
void loop() {

  cmd = Serial.readString();
  if (cmd != "") {
    Serial.println(cmd);
  }
  
  if (cmd == 1) {
    Serial.println(cmd);
    digitalWrite(LED_BUILTIN, HIGH);
  } else if (cmd == 2) {
    Serial.println(cmd);
    digitalWrite(LED_BUILTIN, LOW);
  }
}
