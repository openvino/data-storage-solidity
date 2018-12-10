var VinduinoData = artifacts.require("./VinduinoData.sol");
var Vinduino = artifacts.require("./Vinduino.sol");
var WeatherStationData = artifacts.require("./WeatherStationData.sol");
var WeatherStation = artifacts.require("./WeatherStation.sol");
var Utils = artifacts.require("./Utils.sol");

module.exports = function(deployer) {

  deployer.deploy(VinduinoData, "0xa6ae07ad556c5f9348cc09c16ed17a437e65acc71e689c1b19f872f1dab3c9c1", "Vinduino Test")
  .then(() => VinduinoData.deployed())
  .then(_instance => deployer.deploy(Vinduino, _instance.address));

  deployer.deploy(WeatherStationData, "0xa6ae07ad556c5f9348cc09c16ed17a437e65acc71e689c1b19f872f1dab3c9c1", "WeatherStation Test")
  .then(() =>  WeatherStationData.deployed())
  .then(_instance => deployer.deploy(WeatherStation, _instance.address));

  deployer.deploy(Utils);

};
