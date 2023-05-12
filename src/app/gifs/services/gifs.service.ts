import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

// const GIPHY_API_KEY = '274o4PVQwLhb34YNew4uYSNgqcDyYck1';

@Injectable({ providedIn: 'root' }) // El servicio esta disponible en toda la aplicacion
export class GifsService {
  //    Mantengo el arreglo solo dentro del servicio
  private _tagsHistory: string[] = [];

  // variable para almacenar la lista de Gifs
  public gifList: Gif[] = [];

  //----- Variables to compose API request ----//
  private apiKey: string = '274o4PVQwLhb34YNew4uYSNgqcDyYck1';
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadHistory();
  }

  get tagsHistory() {
    //  Ofrezco una copia de ese arreglo (evita que otro componente lo modifique)
    return [...this._tagsHistory];
  }

  private saveHistory() {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadHistory() {
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      //  Filtro el valor ingresado anteriormente
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    //  Agrego el tag al inicio
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    // Guardo el tag history en el localStorage
    this.saveHistory();
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);
    // console.log('Se hizo la peticion con este tag', tag);

    //---------- Request usando HttpClient de Angular ----------//
    //----- Parametros -----//
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);

    //----- Rquest -----//
    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((resp) => {
        // console.log(resp.data);
        this.gifList = resp.data;
        // console.log({ Gifs: this.gifList });
      });

    //---------- Fetch sin utilizar Angular tools ----------//
    // CON AWAIT
    // const resp = await fetch(
    //   'http://api.giphy.com/v1/gifs/search?api_key=274o4PVQwLhb34YNew4uYSNgqcDyYck1&q=valorant&limit=10'
    // );

    // const data = await resp.json();
    // console.log(data);

    // CRUDO
    // fetch(
    //   'http://api.giphy.com/v1/gifs/search?api_key=274o4PVQwLhb34YNew4uYSNgqcDyYck1&q=valorant&limit=10'
    // )
    //   .then((resp) => resp.json())
    //   .then((data) => console.log(data));
  }
}
