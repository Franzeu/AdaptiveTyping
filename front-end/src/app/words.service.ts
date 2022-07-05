import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  constructor(private http: HttpClient) { }

  getWords() {
    const url = 'http://localhost:4000/api/test';
    return this.http.get<any>(url);
  }
}
