
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { SidenavComponent } from "../sidenav/sidenav.component";
import { Map, Popup, Marker } from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { Estaci, Features } from '../../interfaces/features.interface';
import { PlacesService } from '../../services/places.service';
import { SelectorsComponent } from "../selectors/selectors.component";
import { SliderTransitionComponent } from '../slider-transition/slider-transition.component';
import { Subscription } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { LanguageSelectorComponent } from "../language-selector/language-selector.component";
import { TranslateModule } from '@ngx-translate/core';



@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, SidenavComponent, SelectorsComponent, SliderTransitionComponent, TranslateModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',


})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy{

  private map!: Map;
  public estacions: Features[] = [];
  public estaciName: string[] = [];
  public markers: { coordinates: [number, number]; name: string }[] = [];
  public measurements: any[] = [];

  private getEstaciSubs!: Subscription;
  private getCoordSubs!: Subscription;
  private getCenterSubs!: Subscription;



  isCoverPageVisible = true;


  @ViewChild('mapDiv') mapDivElement!: ElementRef


  constructor(private cdr: ChangeDetectorRef,
    private placesService: PlacesService
  ) { }


  ngOnDestroy(): void {
    this.map?.remove();
    this.getEstaciSubs?.unsubscribe();
    this.getCoordSubs?.unsubscribe();
    this.getCenterSubs?.unsubscribe();
  }


  ngAfterViewInit(): void {
    if (!this.isCoverPageVisible) {
      this.initMap();  // Solo inicializa el mapa si el div ya está visible
    }
  }

  ngOnInit(): void {
    this.center()
  }

  isVisible() {
    this.isCoverPageVisible = false;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.initMap();
      this.fetchEstaci()
      // Inicializa el mapa solo cuando el div esté disponible
    }, 0);
  }


  initMap() {

    if (this.map) {
      console.warn('El mapa ya está inicializado.');
      return; // Evita inicializar el mapa nuevamente
    }

    if (this.mapDivElement) {


      this.map = new Map({
        container: this.mapDivElement.nativeElement, // container ID
        // style: 'mapbox://styles/mapbox/streets-v12', // style URL
        pitch: 42,
        bearing: 5,
        style: 'mapbox://styles/mapbox/satellite-streets-v12', // style URL
        // style: 'mapbox://styles/mapbox/standard',
        center: [2.833944, 41.977247],// starting position [lng, lat]
        zoom: 12,
        projection: 'globe',
        accessToken: environment.apiKey,
      });

      this.map.setCenter([2.833944, 41.977247]);

    } else {
      console.error('mapDivElement no esta disponivle')
    }
  }


  fetchEstaci() {
   this.getEstaciSubs = this.placesService.getEstaci().subscribe({
      next: (estaci) => {
        this.estaciName = estaci; // Asigna la lista filtrada a la propiedad del componente
        // console.log(this.estaciName);
        this.estaciName.forEach(estaci => {
          this.getCoordinates(estaci);
        });
      },
      error: (err) => console.error('Error al obtener datos:', err)
    });
  }

  public location_estations: any = {};

  getCoordinates(estaci: string) {

    if(this.location_estations[estaci]){
      let coordinates = this.location_estations[estaci];
      this.flyTo(coordinates, estaci);
      this.addMarker(coordinates, estaci);
      return;
    }

    this.getCoordSubs = this.placesService.getCoordinates(estaci).subscribe({
      next: (data) => {
        // console.log(data.features[0].center);
        // console.log(data)
        //let coordinates = data.features[0].center;


        let coordinates: [number, number];

        // Verificar si es "Vilanova de Sau" y usar el center de la posición 2
        if (estaci.toLowerCase().includes("vilanova de sau") && data.features.length > 2) {
          coordinates = data.features[2].center;
          //console.log('Usando coordenadas de features[2] para Vilanova de Sau:', coordinates);
        } else {
          // Para los demás, usar el center de la posición 0
          coordinates = data.features[0].center;
          // console.log('Usando coordenadas de features[0]:', coordinates);
        }

        this.location_estations[estaci] = coordinates;

        this.flyTo(coordinates, estaci)

        this.addMarker(coordinates, estaci)

      },

      error: (err) => console.error('Error al obtener datos:', err)
    });
  }


  addMarker(coordinates: [number, number], name: string) {
    const marker = new Marker()
      .setLngLat(coordinates)
      .setPopup(new Popup().setHTML(`<h3>${name}</h3>`))
      .addTo(this.map);

    marker.getElement().addEventListener('click', () => {
      this.flyTo(coordinates, name);  // Llama a flyTo al hacer clic en el marcador
    });
  }

  flyTo(coordinates: [number, number], name: string) {
    this.map.flyTo({
      zoom: 14,
      center: coordinates,
      speed: 0.6,    // Velocidad del vuelo (ajustable)
      curve: 1.9,    // Curva del vuelo para hacerlo más suave
      essential: true
    })
  }


  center() {
   this.getCenterSubs = this.placesService.measurements$.subscribe(measurements => {
      this.measurements = measurements;

      if (this.measurements.length > 0) {
        console.log('Mediciones en map:', this.measurements)
        const selectedMeasurement = this.measurements[0];
        const name = selectedMeasurement.estaci;
        console.log(name);

        if (name) {
          this.getCoordinates(name);
        }
      }

    })

  }
}




