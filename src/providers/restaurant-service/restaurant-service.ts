import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestaurantServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestaurantServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RestaurantServiceProvider Provider');
  }

}
