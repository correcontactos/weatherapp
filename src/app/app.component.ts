import { Component, ElementRef, NgZone } from '@angular/core';

import { AppService } from './app.service';
import { MapsAPILoader } from 'angular2-google-maps/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  ,
   styles: [`
    .sebm-google-map-container {
      height: 150px;
    }
  `]
})
export class AppComponent {
  private title = 'Bienvenid@ a WeatherApp';
  private url;
  private q;
  private appid;
  private updateq: Boolean;
  private buttontext: string;
  private temp: string;
  public msg: string[];
  public resultcities: string[];
  public historycities: string[];
  public info: any;
  public mapsAPILoader: MapsAPILoader;
  private ngZone: NgZone;
  public searchElementRef: ElementRef;
  public latitude: number;
  public longitude: number;
  public zoom: number;
  
  constructor(private appservice:AppService){
  }

  ngOnInit()
  {
    this.buttontext = 'Buscar';
    this.updateq = false;  
    this.url = '';
    this.appid = 'b52fa67323edf21a8bef4d8d828ca805';
    this.resultcities = []; 
    this.historycities = [];
    this.msg = [];
    this.q = '';
    this.url  = '';
    
  }

  searchCity(){
    this.url  = 'http://192.168.1.73/learning/angular/loadAjaxHouseaddsToSelect2.php';
    this.url = 'http://api.openweathermap.org/data/2.5/weather';
    this.url += '?q='+this.q;
    this.url += '&appid='+this.appid+'&units=metric&lang=es';
    
    this.resultcities = [];
    this.appservice.getCity(this.url).
    subscribe(
      info => {
        this.info = info;
        //if( this.info != '')
        //{
            if( Math.floor(this.info.main.temp) < 10 )
                this.temp = 'active';
            else if( Math.floor(this.info.main.temp) >= 10 && Math.floor(this.info.main.temp) < 20 )  
                this.temp = 'success';
            else if( Math.floor(this.info.main.temp) >= 20 && Math.floor(this.info.main.temp) < 30 )    
                this.temp = 'warning';                
            else if( Math.floor(this.info.main.temp) >= 30 )    
                this.temp = 'danger';

            this.latitude = this.info.coord.lat;
            this.longitude = this.info.coord.lon; 
            this.zoom = 9;   

            this.resultcities.push(this.info);
            this.historycities.push(this.info);
            this.msg.push('success','Consulta Finalizada'); 
            this.buttontext = 'Actualizar';    


            //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    /*this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
        });
      });
    });*/

        //}
      },
      error => {
          this.info = error.toString();
          if( this.info.indexOf('Response with status: 400 Bad Request') )    
              this.msg.push('danger','Dato incorrecto');
          if( this.info.indexOf('Response with status: 404 Not Found') )
              this.msg.push('warning','Ciudad no encontrada');                    
      }
    );
    this.updateq = true;
  }

 /* private loadScript() {
    let script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';

    if (document.body.contains(script)) {
      return;
    }
    document.getElementsByTagName('head')[0].appendChild(script);
  }*/

private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }

}