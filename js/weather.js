let weather = {
    "apiKey" : "f3452f3419bf4201264e6a0b261a605e",
    fetchWeather: function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
         + city 
         + "&units=metric&appid=" 
         + this.apiKey
        )
        .then((response)=> response.json())
        .then((data)=> {
            console.log(data);
            this.displayWeather(data)});
    },
    displayWeather: function(data){
        document.querySelector(".weather").classList.add("loading");
        const{ name } = data;
        const{ icon, description} = data.weather[0];
        const{ temp,humidity } = data.main;
        const{ speed } = data.wind;
        //console.log(name,icon,description,temp,humidity, speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        console.log(document.querySelector(".icon-img")); 
        document.querySelector(".icon-img").setAttribute("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");
      //  console.log("Icon URL: https://openweathermap.org/img/wn/" + icon + "@2x.png");
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity+ "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed+ "km/h";

        document.querySelector(".weather").classList.remove("loading");
        
        fetch("https://api.pexels.com/v1/search?query=" + name + "&per_page=10", {
            headers: {
                Authorization: "6ePiSgQclfHXOw1F3lm7REmX6jM9lzEVWZIBj46zMoL5IaAmso5ID88S"
            }
        })
        .then((response) => response.json())
        .then((data) => {
            const randomPhoto = data.photos[Math.floor(Math.random() * data.photos.length)];
            const imageUrl = randomPhoto.src.original;
            
            document.body.style.backgroundImage = "url('" + imageUrl + "')";
            document.body.style.backgroundSize = "cover"; 
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundAttachment = "fixed";
        });
    
    },
        
    search:function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search-btn").addEventListener("click", function() {
    weather.search();
});


document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        weather.search();
    }
});

weather.fetchWeather("Sleman");