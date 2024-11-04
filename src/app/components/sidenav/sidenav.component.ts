import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { SelectorsComponent } from "../selectors/selectors.component";
import { BehaviorSubject, Subscription } from 'rxjs';
import { PlacesService } from '../../services/places.service';
import { Features } from '../../interfaces/features.interface';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit, OnDestroy{

  public measurements: any[] = [];
  private measureSubs!: Subscription;

  constructor(private placesService: PlacesService) { }

  ngOnDestroy(): void {
    this.measureSubs?.unsubscribe();
  }

  ngOnInit(): void {
   this.measureSubs= this.placesService.measurements$.subscribe(measurements => {
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




