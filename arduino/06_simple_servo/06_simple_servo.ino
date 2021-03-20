#include <Servo.h>

Servo myservo;  // create servo object to control a servo
int val = 10;
int cmd = -1;
int last_cmd = -1;

void setup() {
  Serial.begin(9600);
  delay(1000);
  Serial.setTimeout(10);
  Serial.println("Board available");
  
  myservo.attach(9);  // attaches the servo on pin 9 to the servo object
}

void loop() {
  cmd = Serial.parseInt();
  if (last_cmd != cmd && cmd != 0) {
    last_cmd = cmd;
  }
  val = map(last_cmd, 1, 3, 2, 180);     // scale it to use it with the servo (value between 0 and 180)

  myservo.write(val);                  // sets the servo position according to the scaled value
  delay(15);                           // waits for the servo to get there
}
