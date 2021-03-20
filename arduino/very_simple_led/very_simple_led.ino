int cmd = 1;

void setup() {
  Serial.begin(9600);
  delay(1000);
  Serial.setTimeout(10);
  pinMode(LED_BUILTIN, OUTPUT);
}
void loop() {
  
  cmd = Serial.parseInt();
  if(cmd == 1){
    Serial.println(cmd);
    digitalWrite(LED_BUILTIN, HIGH);   
  }else if (cmd == 2){
    Serial.println(cmd);
    digitalWrite(LED_BUILTIN, LOW);   
  }
}
