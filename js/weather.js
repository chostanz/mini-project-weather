let weather = {
    "apiKey" : "f3452f3419bf4201264e6a0b261a605e",
    fetchWeather: function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
         + city 
         + "&units=metric&appid=" 
         + this.apiKey
        )
        .then((response)=> {
            if (!response.ok) {
                throw new Error("Gosh! City not found!");
            }
            return response.json();
            })
        .then((data)=> {
            if (!data.weather) {
                throw new Error("Gosh! City not found!");
            }
            console.log(data);
            this.displayWeather(data);
        })
        .catch((error) => {
            this.displayError(error.message);
        });
    },
    displayWeather: function(data){
        if (!data.weather) {
            this.displayError("Gosh! City not found!");
            return;
        }
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
            if (data.photos.length > 0){
            const randomPhoto = data.photos[Math.floor(Math.random() * data.photos.length)];
            const imageUrl = randomPhoto.src.original;
            
            document.body.style.backgroundImage = "url('" + imageUrl + "')";
            document.body.style.backgroundSize = "cover"; 
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundAttachment = "fixed";
            }else{
                document.body.style.background = "gray";
                    document.body.style.backgroundImage = "none";
                }
            })
            .catch(() => {
                document.body.style.background = "gray";
                document.body.style.backgroundImage = "none";
            });
    
    },

    displayError: function(message) {
        console.log("ERROR TRIGGERED:", message); 
        document.querySelector(".city").innerText = message;
        document.querySelector(".icon-img").setAttribute("src", "./assets/img/err-icon.png");
        document.querySelector(".description").innerText = "";
        document.querySelector(".temp").innerText = "";
        document.querySelector(".humidity").innerText = "";
        document.querySelector(".wind").innerText = "";

        document.querySelector(".weather").classList.remove("loading");

        document.body.style.backgroundImage = "url('./assets/img/vector-err.jpg')";
    
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