class App {
  constructor() {
    this.getLocation();
    this.lat;
    this.lng;
    this.arrivalcity;
    this.date;
    this.time;
    this.departurecity;
  }
  getLocation() {
    navigator.geolocation.getCurrentPosition(
      this.gotLocation.bind(this),
      this.errorLocation.bind(this)
    );
  }
  gotLocation(result) {
    this.lat = result.coords.latitude;
    this.lng = result.coords.longitude;
    this.getConcert();
  }
  getConcert() {
    let url =`https://app.ticketmaster.com/discovery/v2/events.json?latlong=${this.lat},${this.lng}&apikey=Zg1wlEt1st0tvjr6U8XvADgBR45m59Fh`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.querySelector("#title").innerHTML = "Ga naar: " + data._embedded.events[0]["name"] + " met de trein!";
        document.querySelector("#image").src = data._embedded.events[0]["images"][0]["url"];
        document.querySelector("#location").innerHTML = data._embedded.events[0]["_embedded"]["venues"][0]["name"];
        document.querySelector("#location2").innerHTML = data._embedded.events[0]["_embedded"]["venues"][0]["city"]["name"];
        document.querySelector("#date").innerHTML = data._embedded.events[0]["dates"]["start"]["localDate"];
        document.querySelector("#time").innerHTML = data._embedded.events[0]["dates"]["start"]["localTime"];

        this.date = data._embedded.events[0]["dates"]["start"]["localDate"];
        this.time = data._embedded.events[0]["dates"]["start"]["localTime"];
        this.arrivalcity = data._embedded.events[0]["_embedded"]["venues"][0]["city"]["name"];

        this.getCity();
      })
      .then((err) => {
      });
  }
  getCity(){
    let url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${this.lat}&longitude=${this.lng}&localityLanguage=nl`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.departurecity = data.locality;
        this.getTrain();
      })
      .then((err) => {
      });
  }
  getTrain() {
    let url =`https://api.irail.be/connections/?from=${this.departurecity}&to=${this.arrivalcity}&date=170321&time=${this.time}&timesel=departure&format=json&lang=en&typeOfTransport=automatic&alerts=false&results=6`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        document.querySelector("#departure").innerHTML =
          "Van: " + this.departurecity;
        document.querySelector("#arrival").innerHTML =
          "Naar: " + this.arrivalcity;
        if (data == "error") {
          document.querySelector("#title").innerHTML = "Helaas is er geen data over deze verbinding, om naar het onderstaande concert te gaan kijk je best op nmbs.be wat het dichtsbijzijnde station is.";
        } else {
          document.querySelector("#depplatform").innerHTML =
            "Spoor " + data.connection[0]["departure"]["platform"];
          document.querySelector("#arrplatform").innerHTML =
            "Spoor " + data.connection[0]["arrival"]["platform"];
        }
      })
      .then((err) => {
      });
  }
  errorLocation(err) {
    console.log(err);
  }
}

let app = new App();