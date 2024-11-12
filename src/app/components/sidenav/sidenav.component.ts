import { CommonModule } from '@angular/common';
import { Component,  OnDestroy, OnInit, } from '@angular/core';

import { Subscription } from 'rxjs';
import { PlacesService } from '../../services/places.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, TranslateModule],
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




