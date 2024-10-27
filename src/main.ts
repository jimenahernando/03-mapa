import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import mapboxgl from 'mapbox-gl'; 
mapboxgl.accessToken = 'pk.eyJ1IjoibWFnZGllbG1zIiwiYSI6ImNreXB6ZXJ1azBjeXEybnMyYm01bHk0aHAifQ.8iVI9ERFXi5ET09QbKJcww';

if(!navigator.geolocation) {
  alert('El navegador no soporta la geolocalizacion');
  throw new Error('El navegador no soporta la geolocalizacion');
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
