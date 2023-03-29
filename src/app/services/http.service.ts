import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  createShop(data: any): Observable <any>{
    return this.http.post(`${environment.apiUrl}/shops/create`, data)
  }

  searchShops(params: any): Observable <any>{
    return this.http.get(`${environment.apiUrl}/shops/search`, {params:params})
  }

  updateShop(id: any, data: any): Observable <any>{
    return this.http.put(`${environment.apiUrl}/shops/update`, data, {params: {id:id}})
  }
}
