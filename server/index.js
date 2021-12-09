const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// importing route
const searchweatherRouter = require("./routes/search.weather.js");

require("dotenv").config();

const app = express();
const port = process.env.Port || 5000;


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors())

app.use("/searchweather", searchweatherRouter);


app.listen(5000, function() {
    console.log(`Server started on port ${port}`);
})