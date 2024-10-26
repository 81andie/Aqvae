import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  public measurements$ = new BehaviorSubject<Features[]>([]);
mesurement: any;
  constructor(private PlacesService: PlacesService){}

  ngOnInit(): void {
    this.PlacesService.measurementsSubject.subscribe((measurements) =>{
      console.log('Mediciones recibidas:', measurements);
      this.measurements$.next(measurements);

    })

  }


  public isSidebarVisible: boolean = false;

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }



}




