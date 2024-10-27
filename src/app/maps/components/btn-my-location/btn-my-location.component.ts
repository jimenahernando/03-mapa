import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.css'
})
export class BtnMyLocationComponent {

  constructor(
    private mapService: MapService,
    private placesService: PlacesService
  ){}

  goToMyLocation(){
    //validaciones
    if(!this.placesService.userLocation) throw new Error('No ha ubicacion de usuario');
    if(!this.mapService.isMapREady) throw new Error('El mapa no esta disponible');
    
    //se dirige a las coordenadas que le envio
    this.mapService.flyTo(this.placesService.userLocation);
  }
}
