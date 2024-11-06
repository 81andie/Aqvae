
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-species-story',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './species-story.component.html',
  styleUrl: './species-story.component.css'
})
export class SpeciesStoryComponent implements OnInit, OnDestroy {

  constructor( private placeService: PlacesService){}

  ngOnInit(): void {
    this.getSpecies();
  }
  ngOnDestroy(): void {

  }

   public speciesData:any[]=[];


  getSpecies():void{
  this.placeService.getSpeciesData().subscribe(data=>{
    this.speciesData = data;
    console.log(this.speciesData)
    console.log("")
  })
}


}
