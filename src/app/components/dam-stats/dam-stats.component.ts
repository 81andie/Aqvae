import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { Observable } from 'rxjs/internal/Observable';

// Importa Plotly.js
declare var Plotly: any;

@Component({
  selector: 'app-dam-stats',
  standalone: true,
  imports: [],
  templateUrl: './dam-stats.component.html',
  styleUrl: './dam-stats.component.css'
})
export class DamStatsComponent implements OnInit{

  monthlyMeasurements$: Observable<any[]>| null = null;;

  constructor(private placesService: PlacesService) {}



  ngOnInit(): void {
    this.monthlyMeasurements$ = this.placesService.getMonthlyMeasurements();
    this.monthlyMeasurements$.subscribe(data => {
      console.log(data)
      this.renderChart(data);


    });


  }


  private renderChart(data: any[]) {
    const traces: {
      x: any[]; // Meses en el eje X
      y: any[]; // Valores en el eje Y
      mode: string; // Tipo de gráfico: líneas y marcadores
      type: string; // Tipo 2D
      name: string; // Nombre de la estación
      line: { shape: string; smoothing: number; }; // Estilo de línea suave
      marker: { size: number; };
    }[] = [];

    const estacions = Object.keys(data[0]?.data || {});

    // Recorre cada estación y genera un trace
    estacions.forEach(est => {
      const yValues = data.map(monthData => monthData.data[est] || 0); // Valores de la estación

      const trace = {
        x: data.map(monthData => monthData.month), // Meses en el eje X
        y: yValues, // Valores en el eje Y
        mode: 'lines+markers', // Tipo de gráfico: líneas y marcadores
        type: 'scatter', // Tipo 2D
        name: est, // Nombre de la estación
        line: { shape: 'spline', smoothing: 1.3 }, // Estilo de línea suave
        marker: { size: 8 }, // Tamaño de los marcadores
      };

      traces.push(trace);
    });

    const layout = {
      title: 'Volumen de Agua por Estación y Mes ',

      xaxis: { title: 'Meses' },
      yaxis: { title: 'Volumen (%)' },
      margin: { l: 70, r: 50, b: 60, t: 30 },
      legend: {
        orientation: 'h', // Coloca la leyenda horizontalmente
        x: 0, // Alineación izquierda
        y: -0.9, // Coloca la leyenda debajo del gráfico
      },

    };

    // Monta el gráfico en el contenedor
    Plotly.newPlot('myDiv', traces, layout, { responsive: true })


  }





}


