


//Creatting object to store functions and variable neccesary for the api

let weather = {
    apiKey: "d1aa4b3c36d9a96941817f4dc73b97bf",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=imperial&appid="
            + this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data))
            .then((data) => console.log(data));


    },

    displayWeather: function (data) {

        //this will extract teh data from the json object
        const { name } = data;
        const { icon, description } = data.weather[0];  // the reason for [0] is because is an array in the json 
        const { temp, humidity } = data.main;
        const { speed } = data.wind

        console.log(name, icon, description, temp, humidity, speed)

        //Now lets display it in the page
        //Since we are using classes and not ids we need to use . to call the classes
        document.querySelector(".city").innerHTML = "Weather in " + name;
        document.querySelector(".temp").innerHTML = temp + "° F";
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerHTML = "Wind speed: " + speed + " mph"
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + ".png"; // we can make the icon bigger by adding: @2x.png

        document.querySelector(".weather").classList.remove("loading");

        //to change to a city of base on name of city
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"

    },

    //get the content of the search bar
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value)

    },


};

//function of the click on the search bar
document.querySelector(".search button").addEventListener("click", function () {

    weather.search();

});
document.querySelector(".search-bar").addEventListener("keyup", event => {
    if (event.key == "Enter") {
        return weather.search();
    }
})
// alternative way to function for the enter key inteh search bar 

/*
var inputEnter = document.querySelector(".search-bar")

inputEnter.addEventListener("keyup", InputKey)
   
function InputKey(e){

    if(e.key=="Enter"){ 
        weather.search(); 
    }

}
*/
///////////////////////////getting geolocation


window.navigator.geolocation
    .getCurrentPosition(console.log, console.log);


function myfunction() {
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        // Show a map centered at latitude / longitude

        console.log("Yesss")
        let Ciudad = {
            apiKey2: "d1aa4b3c36d9a96941817f4dc73b97bf",
            fetchCoordinates: function (latitude,longitude) {
                fetch(
                    "https://api.openweathermap.org/data/2.5/weather?"
                    + "lat=" + latitude
                    + "&lon=" + longitude
                    + "&units=imperial&appid="
                    + this.apiKey2
                )
                    .then((response) => {
                        if (!response.ok) {
                            alert("Couldn't find Coordinates.");
                            throw new Error("Couldn't find Coordinates.");
                        }
                        return response.json();
                    })
                    .then((data2) => this.displayCoordinates(data2))
                  //  .then((data2) => console.log(data2));
        

                  

            },

            displayCoordinates: function (data2) {

                var name2 = data2.name;
                console.log("suppp")
                console.log(name2)
                console.log(data2.name)
                
                console.log("soppp")
                
                weather.fetchWeather(data2.name);
             

            }
           

        };

        Ciudad.fetchCoordinates(latitude,longitude)

    });
}
////////////////////////// getting city base on geolocation

//weather.fetchWeather("Denver");


myfunction()

