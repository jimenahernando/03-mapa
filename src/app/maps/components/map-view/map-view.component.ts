import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Map, Marker, Popup } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef

  constructor(
    private placesService: PlacesService,
    private mapService: MapService
  ) {

  }

  ngAfterViewInit(): void {
    if(!this.placesService.userLocation) throw new Error('No hay placesService.userLocation');

    const map = new Map({
      container: this.mapDivElement.nativeElement, //donde quiero que renderice el mapa
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesService.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    const popup = new Popup()
    .setHTML(`
      <h6>Aqui estoy</h6>
      <span>Estoy en este luagar del mundo</span
    `);

    new Marker({ color: 'red'})
      .setLngLat(this.placesService.userLocation)
      .setPopup(popup) //enlazo con el popup
      .addTo(map) //coloco el marcador en el map

      this.mapService.setMap(map);
   };
}
