import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacesService } from '../../services/places.service';


@Component({
  selector: 'app-selectors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selectors.component.html',
  styleUrl: './selectors.component.css'
})
export class SelectorsComponent implements OnInit {
  constructor(private placesService: PlacesService) { }

  

  ngOnInit(): void {
 this.getMesures();
  }

  getMesures() {

    this.placesService.getMesures().subscribe({
      next: (data) => {
       console.log(data)
      }
    })


  }

}
