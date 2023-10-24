import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  private baseUrl = 'http://localhost:8080/ordenes';
  constructor(private http: HttpClient) { }
  getOrden(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createOrden(orden: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, orden);
  }

  updateOrden(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteOrden(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getOrdenesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
