const Vinduino = artifacts.require("Vinduino");
const VinduinoData = artifacts.require("VinduinoData");
const Utils = artifacts.require("Utils");

contract('VinduinoData', function(accounts) {

   global.authorized_raspberry = accounts[0];

   global.name = "Vinduino Test"
   global.decimals = 2;
   global.private_key = "0xa6ae07ad556c5f9348cc09c16ed17a437e65acc71e689c1b19f872f1dab3c9c1"


   global.data = [
      {timestamp: "20-3-2018 18:24:08", sensor2: 493, sensor1: 231, sensor05: 234, sensor005: 123, battery: 4.56, temperature: 27.21},
      {timestamp: "20-3-2018 12:44:08", sensor2: 341, sensor1: 567, sensor05: 546, sensor005: 349, battery: 5.11, temperature: 32.43},
      {timestamp: "20-3-2018 23:24:55", sensor2: 764, sensor1: 123, sensor05: 103, sensor005: 565, battery: 4.93, temperature: 17.15},
      {timestamp: "20-2-2018 15:34:32", sensor2: 443, sensor1: 732, sensor05: 654, sensor005: 343, battery: 3.21, temperature: 31.37},

   ];

   before(async function() {

      Vinduino.deployed().then(function(instance) { return instance.setRaspberry(global.authorized_raspberry) });

      /* Normalize decimals and insert into VinduinoData */
      for (let i = 0; i < 4; i++) {
         global.data[i].battery = global.data[i].battery * 100
         global.data[i].temperature = global.data[i].temperature * 100
         global.data[i].hash = await Utils.deployed().then(function(instance) {
                                                               return instance.calculate_sha256.call(global.data[i].timestamp,
                                                                                                       global.data[i].sensor2,
                                                                                                       global.data[i].sensor1,
                                                                                                       global.data[i].sensor05,
                                                                                                       global.data[i].sensor005,
                                                                                                       global.data[i].battery,
                                                                                                       global.data[i].temperature,
                                                                                                       global.private_key)})

         Vinduino.deployed().then(async function(instance) {
            return Vinduino.deployed().then(function(instance) {
               return instance.post(global.data[i].timestamp, global.data[i].sensor2, global.data[i].sensor1, global.data[i].sensor05,
                                    global.data[i].sensor005, global.data[i].battery, global.data[i].temperature,
                                    global.data[i].hash, {from: global.authorized_raspberry})
            })
         })

      }

   });

   it("Name established correctly.", function() {
      return VinduinoData.deployed().then(async function(instance) {
         return await instance.name.call() == global.name
      })
   })

   it("Decimals established correctly.", function() {
      return VinduinoData.deployed().then(async function(instance) {
         return await instance.decimals.call() == global.decimals
      })
   })

   it("Data can be consulted correctly. [0]", function() {
       return VinduinoData.deployed().then(async function(instance) {
         var data = await instance.vinduino_information.call(0)
         return data[0] == global.data[0].timestamp && data[1].toNumber() == global.data[0].sensor2 && data[2].toNumber() == global.data[0].sensor1 &&
                data[3].toNumber() == global.data[0].sensor05 && data[4].toNumber() == global.data[0].sensor005 &&
                data[5].toNumber() == global.data[0].battery && data[6].toNumber() == global.data[0].temperature
      })
   });

   it("Data can be consulted correctly. [1]", function() {
       return VinduinoData.deployed().then(async function(instance) {
         var data = await instance.vinduino_information.call(1)
         return data[0] == global.data[0].timestamp && data[1].toNumber() == global.data[1].sensor2 && data[2].toNumber() == global.data[1].sensor1 &&
                data[3].toNumber() == global.data[1].sensor05 && data[4].toNumber() == global.data[1].sensor005 &&
                data[5].toNumber() == global.data[1].battery && data[6].toNumber() == global.data[1].temperature
      })
   });

   it("Data can be consulted correctly. [2]", function() {
       return VinduinoData.deployed().then(async function(instance) {
         var data = await instance.vinduino_information.call(2)
         return data[0] == global.data[0].timestamp && data[1].toNumber() == global.data[2].sensor2 && data[2].toNumber() == global.data[2].sensor1 &&
                data[3].toNumber() == global.data[2].sensor05 && data[4].toNumber() == global.data[2].sensor005 &&
                data[5].toNumber() == global.data[2].battery && data[6].toNumber() == global.data[2].temperature
      })
   });

   it("Data can be consulted correctly. [3]", function() {
       return VinduinoData.deployed().then(async function(instance) {
         var data = await instance.vinduino_information.call(3)
         return data[0] == global.data[0].timestamp && data[1].toNumber() == global.data[3].sensor2 && data[2].toNumber() == global.data[3].sensor1 &&
                data[3].toNumber() == global.data[3].sensor05 && data[4].toNumber() == global.data[3].sensor005 &&
                data[5].toNumber() == global.data[3].battery && data[6].toNumber() == global.data[3].temperature
      })
   });

   it("Logic authorization can't be modified.", function () {
      return VinduinoData.deployed().then(function(instance) {
         return !instance.setLogic(accounts[2], {from: accounts[2]})
      })
   })


});
