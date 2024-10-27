import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  public fechas: string[] = [];
  public estacionsDisponibles: string[] = [];
  public estacions: string[] = [];
  @Output() measurementSelected = new EventEmitter<any[]>();

  constructor(private placesService: PlacesService,
              private fb:FormBuilder
  ) { }


  ngOnInit(): void {
  this.loadUniqueDates();
  this.setupDateChangeListener();
  this.onDateChange()

}





  public myForm:FormGroup = this.fb.group({
    date:['', Validators.required],
    waterDam :['', Validators.required]
  })



   private loadUniqueDates(): void {
    this.placesService.getUniqueDates().subscribe(fechas => {
      console.log('Fechas únicas:', fechas);
      this.fechas = fechas;
    });
  }

  private setupDateChangeListener() {
    this.myForm.get('date')?.valueChanges.subscribe(selectedDate => {
      this.loadAvailableEstacions(selectedDate);
      console.log(this.loadAvailableEstacions)
    });
  }

  private loadAvailableEstacions(selectedDate: string) {
    this.placesService.getAvailableEstacionsByDate(selectedDate).subscribe(estacions => {
      this.estacionsDisponibles = estacions;
      console.log(this.estacionsDisponibles);
    });
  }


  private onDateChange(): void {
    this.myForm.get('date')?.valueChanges.subscribe(selectedDate => {
      console.log('Fecha seleccionada:', selectedDate); // Para verificar la fecha seleccionada
      if (selectedDate) {
        this.placesService.getAvailableEstacionsByDate(selectedDate).subscribe(estacions => {
          console.log('Estaciones disponibles:', estacions); // Verifica las estaciones que se devuelven
          this.estacions = estacions;
        });
      } else {
        this.estacions = []; // Limpia las estaciones si no hay fecha seleccionada
      }
    });

  }

  public onWaterDamChange(event:Event): void {
    const selectElement = event.target as HTMLSelectElement; // Asegúrate de hacer el casting a HTMLSelectElement
    const selectedDam = selectElement.value; // Obtén el valor directamente del select
    const selectedDate = this.myForm.get('date')?.value;

    console.log('Pantano seleccionado:', selectedDam); // Log del pantano seleccionado
    console.log('Fecha seleccionada:', selectedDate); // Log de la fecha seleccionada

    // Llama a la función que maneja la obtención de mediciones
    this.onSelectMeasurement(selectedDate, selectedDam);
  }

  private onSelectMeasurement(date: string, waterDam: string): void {
    this.placesService.getMeasurements(date, waterDam).subscribe(measurements => {
      this.measurementSelected.emit(measurements); // Emitir las mediciones
      console.log(this.measurementSelected); // Log de las mediciones obtenidas
    });
  }

}
