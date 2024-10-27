# Mapas

## Bootstrap
Entrar al sitio oficial de bootstap y tomar el link para poder utilizarlo en nuestro proyecto 
https://getbootstrap.com/docs/5.3/getting-started/introduction/

En el archivo index.html debajo de la etiqueta <link> que viene por defecto agregar:
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

Trabajamos de manera modulo

1. Crearemos un modulo para trabajar cada parte
Para crear Escribir en la terminal: `ng g m maps`
Esto creará una carpeta /maps y dentro el modulo maps.module.ts

Los modulos tienen que ser agregados en el modulo general -> **app.module.ts**

Creamos las carpetas
- api
- components
- interfaces
- screens
- services

2. Creamos el componente que va a ser la pantalla donde estará el mapa
Para crear un component sin los tests:
`ng g c maps/screens/mapScreen --skip-tests`
Crea el componente y actualiza el modulo asociado

3. Validar si el navegador puede acceder a la geolocalizacion del dispositivo
- En **main.ts hacer la validacion**

4. Creo el servicio que manejará la geolozalizacion nuestra
`ng g s maps/services/places --skip-tests`

5. Dentro de **/services** creo un archivo **index.ts** para importar todos los servicios que tengo
`export { PlacesService } from './places.service';`

6. En PlacesService
Mapbox no trabaja con promesas ni con observables.
Creo una, escribo la funcion para obtenerla

7. Inyecto el servicio en el component mapScreen

8. Agregar la extension de Angular DevTools en Chorme
Abrir Modo desarrolador(F12)
- en la solapa **Angular** puedes ver los componentes y navegar por dentro

Otra opcion util es **Sensors**, te permite ver la ubicacion

Obtener la geolocalizacion no es un proceso sincrono, no es intantaneo y tenemos que esparar. Vamos a ponerle un loading

9. Creo componentes:
- mapView: `ng g c maps/components/mapView --skip-tests` -> que muestre mapa
- mapView: `ng g c maps/components/loading --skip-tests` -> que muestre el loading

- Creo el loading y le doy estilos
- En mapScreen agrego ambos componentes y pongo una validacion para que muestre el loading si no esta lista la geolocalizacion del usuario y sino que muestre el mapa

10. Abrimos la pagina oficial de Mapbox.com
Creamos una cuenta
Creamos un nuevo token, asegurandonos que esten tildadas estas 5 opciones:
* STYLES: TILES
* STYLES: READ
* FONTS: READ
* DATASET:READ
* VISION: READ

https://docs.mapbox.com/mapbox-gl-js/guides/install/

Entrar a la Documentacion -> Mapbog GL Js -> installation -> Module bundler

- Instalamos `npm install --save mapbox-gl`
- Instalamos el CSS mediante el <link>:
<link href='https://api.mapbox.com/mapbox-gl-js/v3.7.0/mapbox-gl.css' rel='stylesheet' />

- Agregar estas 2 lineas de codigo con el token en el **main.ts** para que lo instale de manera general.
```TS
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
```

Si te marca como error el mapboxgl hacer una instalacion:
`npm i --save-dev @types/mapbox-gl`
Reiniciar el servidor

Si sigue tirando error:
En el archivo **tsconfig.json** 
Agregar la propiedad: `"allowSyntheticDefaultImports":true`

11. Agrego estructura y estilos al **mapView**

12. En el **MapViewComponent**:
- en el html coloco un div con una referencia para que pueda ser visto desde el ts
`<div #mapDiv class="map-container">`
- ts:
- Coloco esto para ver el div
```TS
@ViewChild('mapDiv')
mapDivElement!: ElementRef
```
- coloco el mapa en el ngAfterViewInit()

13. Coloco una API-KEY prestada del curso:
**pk.eyJ1IjoibWFnZGllbG1zIiwiYSI6ImNreXB6ZXJ1azBjeXEybnMyYm01bHk0aHAifQ.8iVI9ERFXi5ET09QbKJcww**

14. Importo 2 clases Mark y PopUp
Creo el popup
Creo el marcardor:
    - le doy las coordenadas
    - Lo enlazo con el popup
    - lo enlazo con el mapa

15. Creo dos componentes: 
- un componente **btnMyLocation**, que cuando le hagas clic te lleve a la instanciaslocalizacion
Creo el html y CSS

- un componente **angularLogo**
El html del logo de angular lo dejo por aqui
```HTML
<img
    width="100"
    alt="Angular Logo"
    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg=="
  />
```
Agrego el CSS

16. Agrego estos dos componentes dentro del mapScreen
- El logo por fuera del div del mapa
- El boton dentro del map

17. Creo un servicio para mantener la instancia del mapa para ser utilizado desde cualquier sitio
`ng g s maps/services/map --skip-tests`

Lo agrego al archivo de exportaciones index.ts
Coloco la funcionalidad del servicio flyto para que el mapa se mueva a las coordenadas que se envien, tambien coloco una funcion isMapReady para saber si esta funcionando

18. Agrego la funcionalidad al btnMyLocation para que al hacer clic llame al servicio de map y ue la funcion de flyTo para dirigirse a las coordenadas de mi locacion (que estas las saco del places service)

19. Creo componentes para mostrar busqueda y detalles:
- searchBar `ng g c maps/components/searchBar --skip-tests`
-searchResults `ng g c maps/components/searchResults --skip-tests`

Ejemplo de direccion:
Av. de Vallcarca, 81, Gràcia, 08023 Barcelona
