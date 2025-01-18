

import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-species-story',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './species-story.component.html',
  styleUrl: './species-story.component.css'
})
export class SpeciesStoryComponent implements OnInit, OnDestroy {

  constructor(private placeService: PlacesService,

             
  ) { }

  ngOnInit(): void {
    this.getSpecies();


  }
  ngOnDestroy(): void {

  }

  public speciesData: any[] = [];
  speciesData1 = [
    { key: 'Barbdemuntanya', title: 'species.Barbdemuntanya.title', scientificName: 'species.Barbdemuntanya.scientificName', habitat: 'species.Barbdemuntanya.habitat', img: 'species.Barbdemuntanya.image' },
    { key: 'Tritodelmontseny', title: 'species.Tritodelmontseny.title', scientificName: 'species.Tritodelmontseny.scientificName', habitat: 'species.Tritodelmontseny.habitat', img: 'species.Tritodelmontseny.image' },
    { key: 'Salamandracomuna', title: 'species.Salamandracomuna.title', scientificName: 'species.Salamandracomuna.scientificName', habitat: 'species.Salamandracomuna.habitat' },
    { key: 'Tortugadestany', title: 'species.Tortugadestany.title', scientificName: 'species.Tortugadestany.scientificName', habitat: 'species.Tortugadestany.habitat' },
    { key: 'Naiade', title: 'species.Naiade.title', scientificName: 'species.Naiade.scientificName', habitat: 'species.Naiade.habitat' },
    { key: 'Anguila', title: 'species.Anguila.title', scientificName: 'species.Anguila.scientificName', habitat: 'species.Anguila.habitat' }
  ];

  getSpecies(): void {
    this.placeService.getSpeciesData().subscribe(data => {
      this.speciesData = data;


    })










}





}
















