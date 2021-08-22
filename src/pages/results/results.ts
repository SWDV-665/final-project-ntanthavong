import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

/**
 * Generated class for the ResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-results',
  templateUrl: 'results.html'
})

export class ResultsPage {

  @ViewChild(Slides) slides: Slides;

  results: Array<any>

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.results = navParams.get('results');
    console.log(this.results)
  }

  ionViewDidLoad() {
    this.loadPhoto();
  }

  loadPhoto() {

    /* Get the index of the current slide so we can grab the right data */
    let index = this.slides.getActiveIndex();
    /* Loads the very first image */
    if (index === undefined){
      index = 0;
    }
    let reference: Object = this.results[index].photos[0].photo_reference;
    let placeID = this.results[index].place_id;

    /* Make a request to the Google Place Photos Api. An Image is returned */
    let photoURL = "https://maps.googleapis.com/maps/api/place/photo?photo_reference="+ reference +"&maxwidth=400&maxheight=400&key=AIzaSyBieq2tBlEH0WLHElHwZKDuOo0RtylBDys";
    (<HTMLImageElement>document.getElementById(placeID)).src = photoURL;
  }
}
