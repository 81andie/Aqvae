import { Injectable } from "@angular/core";
import {  map, Observable,  tap } from "rxjs";
import { Estaci, Features } from '../interfaces/features.interface';


import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class PlacesService {

  public estacions: Features[] = [];
  public estaciName: string[] = [];

  private apiUrl = "https://analisi.transparenciacatalunya.cat/resource/gn9e-3qhr.json";



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

  getUniqueDates(): Observable<string[]>{

    return this.getLocations().pipe(
      map(data=>{
        const dates = data.map(item => item.dia.toString());
        return Array.from(new Set(dates))
      })
    )
  }

  getAvailableEstacionsByDate(selectedDate: string): Observable<string[]> {
    return this.getLocations().pipe(
      map(data => {
        return data
          .filter(estacion => {
            // Convertir la fecha 'dia' a formato YYYY-MM-DD para comparación
            const stationDate = new Date(estacion.dia).toISOString().split('T')[0];
            const selectedDateFormatted = new Date(selectedDate).toISOString().split('T')[0]; // Asegúrate de que ambas fechas estén en el mismo formato

            console.log(`Comparando: ${stationDate} === ${selectedDateFormatted}`); // Verifica la comparación
            return stationDate === selectedDateFormatted; // Compara solo la parte de la fecha
          })
          .map(estacion => estacion.estaci); // Devuelve solo los nombres de las estaciones
      })
    );
  }

  public getMeasurements(date: string, waterDam: string): Observable<any[]> {
    console.log(`Obteniendo mediciones para la fecha: ${date} y el pantano: ${waterDam}`);
    return this.http.get<any[]>(`${this.apiUrl}/measurements?date=${date}&waterDam=${waterDam}`);
  }



}
