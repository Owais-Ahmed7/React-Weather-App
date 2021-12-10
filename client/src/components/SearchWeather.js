import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import "../App.css";
import Styled from "styled-components";
import axios from "axios";
import { BeatLoader } from "react-spinners"

export default function SearchWeather() {

    const [ location, setLocation ] = useState({
      cityName: "",
      countryName: ""
    });
    const [ loading, setLoading ] = useState(true);
    const [ weather, setWeather ] = useState();
        
    async function getWeather() {
      await axios.get("http://localhost:5000/searchweather/currentweather")
        .then(data => {
        setWeather(data);
        setLoading(false);
        console.log("response data >>>", data);
        console.log("response from weather >>>", weather)
        })
        .catch(err => console.log("Error" + err))
        console.log(weather);
    }

    useEffect(() => {
      getWeather();
    }, [])

    console.log(location);

    function cityName(e) {
      setLocation(prevValue => {
        return {
          ...prevValue,
          cityName: e.target.value
        }
      });
    }

    function countryName(e) {
      setLocation(prevValue => {
        return {
          ...prevValue,
          countryName: e.target.value
        }
      });
    }

    function onSubmit(e) {
      //e.preventDefault();
      
      let currentLocation = {
        cityName: location.cityName,
        countryName: location.countryName
      }    
      console.log("currentLocation",currentLocation);

      if ((currentLocation.cityName).length < 3 && (currentLocation.countryName).length < 2) {
        console.log("Please Type Something Valid");
        e.preventDefault();
      } else {
        axios.post("http://localhost:5000/searchweather/", currentLocation)
        .then(response => {
          console.log("response of post methode", response);
        })
        .catch(err => console.log("Error" + err));
        console.log("set weather >>>", weather);
  
        setLocation({
          cityName: "",
          countryName: ""
        })  
      }

    }

    console.log("data after submit", weather);

    return <div className="container">

      <Container>


        <WeatherForm onSubmit={onSubmit} >
          <Row className="search-row">
            <Col className="button-col" lg="4" md="6" sm="12">
               <CountryInput onChange={countryName} value={location.countryName} name="countryName" placeholder="Country Name" />
            </Col>
            <Col className="button-col" lg="4" md="6" sm="12">             
               <CityInput onChange={cityName} value={location.cityName} name="cityName" placeholder="City Name"  />
            </Col>
            <Col className="button-col" lg="4" md="6" sm="12">  
                <SubmitButton type="submit" >Search Weather</SubmitButton>
            </Col>
          </Row>
        </WeatherForm>

 

        { loading? <LoaderBox>
          <BeatLoader loading={loading} size={50} color="orange" />
        </LoaderBox> : 
        <WeatherContainer>
          <WeatherContent>
            <CityName>{weather?.data.name}</CityName>
            <Break></Break> 
            <Desc> {weather?.data.weather[0].description} </Desc>
            <Break></Break>
            <Icon> {weather?<img src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`} /> : null } </Icon>
            <Break></Break>
            <Temp> Temprature &nbsp; {weather?.data.main.temp} </Temp>
            <Break></Break>
            <Humidity> Humidity &nbsp; {weather?.data.main.humidity} </Humidity>
            <Break></Break>
            <Visibility> Visibility &nbsp; {weather?.data.visibility} </Visibility>
          </WeatherContent>
        </WeatherContainer> }

      </Container>

    </div>
} 

const Container = Styled.div`
  text-align: center;
  align-items: center;
  margin-top: 50px; 
`;  

//weather form 

const WeatherForm = Styled.form`
    text-align: center;
    justify-content: center;
`;

const CountryInput = Styled.input`
    height: 2.8rem;
    width: 300px;
    text-align: center;

    @media(max-width: 360px) {
      width: 250px;
    }

    @media(max-width: 300px) {
      width: 200px;
    }
`;

const CityInput = Styled.input`
    height: 2.8rem;
    width: 300px;
    text-align: center;

    @media(max-width: 360px) {
      width: 250px;
    }

    @media(max-width: 300px) {
      width: 200px !important;
    }
`;

const SubmitButton = Styled.button`
    border: 2px solid dodgerblue;
    border-radius: 3px;
    padding: 0.5rem 2rem 0.5rem;
    opacity: 0.7;
    font-weight: 500 !important;
    background-color: #fff !important;
    transition-property: background-color;
    transition-duration: 5s;

    :hover {
        background: linear-gradient(160deg, #FFf 30%, #00FFFF 50%);
        opacity: 1;
        color: #000
        transition-duration: 5s;
    }

    @media(max-width: 270px) {
      width: 150px !important;
    }
`;

//weather report 

const LoaderBox = Styled.div`
    margin-top: 10rem;
`;

const WeatherContainer = Styled.div`
    transition-duration: 5s; 
`;

const WeatherContent = Styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    margin-top: 50px;
    flex-wrap: wrap;
`;

const Break = Styled.div`
    flex-basis: 100%;
`;

const CountryName = Styled.h1`
    flex-grow: 8;
    display: flex;
    align-content: center;
    justify-content: center;
    font-family: 'Alegreya', serif;
`;

const CityName = Styled.h2`
    flex-grow: 8;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    font-family: 'Literata', serif;
`;

const Desc = Styled.h4`
    flex-grow: 6;
    margin-top: 20px;
`;

const Icon = Styled.h4`
    flex-grow: 6;
`; 
const Temp = Styled.h4` font-family: 'Roboto', sans-serif;`
const Humidity = Styled.h4` font-family: 'Roboto', sans-serif; `;
const Visibility = Styled.h4` font-family: 'Roboto', sans-serif; `;


        {/* <Form>
          <Row style={{justifyContent: "center"}}>
            <Col lg="4" md="3" sm="6">
              <Form.Control onChange={countryName} value={location.countryName} name="countryName" placeholder="Country Name" />
            </Col>
            <Col lg="4" md="3" sm="6">
              <Form.Control onChange={cityName} value={location.cityName} name="cityName" placeholder="City Name" />
            </Col>
            <Col lg="2" md="3" sm="4">
              <Button className="ml-auto" type="submit" onSubmit={onSubmit} variant="warning">Search Weather</Button>
            </Col>
          </Row>
        </Form> */}

