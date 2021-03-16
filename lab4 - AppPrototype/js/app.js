class App {
  constructor() {
    this.getLocation();
    this.lat;
    this.lng;
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
    this.getTrain();
  }
  getConcert() {
    //https://app.ticketmaster.com/discovery/v2/events.json?apikey={apikey}
    let url =`https://app.ticketmaster.com/discovery/v2/events.json?latlong=${this.lat},${this.lng}&apikey=Zg1wlEt1st0tvjr6U8XvADgBR45m59Fh`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.querySelector("#title").innerHTML = data._embedded.events[0]["name"];
        document.querySelector("#image").src = data._embedded.events[0]["images"][0]["url"];
        document.querySelector("#location").innerHTML = data._embedded.events[0]["_embedded"]["venues"][0]["name"];
        document.querySelector("#location2").innerHTML = data._embedded.events[0]["_embedded"]["venues"][0]["city"]["name"];
        document.querySelector("#distance").innerHTML = data._embedded.events[0]["_embedded"]["venues"][0]["distance"];
        document.querySelector("#date").innerHTML = data._embedded.events[0]["dates"]["start"]["localDate"];
        document.querySelector("#time").innerHTML = data._embedded.events[0]["dates"]["start"]["localTime"];

        //let city = data._embedded.events[0]["_embedded"]["venues"][0]["city"]["name"];
      })
      .then((err) => {
        console.log(err);
      });
  }
  getTrain() {
    let url =`https://api.irail.be/connections/?from=Gent-Sint-Pieters&to=Mechelen&date=170321&time=1230&timesel=departure&format=json&lang=en&typeOfTransport=automatic&alerts=false&results=6`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .then((err) => {
        console.log(err);
      });
  }
  errorLocation(err) {
    console.log(err);
  }
}

let app = new App();
