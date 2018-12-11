pragma solidity ^0.4.22;

contract Utils {

   function calculate_sha256 (string _timestamp, uint16 _sensor2, uint16 _sensor1, uint16 _sensor05, uint16 _sensor005, uint8 _battery, uint16 _temperature, bytes32 _key) public returns(bytes32) {
       return sha256(abi.encodePacked(_timestamp, _sensor2, _sensor1, _sensor05, _sensor005, _battery, _temperature, _key));
   }

   function calculate2_sha256 (string _timestamp, uint16 _rain, uint16 _wind_speed, uint16 _wind_gust, uint16 _wind_direction, uint16 _pressure, uint16 _temperature, uint16 _humidity, bytes32 _key) public returns(bytes32) {
       return sha256(abi.encodePacked(_timestamp, _rain, _wind_speed, _wind_gust, _wind_direction, _pressure, _temperature, _humidity, _key));
   }

}
