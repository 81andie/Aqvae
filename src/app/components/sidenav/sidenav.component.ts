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
export class SidenavComponent implements OnInit {

  public measurements: any[] = [];

  constructor(private PlacesService: PlacesService) { }

  ngOnInit(): void {
    this.PlacesService.measurements$.subscribe(measurements => {
      this.measurements = measurements;
      if (this.measurements.length > 0) {
        this.isSidebarVisible = true
      }
      // Actualizar las mediciones
      console.log('Mediciones en Sidenav:', this.measurements);
    });

  }



  public isSidebarVisible: boolean = false;

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  }




