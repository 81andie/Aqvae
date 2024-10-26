import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacesService } from '../../services/places.service';
import { Features } from '../../interfaces/features.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-selectors',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './selectors.component.html',
  styleUrl: './selectors.component.css'
})
export class SelectorsComponent implements OnInit {
  constructor(private placesService: PlacesService,
              private fb:FormBuilder
  ) { }


  public embalsesData: { [fecha: string]: { [estaci: string]: any } } = {};
  public selectedEstaciones: { [estaci: string]: any } = {};



  ngOnInit(): void {
  this.getMesures();
  this.myForm.get('date')?.valueChanges.subscribe(() => this.onSelectionChange());
  this.myForm.get('waterDam')?.valueChanges.subscribe(() => this.onSelectionChange());


  }

  public myForm:FormGroup = this.fb.group({
    date:['', Validators.required],
    waterDam :['', Validators.required]
  })



  getMesures() {

  this.placesService.getMesures().subscribe(data =>{

    this.embalsesData = data;
   // console.log(this.embalsesData)
  })
  }

  onSelectionChange() {
    const selectedDate = this.myForm.value.date;
    const selectedWaterDam = this.myForm.value.waterDam;

    console.log('Fecha seleccionada:', selectedDate);
    console.log('Embalse seleccionado:', selectedWaterDam);

    if (selectedDate && selectedWaterDam) {
      this.placesService.updateMeasurements(selectedDate, selectedWaterDam);
      console.log(this.placesService.updateMeasurements(selectedDate,selectedWaterDam))
    }
  }





}
