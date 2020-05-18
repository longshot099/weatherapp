import React,{useEffect,useState, useRef} from 'react';
import './App.css';
// rain,clouds,clear,drizzle
//let api_url = `api.openweathermap.org/data/2.5/weather?q=san francisco &units=metric&APPID=${APP_KEY}`;
//http://api.timezonedb.com/v2.1/get-time-zone?key=${TIME_KEY}&format=json&by=position&lat=${lat}&lng=${lon}
//(0°C × 9/5) + 32 = °F 
//api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${your api key}
//d.getDay() = 1(monday)
//d.getDate() = 16
//d.getFullYear() = 2020

function App() {
  let [city,setCity] = useState('san francisco');
  const APP_KEY = 'f58a4594b8927905c1f5c09eded87ffb';
  var d = new Date();
  const TIME_KEY = 'I5TMI7O9T9UZ';
  var lon = '';
  var lat = '';
  var timeZone = '';
  var date = '';
  const months = ['January','February','March','April','May','June','July'
  ,'August','September','October','November','December'];

  const dayOfWeek = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

  const weatherDescRef = useRef();
  const tempRef = useRef();
  const inputRef = useRef();
  const cityNameRef = useRef();
  const timeRef = useRef();
  const weatherimg = useRef();

  useEffect(()=>{
    search();
  },[])

  function getDayOfWeek(date){ 
    // get Day of Week ex. Wednesday
    var dayDate = new Date(date).getDay();
    return isNaN(dayDate)? null :dayOfWeek[dayDate];
  }
  function getMonth(date){
    // get Month ex. January
    var month = new Date(date).getMonth();
    return isNaN(month)? null : months[month];
  }
  function getCalendarDate(date){
    // get the individual calendar date ex. 16
    var calendarDate = new Date(date).getDate();
    return isNaN(calendarDate)? null : calendarDate;
  }
  const search = ()=>{
    if(city == '') return;
    let api_url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${APP_KEY}`;
    fetch(api_url)
      .then(function(response){
        return response.json();
      })
      .then(function(data){
        if(data.message); // don't do anything if user types in invalid city

        else{
          lat = data.coord.lat;
          lon = data.coord.lon;
          let time_api_url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${TIME_KEY}&format=json&by=position&lat=${lat}&lng=${lon}`;

          fetch(time_api_url)
            .then(function(response){
             return response.json();
            })
            .then(function(data){
             
              var year = data.formatted.slice(0,4);
              date = data.formatted.slice(0,10);
              console.log(date);
              console.log(getCalendarDate(date));
              timeRef.current.innerHTML = `${getDayOfWeek(date)}, ${getMonth(date)} ${getCalendarDate(date) + 1}`; // calendardate returns a decrement of 1 so adding 1 will fix the problem
            })

          weatherDescRef.current.innerHTML = data.weather[0].main;
          const convertFah = (data.main.temp * (9/5)) + 32;
          tempRef.current.innerHTML = Math.round(convertFah) + '°F';
          cityNameRef.current.innerHTML = `${data.name}, ${data.sys.country}`;

          if(weatherDescRef.current.innerHTML== 'Rain')
                weatherimg.current.className = 'rain';

              else if(weatherDescRef.current.innerHTML == 'Clouds')
                weatherimg.current.className = 'clouds';
              
              else if(weatherDescRef.current.innerHTML == 'Clear')
                weatherimg.current.className = 'clear';
              
              else weatherimg.current.className = 'drizzle';
        }
      })
      
  }
  return (
    <div className="App">
      <div ref = {weatherimg} className = ''>
            <div id = 'info'>
              <div id= 'form'>
                <input onChange = {e => setCity(e.target.value)} ref = {inputRef}type = 'text' placeholder = 'Enter City Here...'/>
                <button id = 'searchBtn' onClick = {search}>Search</button>
              </div>

              <div id = "time">
                <h1 ref = {timeRef}></h1>
              </div>

              <h2 ref = {cityNameRef}></h2>

              <div className = 'weather'>
                <h3 ref = {weatherDescRef} id = 'weather-description'></h3>
                <h3 ref = {tempRef} id = 'temp'></h3>
              </div>
            </div>
      </div>
    </div> 
  );
}

export default App;
