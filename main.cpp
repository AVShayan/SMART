/* In this project, we design a basic version of home automation
    Recieve Signal from Node and turn on the LEDs */

#include <Arduino.h>
#include<ArduinoJson.h>  // To recieve JSON request from Node
// Assigning LED Pins
const int LED_BLUE = 10;
const int LED_WHITE = 5;
const int LED_GREEN = 7; 
const int LED_PURPLE = 11;
const int LED_ORANGE = 6;

void setup(){
  pinMode(LED_BLUE,OUTPUT);
  pinMode(LED_GREEN,OUTPUT);
  pinMode(LED_WHITE,OUTPUT);
  pinMode(LED_PURPLE,OUTPUT);
  pinMode(LED_ORANGE,OUTPUT);
  Serial.begin(9600); // BaudRate=9600
  Serial.println("Arduino is connected to COM12!");
}

void loop(){
  if(Serial.available() > 0){    
      String json = Serial.readStringUntil('\n');   
      // Create a JSON document to hold 200 bytes of data
      StaticJsonDocument<200> doc;
      // Parsing the JSON
      DeserializationError error = deserializeJson(doc,json);
      if(error){
        Serial.println("JSON Parsing Failed!");
        Serial.println(error.c_str());
        return;
     }
      String color = doc["color"];
      String command = doc["command"];
      Serial.println(color);
      Serial.println(command);
      if(color=="Blue" && command=="ON"){
        digitalWrite(LED_BLUE,HIGH);
        Serial.println("BLUE LED ON!");
      }
      else if(color=="Blue" && command=="OFF"){
        digitalWrite(LED_BLUE,LOW);
        Serial.println("BLUE LED OFF!");
      }
      else if(color=="White" && command=="ON"){
        digitalWrite(LED_WHITE,HIGH);
        Serial.println("WHITE LED ON!");
      }
      else if(color=="White" && command=="OFF"){
        digitalWrite(LED_WHITE,LOW);
        Serial.println("WHITE LED OFF");
      }
      else if(color=="Green" && command=="ON"){
        digitalWrite(LED_GREEN,HIGH);
        Serial.println("GREEN LED ON!");
      }
      else if(color=="Green" && command=="OFF"){
        digitalWrite(LED_GREEN,LOW);
        Serial.println("GREEN LED OFF!");
      }
      else if(color=="Purple" && command=="ON"){
        digitalWrite(LED_PURPLE,HIGH);
        Serial.println("PURPLE LIGHT ON!");
      }
      else if(color=="Purple" && command=="OFF"){
        digitalWrite(LED_PURPLE,LOW);
        Serial.println("PURPLE LIGHT OFF!");
      }
      else if(color=="Orange" && command=="ON"){
        digitalWrite(LED_ORANGE,HIGH);
        Serial.println("ORANGE LIGHT ON!");
      }
      else if(color=="Orange" && command=="OFF"){
        digitalWrite(LED_ORANGE,LOW);
        Serial.println("ORANGE LIGHT OFF!");
      }
  }
}   