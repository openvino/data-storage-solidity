const WeatherStation = artifacts.require("WeatherStation");
const WeatherStationData = artifacts.require("WeatherStationData");
const Utils = artifacts.require("Utils");

contract('WeatherStationData', function(accounts) {

   global.authorized_raspberry = accounts[0];

   global.name = "WeatherStation Test"
   global.decimals = 2;
   global.private_key = "0xa6ae07ad556c5f9348cc09c16ed17a437e65acc71e689c1b19f872f1dab3c9c1"

   global.data_ws = [
      {timestamp: "18-3-2018 18:23:18", rain: 49.23, wind_speed: 32.43, wind_gust: 94.76, wind_direction: 92.43, wind_direction_voltage: 34.43, temperature: 83.23, pressure: 39.34, altitude: 21.33, sealevel_pressure: 84.73, humidity: 92.73},
      {timestamp: "19-3-2018 14:25:02", rain: 54.43, wind_speed: 65.12, wind_gust: 89.34, wind_direction: 54.32, wind_direction_voltage: 23.99, temperature: 39.65, pressure: 54.13, altitude: 76.12, sealevel_pressure: 62.18, humidity: 53.31},
      {timestamp: "20-3-2018 18:34:58", rain: 89.84, wind_speed: 34.66, wind_gust: 32.23, wind_direction: 23.75, wind_direction_voltage: 56.93, temperature: 74.31, pressure: 57.64, altitude: 84.59, sealevel_pressure: 16.92, humidity: 47.32},
      {timestamp: "21-3-2018 15:29:36", rain: 90.43, wind_speed: 12.76, wind_gust: 43.84, wind_direction: 51.34, wind_direction_voltage: 96.96, temperature: 94.82, pressure: 83.43, altitude: 92.32, sealevel_pressure: 43.34, humidity: 21.57},
   ];

   before(async function() {

      WeatherStation.deployed().then(function(instance) { return instance.setRaspberry(global.authorized_raspberry) });

      /* Normalize decimals and insert into WeatherStationData */
      for (let i = 0; i < 4; i++) {

         global.data_ws[i].raind *= 100;
         global.data_ws[i].wind_speed *= 100;
         global.data_ws[i].wind_gust *= 100;
         global.data_ws[i].wind_direction *= 100;
         global.data_ws[i].wind_direction_voltage *= 100;
         global.data_ws[i].wind_temperature *= 100;
         global.data_ws[i].wind_pressure *= 100;
         global.data_ws[i].wind_altitude *= 100;
         global.data_ws[i].wind_sealevel_pressure *= 100;
         global.data_ws[i].humidity *= 100;

         global.data_ws[i].hash = await Utils.deployed().then(function(instance) {
            return instance.calculate2_sha256.call(global.data_ws[i].timestamp, global.data_ws[i].rain, global.data_ws[i].wind_speed, global.data_ws[i].wind_gust, global.data_ws[i].wind_direction,
                                             global.data_ws[i].wind_direction_voltage, global.data_ws[i].temperature, global.data_ws[i].pressure, global.data_ws[i].altitude, global.data_ws[i].sealevel_pressure,
                                             global.data_ws[i].humidity, global.private_key);});

         WeatherStation.deployed().then(async function(instance) {
            return WeatherStation.deployed().then(function(instance) {
               return instance.post(global.data_ws[i].timestamp, global.data_ws[i].rain, global.data_ws[i].wind_speed, global.data_ws[i].wind_gust, global.data_ws[i].wind_direction,
                                    global.data_ws[i].wind_direction_voltage, global.data_ws[i].temperature, global.data_ws[i].pressure, global.data_ws[i].altitude, global.data_ws[i].sealevel_pressure,
                                    global.data_ws[i].humidity, global.data_ws[i].hash, {from: global.authorized_raspberry})
            })
         })

      }

   });

   it("Name established correctly.", function() {
      return WeatherStationData.deployed().then(async function(instance) {
         return await instance.name.call() == global.name
      })
   })

   it("Decimals established correctly.", function() {
      return WeatherStationData.deployed().then(async function(instance) {
         return await instance.decimals.call() == global.decimals
      })
   })

   it("Data can be consulted correctly. [0]", function() {
       return WeatherStationData.deployed().then(async function(instance) {
         var data = await instance.weatherstation_information.call(0)
         return data[0] == global.data[0].timestamp && data[1].toNumber() == global.data[0].rain && data[2].toNumber() == global.data[0].wind_speed &&
                data[3].toNumber() == global.data[0].wind_gust && data[4].toNumber() == global.data[0].wind_direction &&
                data[5].toNumber() == global.data[0].wind_direction_voltage && data[6].toNumber() == global.data[0].temperature &&
                data[7].toNumber() == global.data[0].pressure && data[8].toNumber() == global.data[0].altitude && data[9].toNumber() == global.data[0].sealevel_pressure
                data[10].toNumber() == global.data[0].humidity;
      })
   });

   it("Data can be consulted correctly. [1]", function() {
       return WeatherStationData.deployed().then(async function(instance) {
         var data = await instance.weatherstation_information.call(1)
         return data[0] == global.data[1].timestamp && data[1].toNumber() == global.data[1].rain && data[2].toNumber() == global.data[1].wind_speed &&
                data[3].toNumber() == global.data[1].wind_gust && data[4].toNumber() == global.data[1].wind_direction &&
                data[5].toNumber() == global.data[1].wind_direction_voltage && data[6].toNumber() == global.data[1].temperature &&
                data[7].toNumber() == global.data[1].pressure && data[8].toNumber() == global.data[1].altitude && data[9].toNumber() == global.data[1].sealevel_pressure
                data[10].toNumber() == global.data[1].humidity;
      })
   });

   it("Data can be consulted correctly. [2]", function() {
       return WeatherStationData.deployed().then(async function(instance) {
         var data = await instance.weatherstation_information.call(2)
         return data[0] == global.data[2].timestamp && data[1].toNumber() == global.data[2].rain && data[2].toNumber() == global.data[2].wind_speed &&
                data[3].toNumber() == global.data[2].wind_gust && data[4].toNumber() == global.data[2].wind_direction &&
                data[5].toNumber() == global.data[2].wind_direction_voltage && data[6].toNumber() == global.data[2].temperature &&
                data[7].toNumber() == global.data[2].pressure && data[8].toNumber() == global.data[2].altitude && data[9].toNumber() == global.data[2].sealevel_pressure
                data[10].toNumber() == global.data[2].humidity;
      })
   });

   it("Data can be consulted correctly. [3]", function() {
       return WeatherStationData.deployed().then(async function(instance) {
         var data = await instance.weatherstation_information.call(3)
         return data[0] == global.data[3].timestamp && data[1].toNumber() == global.data[3].rain && data[2].toNumber() == global.data[3].wind_speed &&
                data[3].toNumber() == global.data[3].wind_gust && data[4].toNumber() == global.data[3].wind_direction &&
                data[5].toNumber() == global.data[3].wind_direction_voltage && data[6].toNumber() == global.data[3].temperature &&
                data[7].toNumber() == global.data[3].pressure && data[8].toNumber() == global.data[3].altitude && data[9].toNumber() == global.data[3].sealevel_pressure
                data[10].toNumber() == global.data[3].humidity;
      })
   });

   it("Logic authorization can't be modified.", function () {
      return WeatherStationData.deployed().then(function(instance) {
         return !instance.setLogic(accounts[2], {from: accounts[2]})
      })
   })


});
