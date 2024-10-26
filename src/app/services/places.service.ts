import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, Subject, tap } from "rxjs";
import { Estaci, Features } from '../interfaces/features.interface';


import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class PlacesService {

  public estacions: Features[] = [];
  public estaciName: string[] = [];

  private apiUrl = "https://analisi.transparenciacatalunya.cat/resource/gn9e-3qhr.json";


  public measurementsSubject = new Subject<any>();
  constructor(private http: HttpClient) { }


  getLocations(): Observable<Features[]> {
    return this.http.get<Features[]>(this.apiUrl)
      .pipe(
        tap(data => console.log('Datos recibidos:', data))
      )
  }




  getEstaci(): Observable<string[]> {
    return this.getLocations().pipe(
      map(data => {
        const filteredEstacions = data.map(estacion => estacion.estaci)
        this.estaciName = [...new Set(filteredEstacions)];
       // console.log(this.estaciName);
        return this.estaciName;
      })
    );
  }

  getCoordinates(estaciName: string): Observable<any> {
    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(estaciName)}.json?access_token=pk.eyJ1IjoiZWhlcm5hbmRlem5leHVzIiwiYSI6ImNtMXFseTQ2cDAxYnQyanF3ZThjNzVzbHIifQ.2V25gfCVjfaX98ErvQyzww`;
    return this.http.get<any>(apiUrl);
  }


  getMesures(): Observable<{ [fecha: string]: { [estaci: string]: Features } }> {

    return this.http.get<Features[]>(this.apiUrl).pipe(
      map(data => {
        const organizedData: { [fecha: string]: { [estaci: string]: Features } } = {};

        data.forEach(mesure => {

          const date = new Date(mesure.dia);
          const fecha = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;

          if (!mesure.nivell_absolut || !mesure.percentatge_volum_embassat || !mesure.volum_embassat) {
            return; // Excluir datos incompletos
          }

          if (!organizedData[fecha]) {
            organizedData[fecha] = {};
          }

          organizedData[fecha][mesure.estaci] = mesure;


        });

       // console.log('Datos organizados por fecha y pantano:', organizedData);
        return organizedData;

      }),

      tap(organizedData => console.log('Datos procesados:', organizedData))

    )

  }


  updateMeasurements(selectedDate: string, selectedWaterDam: string) {
    this.getMesures().subscribe(measures => {
      if (measures[selectedDate] && measures[selectedDate][selectedWaterDam]) {
        const filteredMeasurements = [measures[selectedDate][selectedWaterDam]];
        this.measurementsSubject.next(filteredMeasurements); // Emitir el array de medidas filtradas
      } else {
        this.measurementsSubject.next([]); // Emitir un array vacío si no hay datos
      }
    });

  }

}
