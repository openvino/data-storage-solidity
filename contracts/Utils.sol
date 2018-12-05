pragma solidity ^0.4.22;

contract Utils {

   function calculate_sha256 (uint16 _sensor2, uint16 _sensor1, uint16 _sensor05, uint16 _sensor005, uint8 _battery, uint16 _temperature, bytes32 _key) public returns(bytes32) {
       return sha256(abi.encodePacked(_sensor2, _sensor1, _sensor05, _sensor005, _battery, _temperature, _key));
   }

}
