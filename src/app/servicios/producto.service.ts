import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private baseUrl = 'http://localhost:8080/productos';
  constructor(private http: HttpClient) { }
  getProducto(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createProducto(producto: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, producto);
  }

  updateProducto(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteProducto(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getProductosList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
