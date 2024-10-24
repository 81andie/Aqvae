import { CommonModule } from '@angular/common';
import {  AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SidenavComponent } from "../sidenav/sidenav.component";
import {Map, Popup, Marker} from 'mapbox-gl';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, SidenavComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit, AfterViewInit{
  constructor(private cdr: ChangeDetectorRef) {}

  isCoverPageVisible = true;

  @ViewChild('mapDiv') mapDivElement!:ElementRef

  ngAfterViewInit(): void {
    if (!this.isCoverPageVisible) {
      this.initMap();  // Solo inicializa el mapa si el div ya está visible
    }

  }

  ngOnInit(): void {


}




initMap(){

  if(this.mapDivElement){
    const map = new Map({
    container: this.mapDivElement.nativeElement, // container ID
   // style: 'mapbox://styles/mapbox/streets-v12', // style URL
    pitch: 55,
   // bearing: 10,
    style: 'mapbox://styles/mapbox/satellite-streets-v12', // style URL
    center: [ 2.527139561879901,41.979429631974604],// starting position [lng, lat]
    zoom: 13,
    projection: 'globe',
    accessToken: environment.apiKey,
  });

  }else{
    console.error('mapDivElement no esta disponivle')
  }

}


 isVisible() {
  this.isCoverPageVisible = false;
  this.cdr.detectChanges();
    setTimeout(() => {
      this.initMap(); // Inicializa el mapa solo cuando el div esté disponible
    },0);
  }





}
