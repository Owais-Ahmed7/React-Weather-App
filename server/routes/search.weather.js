const express = require("express");
const router = express.Router();
const { get } = require("axios");

let cityName = "london";
let countryName = "uk";
router.route("/").post((req, res) => { 
    try {
        countryName = req.body.countryName;
        cityName = req.body.cityName;
        console.log(countryName,cityName);
    } catch(error) {
        console.log("error in post request items",error)
    }
    get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryName}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
    .then(response => {
        return response.data;
    })
       .then(data => {
           res.send(data);
       })
       .catch(err => {
        //    console.log("json data error ", err)
       })
    .catch(err => console.log("Error in post methode" + err)) 
})

router.route("/currentweather").get((req, res) => {
    console.log(cityName, countryName);
    get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryName}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
        .then(response => {
            return response.data;
        })
           .then(data => {
               res.setHeader("Access-Control-Allow-Origin", "*");
               res.send(data);
               console.log("get route request weather data",data);
           })
           .catch(err => {
               console.log("data json error in get route", err)
           })  
        .catch(err => console.log("Error in get methode" + err)) 
})

module.exports = router;

// router.route("/currentweather/:cityName").get((req, res) => {
//     const cityName = req.params.cityName
// })

// {
//     return {
//      cityName : response.data.name,
//      desc : response.data.weather[0].description,
//      icon: response.data.weather[0].icon,
//      temp: response.data.main.temp,
//      humidity: response.data.main.humidity,
//      visibility: response.Data.visibility,
//  }
// }
