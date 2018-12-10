const WeatherStation = artifacts.require("WeatherStation");
const Utils = artifacts.require("Utils");

contract('WeatherStation', function(accounts) {

   global.authorized_raspberry = accounts[0];
   global.unauthorized_raspberry = accounts[1];

   global.private_key = "0xa6ae07ad556c5f9348cc09c16ed17a437e65acc71e689c1b19f872f1dab3c9c1";

   global.data_ws = [
      {timestamp: "18-3-2018 18:23:18", rain: 49.23, wind_speed: 32.43, wind_gust: 94.76, wind_direction: 92.43, wind_direction_voltage: 34.43, temperature: 83.23, pressure: 39.34, altitude: 21.33, sealevel_pressure: 84.73, humidity: 92.73},
      {timestamp: "19-3-2018 14:25:02", rain: 54.43, wind_speed: 65.12, wind_gust: 89.34, wind_direction: 54.32, wind_direction_voltage: 23.99, temperature: 39.65, pressure: 54.13, altitude: 76.12, sealevel_pressure: 62.18, humidity: 53.31},
      {timestamp: "20-3-2018 18:34:58", rain: 89.84, wind_speed: 34.66, wind_gust: 32.23, wind_direction: 23.75, wind_direction_voltage: 56.93, temperature: 74.31, pressure: 57.64, altitude: 84.59, sealevel_pressure: 16.92, humidity: 47.32},
      {timestamp: "21-3-2018 15:29:36", rain: 90.43, wind_speed: 12.76, wind_gust: 43.84, wind_direction: 51.34, wind_direction_voltage: 96.96, temperature: 94.82, pressure: 83.43, altitude: 92.32, sealevel_pressure: 43.34, humidity: 21.57},
   ];

   before(async function() {

      WeatherStation.deployed().then(function(instance) {
         return instance.setRaspberry(global.authorized_raspberry)
      });

      /* Normalize decimals and calculate digital signature */
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
                                             global.data_ws[i].humidity, global.private_key);
         })
      }

   });

   it("data_ws can be inserted by the authorized raspberry using a correct digital signature.", function() {
      return WeatherStation.deployed().then(function(instance) {
         return instance.post(global.data_ws[0].timestamp, global.data_ws[0].rain, global.data_ws[0].wind_speed, global.data_ws[0].wind_gust, global.data_ws[0].wind_direction,
                              global.data_ws[0].wind_direction_voltage, global.data_ws[0].temperature, global.data_ws[0].pressure, global.data_ws[0].altitude, global.data_ws[0].sealevel_pressure,
                              global.data_ws[0].humidity, global.data_ws[0].hash, {from: global.authorized_raspberry})
         })
      })

   it("data_ws can't be inserted by the authorized raspberry using a wrong digital signature.", function() {
         return WeatherStation.deployed().then(function(instance) {
            return !instance.post(global.data_ws[1].timestamp, global.data_ws[1].rain, global.data_ws[1].wind_speed, global.data_ws[1].wind_gust, global.data_ws[1].wind_direction,
                                 global.data_ws[1].wind_direction_voltage, global.data_ws[1].temperature, global.data_ws[1].pressure, global.data_ws[1].altitude, global.data_ws[1].sealevel_pressure,
                                 global.data_ws[1].humidity, global.data_ws[0].hash, {from: global.authorized_raspberry})
         })
   })

   it("data_ws can't be inserted by the unauthorized raspberry using a correct digital signature.", function() {
      return WeatherStation.deployed().then(function(instance) {
         return !instance.post(global.data_ws[2].timestamp, global.data_ws[2].rain, global.data_ws[2].wind_speed, global.data_ws[2].wind_gust, global.data_ws[2].wind_direction,
                              global.data_ws[2].wind_direction_voltage, global.data_ws[2].temperature, global.data_ws[2].pressure, global.data_ws[2].altitude, global.data_ws[2].sealevel_pressure,
                              global.data_ws[2].humidity, global.data_ws[2].hash, {from: global.unauthorized_raspberry})
      })
   })

   it("data_ws can't be inserted by the unauthorized raspberry using a wrong digital signature.", function() {
      return WeatherStation.deployed().then(function(instance) {
         return instance.post(global.data_ws[3].timestamp, global.data_ws[3].rain, global.data_ws[3].wind_speed, global.data_ws[3].wind_gust, global.data_ws[3].wind_direction,
                              global.data_ws[3].wind_direction_voltage, global.data_ws[3].temperature, global.data_ws[3].pressure, global.data_ws[3].altitude, global.data_ws[3].sealevel_pressure,
                              global.data_ws[3].humidity, global.data_ws[0].hash, {from: global.unauthorized_raspberry})
      })
   })

   it("Raspberry authorization can't be modified.", function () {
      return WeatherStation.deployed().then(function(instance) {
         return !instance.setRaspberry(global.unauthorized_raspberry, {from: global.authorized_raspberry})
      })
   })



})
