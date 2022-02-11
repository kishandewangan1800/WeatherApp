const time = document.querySelector(".time");
const container = document.querySelector(".container");

window.addEventListener("load",()=>{
    setInterval(showTime,1000);
    getLocation();

    const getTime = new Date();
    var hour =getTime.getHours();

    if(hour>6 && hour<=10){
        container.style.backgroundImage = "url('image/morning.jpg')"
    }else if(hour>10 && hour<=17){
        container.style.backgroundImage = "url('image/day.jpg')"
    } else if(hour>17 && hour<=20){
        container.style.backgroundImage = "url('image/evening.jpg')"
    }else{
        container.style.backgroundImage = "url('image/night.jpg')"
    }
})

function showTime(){
    const getTime = new Date();
    var hour =getTime.getHours();
    var minut = getTime.getMinutes();
    var secound = getTime.getSeconds();
    
    var mm = minut.toString().padStart(2,"0");
    var ss = secound.toString().padStart(2,"0");

    if(hour===0){
        time.innerHTML = `${12}:${mm}:${ss} AM`
    }else if(hour<12){
        hh = hour.toString().padStart(2,"0");
        time.innerHTML = `${hh}:${mm}:${ss} AM`
    }else if(hour==12){
        hh = hour.toString().padStart(2,"0");
        time.innerHTML = `${hh}:${mm}:${ss} PM`
    }
    else if(hour>12){
        hh = hour-12;
        hh = hh.toString().padStart(2,"0");
        time.innerHTML = `${hh}:${mm}:${ss} PM`
    }
}

const input = document.getElementById("input");
const search = document.getElementById("search")

input.addEventListener("keydown",(e)=>{
    if(e.keyCode===13){
        search.click();
    }
})

search.addEventListener("click",()=>{
    const city = input.value
    if(city===""){
        alert("Enter City Name")
    }else{
    weather.fetchWeather(city.toLowerCase());
    }
    input.value ="";

})



let weather = {
    apiKeys : "ee95c39a398faf4b12dd40bacbb39323",
    fetchWeatherLatLong: function(lat, lon){
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ee95c39a398faf4b12dd40bacbb39323`
        try{
            fetch(url)
            .then((response)=>response.json())
            .then((data)=>this.displayWeather(data));
            }catch{
                window.alert("Weather Report is not available for"+city)
            }
    },

    fetchWeather: function(city){
        const url = "https://api.openweathermap.org/data/2.5/weather?q="
        +city
        +"&524901&lang=fr&appid=ee95c39a398faf4b12dd40bacbb39323"
        try{
        fetch(url)
        .then((response)=>response.json())
        .then((data)=>this.displayWeather(data));
        }catch{
            window.alert("Weather Report is not available for"+city)
        }
    },
    displayWeather : function (data){
        if(data.message){
            window.alert(data.message)
        }else{
            const { name, timezone } = data;
        var {icon, main} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        const {country} = data.sys
        // console.log(name, icon, description, humidity, temp,speed);
        document.querySelector(".place").innerHTML = name +", "+ country;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+icon +".png";
        document.querySelector(".temperature").innerHTML = (temp-273.15).toFixed(2)+ "°C";
        document.querySelector(".type").innerHTML = main;
        document.querySelector(".humidity").innerHTML = "Humidity : "+humidity+"%";
        document.querySelector(".speed").innerHTML = "Wind Speed : "+speed+" km/h";
        // document.querySelector("time-zone").innerHTML = `${timezone/3600}`

        const now = new Date();
        // const gmt = 5*3600+60*30;
        const mm = now.getHours()*3600 + now.getMinutes()*60 + now.getSeconds();
        const hrs = now.getHours()-5+Number(Math.floor(timezone/3600));
        const min = now.getMinutes()-30 + Number(Math.floor(timezone%3600)/60)
        let hours = Math.floor((hrs*60+min)/60);
        if(hours<0){
            hours= hours+24;
        }
        hours=hours.toString().padStart(2,"0");

        let minutes = ((hrs*60+min)%60);
        if(minutes<0){
            minutes = minutes+60;
        }
        minutes = minutes.toString().padStart(2,"0");
        document.querySelector(".time-zone").innerHTML = `Time - ${hours}:${minutes}`
        }
        
    }
}

var x = document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
 const lat = position.coords.latitude;
 const lon = position.coords.longitude;
 weather.fetchWeatherLatLong(lat,lon);
}
