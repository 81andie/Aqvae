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


  constructor(private PlacesService: PlacesService){}

  ngOnInit(): void {


    }

  public isSidebarVisible: boolean = false;

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }



}




