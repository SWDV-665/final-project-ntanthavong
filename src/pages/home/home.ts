import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ResultsPage } from '../results/results';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private geolocation: Geolocation) {}

  coords: string   
  maxPrice: string
  minRating: string
  distance: number

  ionViewDidLoad() {

    /* When the page loads, get the user's coordinates */
    this.geolocation.getCurrentPosition().then((res) => {
      let coordinates = res.coords.latitude + "," + res.coords.longitude
      document.getElementById("coords").innerHTML = coordinates;
      this.coords = coordinates
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  async findFood() {

    /* Proxy Google Places API Request through Heroku app */
    let placesNearbyURL = "https://tranquil-cove-24264.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyBieq2tBlEH0WLHElHwZKDuOo0RtylBDys&type=restaurant&radius=" + (this.distance * 1609.34) + "&opennow=true&maxprice=" + this.maxPrice + "&location=" + this.coords;
    console.log(placesNearbyURL)

    /* Perform API request and convert to JSON */
    let res = await fetch(placesNearbyURL);
    let JSONResponse = await res.json();
    let results: Array<Object> = await this.applyRatingParams(JSONResponse["results"]);

    if (results.length === 0) {
      this.showAlert();
      return;
    }

    /* Route user to Results Page passing in the results data */
    this.navCtrl.push(ResultsPage, {results:results});
  };

  async applyRatingParams(resultsArray) {
    
    /* Remove restaurants with a rating less than or equal to the minimum rating */
    for (let i = resultsArray.length - 1;i>=0;i--) {
      if (resultsArray[i]["rating"] <= this.minRating) {
        resultsArray.splice(i, 1);
      };
    };
    return resultsArray
  };

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'No Results Found!',
      subTitle: 'Try adjusting your parameters.',
      buttons: ['OK']
    });
    alert.present();
  };

}
