pragma solidity ^0.4.22;

/**
 * @title Vinduino data storage contract.
 * @author Jordi Estape Canal
 * @notice Implementation of a datastorage for the vinduino to store data in the blockchain.
*/

contract VinduinoData {

    string public name;          /* vinduino identifier.                            */
    uint8 public decimals = 2;    /* number of decimals for the battery parameter.   */

    struct Data {

      string timestamp;
      uint16 sensor2;           /* 2m sensor.         */
      uint16 sensor1;           /* 1m sensor.         */
      uint16 sensor05;          /* 0.5 sensor.        */
      uint16 sensor005;         /* 0.05 sensor.       */
      uint8 battery;            /* battery voltage.   */
      uint16 temperature;       /* temperature.       */

   }

   address public logic;                 /* address of the contract has right to append data.   */
   bytes32 internal private_key;         /* private_key of the vinduino tied to this contract.  */

   Data[] public vinduino_information;   /* data storage array. */

   /**
      @notice     Constructor of the contract.
      @param      _private_key    private_key of the vinduino tied to this contract.
      @param      _name           vinduino identifier
   */
   constructor (bytes32 _private_key, string _name) public {
      private_key = _private_key;
      name = _name;
   }

   /**
      @notice     Getter of the key, only accessible by the logic contract (Vinduino.sol).
   */
   function getKey() view public onlyLogic() returns (bytes32) {
      return private_key;
   }

   /**
      @notice     Function to append data to the data storage (Vinduino.sol).
      @param     _sensor2        2m sensor.
      @param     _sensor1        1m sensor.
      @param     _sensor05       0.5m sensor.
      @param     _sensor005      0.05 sensor.
      @param     _battery        battery voltage.
      @param     _temperature    temperature.
   */
   function addData(string timestamp, uint16 _sensor2, uint16 _sensor1, uint16 _sensor05, uint16 _sensor005, uint8 _battery, uint16 _temperature) public onlyLogic() {
      vinduino_information.push(Data(timestamp, _sensor2, _sensor1, _sensor05, _sensor005, _battery, _temperature));
   }

   /**
      @notice     Getter of the number of information inserted.
      @returns    Number of rows inserted.
   */

   /**
      @notice    Sets the address of the logical contract.
   */
   function setLogic() public {
      require(logic == address(0) && msg.sender != address(0));
      logic = msg.sender;
   }

   /**
      @notice     Only the logic contract can interact.
   */
   modifier onlyLogic() {
      require(msg.sender == logic);
      _;
   }

}
