
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { SidenavComponent } from "../sidenav/sidenav.component";
import { Map, Popup, Marker } from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { embalse, Estaci, Features } from '../../interfaces/features.interface';
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
  //public markers: { coordinates: [number, number]; name: string }[] = [];
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
        zoom: 1,
        projection: 'globe',
        accessToken: environment.apiKey,
      });

      this.map.setCenter([2.833944, 41.977247]);
      this.addAllMarkers()

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

        });
      },
      error: (err) => console.error('Error al obtener datos:', err)
    });
  }

  public location_estations: any = {};


  public embalses:{ name: string; coordinates: [number, number] }[] = [
    {
      name: "Embassament de Sau (Vilanova de Sau)",
      coordinates: [2.38292, 41.97466]
    },
    {
      name: "Embassament de Susqueda (Osor)",
      coordinates: [2.51527, 41.9755]
    },
    {
      name: "Embassament de la Baells (Cercs)",
      coordinates: [1.87558, 42.13286]
    },
    {
      name: "Embassament de Sant Ponç (Clariana de Cardener)",
      coordinates: [1.60245, 41.96964]
    },
    {
      name: "Embassament de la Llosa del Cavall (Navès)",
      coordinates: [1.6022, 42.120711]
    },
    {
      name: "Embassament de Foix (Castellet i la Gornal)",
      coordinates: [1.63996, 41.25901]
    },
    {
      name: "Embassament de Siurana (Cornudella de Montsant)",
      coordinates: [0.91597, 41.25084]
    },
    {
      name: "Embassament de Riudecanyes",
      coordinates: [0.95340, 41.13547]
    },
    {
      name: "Embassament de Darnius Boadella (Darnius)",
      coordinates: [2.82324, 42.34975]
    }
  ];


  addMarker(embalse:{name:string; coordinates:[number,number]}) {

    const marker = new Marker()
      .setLngLat(embalse.coordinates)
      .setPopup(new Popup().setText(embalse.name))
      .addTo(this.map);

      marker.getElement().addEventListener('click', () => {
        this.flyTo(embalse.coordinates, embalse.name);

      });

  }


  addAllMarkers() {
   this.embalses.forEach(embalse =>{
    this.addMarker(embalse)
    console.log(embalse)
   })
  }


  flyTo(coordinates: [number, number], name: string) {

    this.map.flyTo({
      zoom: 14,
      center: coordinates,
      speed: 0.7,
      curve: 1.9,
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

         const coordinates = this.embalses.forEach((el=>{
          console.log(el)
          if (name === el.name) {
           this.flyTo(el.coordinates,el.name)
          }

         }))




       }

     })

   }











}




