import { useState } from 'react';
import WeatherDisplay from './WeatherDisplay';
import './Weather.css';

function Weather() {

  const [zip, setZip ] = useState('');
  const [data, setData] = useState(null);
  const [ cordinates, setCordinates ] = useState({longitude:0,latitude:0});
  const [ option, setOption] = useState(true);



  async function getWeather(){
    try{
        const apikey = 'f2bcc407ea95e0bbd8ece48647a3eb8e';
        const path = option ? `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apikey}&units=imperial` :
        `https://api.openweathermap.org/data/2.5/weather?lat=${cordinates.latitude}&lon=${cordinates.longitude}&appid=${apikey}&units=imperial`;
        const res = await fetch(path)
        const json = await res.json()
        console.log(json);
        const temp = json.main.temp
        const desc = json.weather[0].description
        const name = json.name
        setData({temp,desc,name});
        setOption(!option);
    }
    catch(err){
        console.log(err.message);
    }
  }

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    var crd = pos.coords;
    setCordinates({
        latitude:crd.latitude,
        longitude:crd.longitude
    })
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  




  return (
    <div className="Weather">

        <div>
            {data ? <WeatherDisplay {...data} /> : null}
        </div>
      <form onSubmit={ e => {
          e.preventDefault()
          getWeather()
      }}>
        <input 
          type="text"
          placeholder="enter zip"
          value={zip}
          onChange={ e => setZip(e.target.value) }
        />
        <button className="button" type="submit">Submit</button>
        <button className="button" onClick={ () => 
            { setOption(false);
              navigator.geolocation.getCurrentPosition(success, error, options)}
        }>Get Location</button>
      </form>
    </div>
  );
}

export default Weather;
