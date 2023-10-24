import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ConsumidorService {

  private baseUrl = 'http://localhost:8080/consumidores';
  constructor(private http: HttpClient) { }
  getConsumidor(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createConsumidor(consumidor: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, consumidor);
  }

  updateConsumidor(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteConsumidor(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getConsumidoresList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
