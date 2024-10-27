import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  //en el arraya van las coordenadas long y lat
  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor( private httpClient : HttpClient) { 
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = ([coords.longitude, coords.latitude]);
          resolve(this.userLocation);
        },
        (error) => {
          alert('No se pudo obtener la geolocalizacion');
          console.log(error);
          reject();
        }
      )
    });
  }

  getPlacesByQuery(query: string = '') {
    // todo: evaluar cuando el query es nulo

    this.isLoadingPlaces = true;

    this.httpClient.get<PlacesResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=es&limit=3&proximity=2.1445440374035343%2C41.41189955221725&language=es&access_token=pk.eyJ1IjoibWFnZGllbG1zIiwiYSI6ImNreXB6ZXJ1azBjeXEybnMyYm01bHk0aHAifQ.8iVI9ERFXi5ET09QbKJcww`)
    .subscribe(resp => {
      console.log(resp.features)
      this.places = resp.features;
      this.isLoadingPlaces = false;
    });

  }
}
