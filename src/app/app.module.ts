import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { AgmCoreModule } from 'angular2-google-maps/core';


@NgModule({
  declarations: [
    AppComponent,
    //WeatherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot(
      ({
      apiKey: "AIzaSyA9whJayh68bML0M82-J2OAD9U6Ag2z5DQ",
      libraries: ["places"]
    }))
  ],
  providers: [
    AppService
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
