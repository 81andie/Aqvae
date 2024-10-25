import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
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
        console.log(this.estaciName);
        return this.estaciName;
      })
    );
  }

  getCoordinates(estaciName: string): Observable<any> {
    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(estaciName)}.json?access_token=pk.eyJ1IjoiZWhlcm5hbmRlem5leHVzIiwiYSI6ImNtMXFseTQ2cDAxYnQyanF3ZThjNzVzbHIifQ.2V25gfCVjfaX98ErvQyzww`;
    return this.http.get<any>(apiUrl);
  }





}



