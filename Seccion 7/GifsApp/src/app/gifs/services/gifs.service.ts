import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

//const GIPHY_API_KEY = 'RE1GTROjOSZexokgD74o2yeDdZQGODeQ';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];
  private apiKey:string = 'RE1GTROjOSZexokgD74o2yeDdZQGODeQ';
  private url:string = 'https://api.giphy.com/v1/gifs/search';
  private limit:number = 20;

  public gifList: Gif[] = [];

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeLength(tag: string):void {
    if(tag.trim().length === 0) {
      return;
    }
    if(this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter(t => t !== tag);
      //la expresion anterior significa que se filtra el tag que es igual al tag que se esta buscando
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void {
    localStorage.setItem('tags', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void {
    if(localStorage.getItem('tags')) {
      this._tagsHistory = JSON.parse(localStorage.getItem('tags')!);
      this.searchTag(this._tagsHistory[0]);
    }
  }

  searchTag(tag: string):void {

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('q', tag)
    .set('limit', this.limit.toString());

    this.http.get<SearchResponse>(`${this.url}?`, {params})
    .subscribe((response) => {
      this.gifList = response.data;
      console.log(this.gifList);
    });

    //realizar una peticion http a la api de giphy


    
    /*if(tag.trim().length === 0) {
      return;
    }
    if(this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter(t => t !== tag);
      //la expresion anterior significa que se filtra el tag que es igual al tag que se esta buscando
    }*/
    this.organizeLength(tag);
  
    console.log(this._tagsHistory);
  }

  constructor(public http: HttpClient) {
    this.loadLocalStorage();
  }
}
