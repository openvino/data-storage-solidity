pragma solidity ^0.4.22;

import "./VinduinoData.sol";

/**
 * @title Vinduino interaction interface.
 * @author Jordi Estape Canal
 * @notice Implementation of a interface for the vinduino to interact with the blockchain.
*/

contract Vinduino {

   VinduinoData public data;     /* public address of the data storage contract */
   address public raspberry;     /* public direction of the raspberry */

   /**
      @notice     Constructor of the contract.
      @param      _data     public address of the data storage contract.
   */

   constructor (address _data) public {
       data = VinduinoData(_data);
       data.setLogic();
   }

   /**
      @notice     Inserts data collected by a vinduino if the digital signature is correct.
      @param     _sensor2        2m sensor.
      @param     _sensor1        1m sensor.
      @param     _sensor05       0.5m sensor.
      @param     _sensor005      0.05 sensor.
      @param     _battery        battery voltage.
      @param     _temperature    temperature.
    */

   function post(uint16 _sensor2, uint16 _sensor1, uint16 _sensor05, uint16 _sensor005, uint8 _battery, uint16 _temperature, bytes32 _hash) public returns (bool) {
      bytes32 key = data.getKey();
      if (sha256(abi.encodePacked(_sensor2, _sensor1, _sensor05, _sensor005, _battery, _temperature, key)) != _hash) return false;
      data.addData(_sensor2, _sensor1, _sensor05, _sensor005, _battery, _temperature);
      return true;
   }

   /**
      @notice    Sets the public direction of the raspberry.
      @param     _raspberry    public address of the raspberry that will interact.
   */

   function setRaspberry(address _raspberry) public returns (bool) {
       if (raspberry == address(0) && _raspberry != address(0)) { raspberry = msg.sender; return true; }
       else return false;
   }

   /**
      @notice     Only the raspberry can interact.
   */

   modifier onlyRaspberry() {
       require(msg.sender == raspberry);
       _;
   }

}
