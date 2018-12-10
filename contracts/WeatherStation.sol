pragma solidity ^0.4.22;

import "./WeatherStationData.sol";

/**
 * @title WeatherStation interaction interface.
 * @author Jordi Estape Canal
 * @notice Implementation of a interface for the weather station to interact with the blockchain.
*/

contract WeatherStation {

   WeatherStationData public data;     /* public address of the data storage contract */
   address public raspberry;     /* public direction of the raspberry */

   /**
      @notice     Constructor of the contract.
      @param      _data     public address of the data storage contract.
   */

   constructor (address _data) public {
       data = WeatherStationData(_data);
       data.setLogic();
   }

   /**
      @notice     Inserts data collected by a vinduino if the digital signature is correct.
      @param     _timestamp               Timestamp.
      @param     _rain                    Total of rain (in).
      @param     _wind_speed              Wind speed (MPH).
      @param     _wind_gust               Wind gust (MPH).
      @param     _wind_direction          Wind direction (Degrees).
      @param     _wind_direction_voltage  Wind direction (V).
      @param     _temperature             Temperature (C).
      @param     _pressure                Pressure (KPa).
      @param     _altitude                Altitude (m)
      @param     _sealevel_pressure       Sealevel Pressure (KPa).
      @param     _humidity                Humidity.
      @param     _hash                    Digital signature of the packed data.

    */

   function post(string _timestamp, uint16 _rain, uint16 _wind_speed, uint16 _wind_gust, uint16 _wind_direction, uint16 _wind_direction_voltage, uint16 _temperature, uint16 _pressure, uint16 _altitude, uint16 _sealevel_pressure, uint16 _humidity, bytes32 _hash) public returns (bool) {
      bytes32 key = data.getKey();
      if (sha256(abi.encodePacked(_timestamp, _rain, _wind_speed, _wind_gust, _wind_direction, _wind_direction_voltage, _temperature, _pressure, _altitude, _sealevel_pressure, _humidity, key)) != _hash) return false;
      data.addData(_timestamp, _rain, _wind_speed, _wind_gust, _wind_direction, _wind_direction_voltage, _temperature, _pressure, _altitude, _sealevel_pressure, _humidity);
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
