import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApiClient } from '../api/PlacesApiClient';

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

  constructor( private placesApiClient : PlacesApiClient) { 
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

    if(!this.userLocation) throw Error('No hay user location');

    this.isLoadingPlaces = true;

    // this.httpClient.get<PlacesResponse>(`${query}.json?country=es&limit=3&proximity=2.1445440374035343%2C41.41189955221725&language=es&access_token=pk.eyJ1IjoibWFnZGllbG1zIiwiYSI6ImNreXB6ZXJ1azBjeXEybnMyYm01bHk0aHAifQ.8iVI9ERFXi5ET09QbKJcww`)
    // .subscribe(resp => {
    //   console.log(resp.features)
    //   this.places = resp.features;
    //   this.isLoadingPlaces = false;
    // });

    this.placesApiClient.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: this.userLocation.join(',')
      }
    })
    .subscribe(resp => {
        console.log(resp.features)
        this.places = resp.features;
        this.isLoadingPlaces = false;
      });
  }
}
