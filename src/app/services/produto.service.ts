import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto.model';

const baseUrl = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${baseUrl}/produtos`);
  }

  get(codigo: any): Observable<Produto> {
    return this.http.get<Produto>(`${baseUrl}/${codigo}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(codigo: any, data: any): Observable<any> {
    return this.http.patch(`${baseUrl}/${codigo}}`, data);
  }

  delete(codigo: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${codigo}`);
  }
}
