import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  private _url: string = "http://localhost:4000/api/test"

  constructor(private http: HttpClient) { }

  getWords() {
    return this.http.get(this._url);
  }
}
