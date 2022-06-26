 /*
      api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
      */
     // api key ="8e8630e599aee5a9f425daa67fda27cd"
     /*
     https://api.openweathermap.org/data/2.5/weather?q=delhi&units=metric&appid=8e8630e599aee5a9f425daa67fda27cd
     */



     const api = {
          key: "8e8630e599aee5a9f425daa67fda27cd",
          base: "https://api.openweathermap.org/data/2.5/"
        }
        
        const searchbox = document.querySelector('.search-box');
        searchbox.addEventListener('keypress', setQuery);
        
        function setQuery(evt) {
          if (evt.keyCode == 13) {
            getResults(searchbox.value);
          }
        }
        
        function getResults (query) {
          fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(weather => {
              return weather.json();
            }).then(displayResults);
        }
        
        function displayResults (weather) {
          let city = document.querySelector('.location .city');
          city.innerText = `${weather.name}, ${weather.sys.country}`;

          let now = new Date();
          let date = document.querySelector('.location .date');
          date.innerText = dateBuilder(now);
        
          let temp = document.querySelector('.current .temp');
          temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
          
          let feels_like= document.querySelector('.current .feels');
          feels_like.innerHTML = 'Feels like'+' '+`${Math.round(weather.main.feels_like)}<span>°c</span>`;

          let weather_el = document.querySelector('.current .weather');
          weather_el.innerText = weather.weather[0].main;
        
          document.body.style.backgroundImage="url('https://source.unsplash.com/1920x1280/?"+weather.weather[0].main+ "')";

          let hilow = document.querySelector('.hi-low');
          hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

        }
        
        function dateBuilder (d) {
          let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        
          let day = days[d.getDay()];
          let date = d.getDate();
          let month = months[d.getMonth()];
          let year = d.getFullYear();
        
          return `${day} ${date} ${month} ${year}`;
        }