import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ResultsPage } from '../pages/results/results';
import { RestaurantServiceProvider } from '../providers/restaurant-service/restaurant-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ResultsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ResultsPage
  ],
  providers: [
    StatusBar,
    Geolocation,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestaurantServiceProvider
  ]
})
export class AppModule {}
