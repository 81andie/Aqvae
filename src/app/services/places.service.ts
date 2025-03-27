import { environment } from './../../environments/environment';
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { Estaci, Features } from '../interfaces/features.interface';
import { HttpClient, HttpParams } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class PlacesService {



  public estacions: Features[] = [];
  public estaciName: string[] = [];

  public key = environment.apiKey

  private apiUrl = "https://analisi.transparenciacatalunya.cat/resource/gn9e-3qhr.json";

  private measurementSubject = new BehaviorSubject<any[]>([]);
  measurements$ = this.measurementSubject.asObservable();



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
    const normalizedName = estaciName

   .replace('Embalssament', 'Pantà')
   .replace('Embassament', 'Embalssament')
   .replace('Embassament', 'Reservoir')

    const bbox = '-0.6,40.5,3.4,42.9';
    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(normalizedName)}.json?bbox=${bbox}&access_token=pk.eyJ1IjoiZWhlcm5hbmRlem5leHVzIiwiYSI6ImNtMXFseTQ2cDAxYnQyanF3ZThjNzVzbHIifQ.2V25gfCVjfaX98ErvQyzww`;
  

    return this.http.get<any>(apiUrl);
  }

  getUniqueDates(): Observable<string[]> {

    return this.getLocations().pipe(
      map(data => {
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

            //console.log(`Comparando: ${stationDate} === ${selectedDateFormatted}`); // Verifica la comparación
            return stationDate === selectedDateFormatted; // Compara solo la parte de la fecha
          })
          .map(estacion => estacion.estaci); // Devuelve solo los nombres de las estaciones
      })
    );
  }

  public getMeasurements(date: string, waterDam: string, minAbsoluteLevel?: number, minVolumePercent?: number, minVolume?: number): Observable<Features[]> {
    let params = new HttpParams()
      .set("$where", `dia='${new Date(date).toISOString().split('T')[0]}' AND estaci='${waterDam}'`);

    if (minAbsoluteLevel !== undefined) {
      params = params.append("$where", `nivell_absolut > ${minAbsoluteLevel}`);
    }
    if (minVolumePercent !== undefined) {
      params = params.append("$where", `percentatge_volum_embassat = ${minVolumePercent}`);
    }
    if (minVolume !== undefined) {
      params = params.append("$where", `volum_embassat = ${minVolume}`);
    }

    // console.log("Parametros de consulta:", params.toString()); // Log para verificar los parámetros

    return this.http.get<Features[]>(this.apiUrl, { params });
  }


  emitMeasurements(measurements: any[]) {
    this.measurementSubject.next(measurements);
  }

  selectMeasurement(measurement: any) {
    this.measurementSubject.next([measurement]);
  }


  getSpeciesData(): Observable<any> {
    return this.http.get<any[]>('assets/species-data.json')
  }

}
