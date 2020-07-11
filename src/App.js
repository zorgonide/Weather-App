import React, { Component ,setState } from 'react'
import './App.css';
import Weather from "./components/weather_component";
import "bootstrap/dist/css/bootstrap.min.css"
import "weather-icons/css/weather-icons.css"
import Form from "./components/form_component"

const apikey = "184080a27b2ff2aa447f712e151d8f52";

// const weatherURL = "http://api.openweathermap.org/data/2.5/forecast?zip=10302,us&units=imperial&APPID=184080a27b2ff2aa447f712e151d8f52"
export class App extends Component {
  constructor(){
    super();
    this.state ={
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: null,
      temp_min: null,
      description: "",
      error: false
    };
    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
    // this.componentDidMount()
    // this.getWeather();
  }
  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }
  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }
  getWeather = async(e) => {

    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;


    var apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${apikey}`;
    if (city && country) {
      const api_call = await fetch(apiCall);
      const response = await api_call.json();
      console.log(response)
      this.setState(
      {
        city: `${response.name}, ${response.sys.country}`,
        main: response.weather[0].main,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].main,
        error: false,
      })
  
      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);
    }
    else{
      this.setState({
        error:true
      })
    }
    
  }
  

  render() {
    return (
      <div className="App">
        <Form loadweather = {this.getWeather} error = {this.state.error}/>
        <Weather 
        city={this.state.city} 
        country={this.state.country}
        weatherIcon={this.state.icon}
        temp_celsius={this.state.celsius}
        temp_max={this.state.temp_max}
        temp_min={this.state.temp_min}
        description={this.state.description}/>
      </div>
    )
  }
}

export default App

// api.openweathermap.org/data/2.5/weather?q={city name}&appid=
