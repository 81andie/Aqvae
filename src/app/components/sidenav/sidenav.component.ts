import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SelectorsComponent } from "../selectors/selectors.component";
import { BehaviorSubject } from 'rxjs';
import { PlacesService } from '../../services/places.service';
import { Features } from '../../interfaces/features.interface';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent  implements OnInit {

  maxVolum: number = 0;  // Inicialización con un valor por defecto
  maxNivell: number = 0;


  public measurements: any[] = [];

  constructor(private PlacesService: PlacesService){}

  ngOnInit(): void {
    this.PlacesService.measurements$.subscribe(measurements => {
      this.measurements = measurements; // Actualizar las mediciones
      console.log('Mediciones en Sidenav:', this.measurements);
      this.calculateMaxValues();
    });

    }

    private calculateMaxValues(): void {
      if (this.measurements.length > 0) {
        this.maxVolum = Math.max(...this.measurements.map(m => m.volum_embassat));
        this.maxNivell = Math.max(...this.measurements.map(m => m.nivell_absolut));
      } else {
        this.maxVolum = 0;
        this.maxNivell = 0;
      }
    }

  public isSidebarVisible: boolean = false;

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }





}




