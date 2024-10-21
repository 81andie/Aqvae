import { CommonModule } from '@angular/common';
import {  Component, OnInit } from '@angular/core';
import { SidenavComponent } from "../sidenav/sidenav.component";
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, SidenavComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {

  public isPortadaVisible: boolean = true;

  ngOnInit(): void {
  }


  esVisible() {
    this.isPortadaVisible = !this.isPortadaVisible;
  }

  



}
