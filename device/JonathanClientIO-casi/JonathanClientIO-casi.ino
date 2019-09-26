#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

#include <SocketIoClient.h>
#include <ArduinoJson.h>

#define USE_SERIAL Serial

ESP8266WiFiMulti WiFiMulti;
SocketIoClient webSocket;
int pin_salida = 2; 

const int analogInPin = A0;  // ESP8266 Analog Pin ADC0 = A0
int sensorValue = 0;  // value read from the pot

void turn_ledon(const char * payload, size_t length) {
  USE_SERIAL.printf("Encender Led: %s\n", payload);
  digitalWrite(pin_salida, HIGH);
}
void turn_ledoff(const char * payload, size_t length) {
  USE_SERIAL.printf("Apagar Led: %s\n", payload);
  digitalWrite(pin_salida, LOW);
}

//void event(const char * payload, size_t length) {
  //USE_SERIAL.printf("got message: %s\n", payload);
//}

void setup() {
    USE_SERIAL.begin(115200);

    USE_SERIAL.setDebugOutput(true);

    USE_SERIAL.println();
    USE_SERIAL.println();
    USE_SERIAL.println();

      for(uint8_t t = 4; t > 0; t--) {
          USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
          USE_SERIAL.flush();
          delay(1000);
      }

   //WiFiMulti.addAP("iPhone", "AVEMARIA91");
      WiFiMulti.addAP("FamiliaPardoLaverde", "AVEMARIA91");

    while(WiFiMulti.run() != WL_CONNECTED) {
        delay(100);
    }

   // webSocket.on("server:chat:message", event);
    //webSocket.begin("172.20.10.13", 3000);
   // webSocket.begin("192.168.0.5", 3000);
   webSocket.begin("https://mighty-fortress-13291.herokuapp.com/", 3000, "/socket.io/?transport=websocket");
    
    // use HTTP Basic Authorization this is optional remove if not needed
   // webSocket.setAuthorization("username", "password");

   pinMode(pin_salida, OUTPUT); 
}
unsigned long messageTimestamp = 0;
void loop() {
  
    webSocket.loop();
    String Json;
    uint64_t now = millis();
   

    if(now - messageTimestamp > 1000) {
        messageTimestamp = now;       
            
        //Lectura de datos
        webSocket.on("turn_ledoff", turn_ledoff);
        webSocket.on("turn_ledon", turn_ledon);      
       
        //read the analog in value
        sensorValue = analogRead(analogInPin);

        //Consutruccion JSON
        Json = "{\"Sensor\":\""+ String(sensorValue) +"\"}";

        //Envio data al servidor
        webSocket.emit("sensorar", Json.c_str());

        // map it to the range of the PWM out
        //outputValue = map(sensorValue, 0, 1024, 0, 255)

        USE_SERIAL.println(String(Json));

    }

}
