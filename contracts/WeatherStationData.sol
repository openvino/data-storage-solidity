pragma solidity ^0.4.22;

/**
 * @title WeatherStation data storage contract.
 * @author Jordi Estape Canal
 * @notice Implementation of a datastorage for the weather station to store data in the blockchain.
*/

contract WeatherStationData {

    string public name;          /*  weatherstation identifier.                      */
    uint8 public decimals = 2;    /* number of decimals for the battery parameter.   */

    struct Data {

      string timestamp;
      uint16 rain;
      uint16 wind_speed;
      uint16 wind_gust;
      uint16 wind_direction;
      uint16 pressure;
      uint16 temperature;
      uint16 humidity;

   }

   address public logic;                 /* address of the contract has right to append data.   */
   bytes32 internal private_key;         /* private_key of the vinduino tied to this contract.  */

   Data[] public weatherstation_information;   /* data storage array. */

   event DataInserted(uint position);

   /**
      @notice     Constructor of the contract.
      @param      _private_key    private_key of the vinduino tied to this contract.
      @param      _name           weatherstation identifier
   */
   constructor (bytes32 _private_key, string _name) public {
      private_key = _private_key;
      name = _name;
   }

   /**
      @notice     Getter of the key, only accessible by the logic contract (WeatherStation.sol).
   */
   function getKey() view public onlyLogic() returns (bytes32) {
      return private_key;
   }

   /**
      @notice     Function to append data to the data storage (WeatherStation.sol).
      @param     _timestamp               Timestamp.
      @param     _rain                    Total of rain (in).
      @param     _wind_speed              Wind speed (MPH).
      @param     _wind_gust               Wind gust (MPH).
      @param     _wind_direction          Wind direction (Degrees).
      @param     _pressure                Pressure (KPa).
      @param     _temperature             Temperature (C).
      @param     _humidity                Humidity.
   */
   function addData(string _timestamp, uint16 _rain, uint16 _wind_speed, uint16 _wind_gust, uint16 _wind_direction, uint16 _pressure, uint16 _temperature, uint16 _humidity) public onlyLogic() {
      weatherstation_information.push(Data(_timestamp, _rain, _wind_speed, _wind_gust, _wind_direction, _pressure, _temperature, _humidity));
      emit DataInserted(weatherstation_information.length - 1);
   }

   /**
      @notice     Getter of the number of information inserted.
      @return    Number of rows inserted.
   */
   function getNumberRegisters() view public returns(uint) {
      return weatherstation_information.length;
   }

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
