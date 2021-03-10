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
    this.getPokémon();
  }
  getPokémon() {
    //https://app.ticketmaster.com/discovery/v2/events.json?apikey={apikey}
    let url =`https://app.ticketmaster.com/discovery/v2/events.json?latlong=${this.lat},${this.lng}&apikey=Zg1wlEt1st0tvjr6U8XvADgBR45m59Fh`;
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
