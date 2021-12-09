import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Styled from "styled-components";
import { BeatLoader } from "react-spinners";
import "../App.css";
import axios from "axios";


export default function Home() {

    const [weatherData, setWeatherData] = useState();
    const [loading, setLoading] = useState(true);

    const getCoordinates = (options) => {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject,{enableHighAccuracy: true})
        })
    }

    const getWeather = async (latitude, longitude) => {
        // axios.post("http://localhost:5000/weatherstatus/", latitude,longitude)
        //    .then(() => console.log("Coordinates Send!"))
        //    .catch(err => console.log("Error" + err));    
        const api_call = await 
          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=ee3fad6d47e37433c3589c0eddedf354`)
        
        const data = await api_call;
        console.log("Data is ", data)  
        setWeatherData(data);
        setLoading(false);
    }

    useEffect(() => {
        getCoordinates()
          .then(position => {
            getWeather(position.coords.latitude, position.coords.longitude)
          })
          .catch(err => console.log("Error" + err));   
    },[])

    console.log(weatherData) 

    return <Container className="container">
        <Row>
            <Col lg="6" md="6" sm="12" className="col">
                <Content>
                    <Heading>Welcome to the Weather App</Heading>
                    <InfoPara className="head-para">From Weather App, You can see weather condition in your city. You can also custom search for weather</InfoPara>
                </Content>
            </Col>
  
            <Col lg="6" md="6" sm="12">
                {!loading? <WeatherContent>
                    <City>{weatherData?.data.name}</City>
                    <CityBreak></CityBreak>
                    <Desc>{weatherData?.data.weather[0].description}</Desc>
                    <Icon><img src={ `http://openweathermap.org/img/wn/${weatherData?.data.weather[0].icon}@2x.png`} ></img></Icon>
                    <CityBreak></CityBreak>
                    <Temp>Tempratue &nbsp; {weatherData?.data.main.temp}</Temp>
                    <CityBreak></CityBreak>
                    <Humidity>Humidity &nbsp; {weatherData?.data.main.humidity}</Humidity>
                    <CityBreak></CityBreak>
                    <Visibility>Visibility &nbsp; {weatherData?.data.visibility}</Visibility>
                </WeatherContent> : <LoaderBox>
                    <h1>Loading weather from your Location</h1> 
                    <BeatLoader loading={loading} size={50} color="orange" />
                </LoaderBox>}
            </Col>    
        </Row> 
    </Container>

}

const Container = Styled.div `
    text-align: center;
    display: Grid;
    height: 70vh;
    align-items: center;
`;

const Content = Styled.div``;

const Heading = Styled.h1`
    text-align: left;
    margin-bottom: 20px;
    font-family: 'PT Serif', serif;
    font-size: 3.5rem;
`;

const InfoPara = Styled.p`
    font-size: 1.3rem;
    font-family: 'Roboto', sans-serif;
    width: 100%;
`;

//Weather Condition

const WeatherContent = Styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    align-items: center;
    justify-content: center;
    width : 100%;
`;

const City = Styled.h2`
    flex-grow: 12;
    margin-top: 15px;
    font-family: 'Roboto', sans-serif
    font-size: 4rem;
    font-weight: 700;
`;

const CityBreak = Styled.div`
    flex-basis: 100%;
`;

const Desc = Styled.h2`
    flex-grow: 2;
    text-transform: capitalize;
    font-family: 'Roboto', sans-serif;
`;

const Icon = Styled.h2`
    flex-grow: 6;
`;

const Temp = Styled.h4` font-family: 'Roboto', sans-serif `;

const Humidity = Styled.h4` font-family: 'Roboto', sans-serif `;

const Visibility = Styled.h4` font-family: 'Roboto', sans-serif `;

const LoaderBox = Styled.div``;




