import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private baseUrl = 'https://exercisedb.p.rapidapi.com/exercises';
  private apiKey = '6434d2d2d0msh056e013419ee164p1d61b0jsn08076e5c74be';
  constructor(private http: HttpClient) {}

  getBodyParts(): Observable<any> {
    const url = `${this.baseUrl}/bodyPartList`;
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    });
    
    return this.http.get(url, { headers });
  }

  getExercises(filterType?: string, filterValue?: string, limit: number = 10, offset: number = 0): Observable<any> {
    let url = this.baseUrl;
    if (filterType && filterValue) {
      url += `/${filterType}/${filterValue}`;
    }
    
    url += `?limit=${limit}&offset=${offset}`;

    const headers = new HttpHeaders({
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    });

    return this.http.get(url, { headers });
  }
}
