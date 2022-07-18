import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { Word } from './Word';

const httpOptions = {
  headers: new HttpHeaders(
    {
      "Content-Type": "application/json",
    },
  )
}

@Injectable({
  providedIn: 'root'
})
export class WordsService {
  private apiURL = 'http://localhost:4000/api/randomtext';
  private userURL = 'http://localhost:4000/api/store_usr_data'
  
  constructor(private http: HttpClient ) { }

  getWords(): Observable<Word>{
    return this.http.get<Word>(this.apiURL);
  }
}
