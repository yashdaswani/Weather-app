const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

setInterval(()=>{
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

let weather = {
    apiKey:"d993a46de8535adf52165efca74df241",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
              city +
              "&units=metric&appid=" +
              this.apiKey
          )
            .then((response) => {
              if (!response.ok) {
                alert("No weather found.");
                throw new Error("No weather found.");
              }
              return response.json();
            })
            .then((data) => this.displayWeather(data));
        },
        displayWeather: function (data) {
            const { name } = data;
            const { icon, description } = data.weather[0];
            const { temp, humidity} = data.main;
            const { speed } = data.wind;
            const { pressure } = data.main;
            const{sunrise}=data.sys;
            const{sunset}=data.sys;
            document.querySelector(".city").innerText = "Weather in " + name;
            document.querySelector(".icon").src =
              "https://openweathermap.org/img/wn/" + icon + ".png";
            document.querySelector(".description").innerText = description;
            document.querySelector(".temp").innerText = temp + "°C";
            document.querySelector(".humidity").innerText =
              "Humidity: " + humidity + "%";
            document.querySelector(".wind").innerText =
              "Wind speed: " + speed + " km/h";
              document.querySelector(".pressure").innerHTML="Pressure: "+pressure;
              var x = new Date(sunrise * 1000);
              var timestrx = x.toLocaleTimeString();
            document.querySelector(".sunrise").innerHTML= "Sunrise: " + timestrx;
            var y = new Date(sunset * 1000);
            var timestry = y.toLocaleTimeString();
            document.querySelector(".sunset").innerHTML= "Sunset: " + timestry;
            document.querySelector(".weather").classList.remove("loading");
            document.body.style.backgroundImage =
              "url('https://source.unsplash.com/1600x900/?" + description + "')";
          },
          search: function () {
            this.fetchWeather(document.querySelector(".search-bar").value);
          },
        };
        
        document.querySelector(".search button").addEventListener("click", function () {
          weather.search();
        });
        
        document
          .querySelector(".search-bar")
          .addEventListener("keyup", function (event) {
            if (event.key == "Enter") {
              weather.search();
            }
          });
        
        weather.fetchWeather("Haridwar");