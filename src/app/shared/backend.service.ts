import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anzeigen } from './anzeigen';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  baseUrl = 'http://localhost:3000/Anzeigen'

  constructor(private http: HttpClient) { }

  getAll(): Observable<Anzeigen[]>{

    return this.http.get<Anzeigen[]>(this.baseUrl);
  }
  getOne(id: string): Observable<Anzeigen>{
    
    return this.http.get<Anzeigen>(this.baseUrl + '/' + id);
  }

  create( Anzeigen: Anzeigen): Observable<Anzeigen> {
    let endpoint = '/';
    return this.http.post<Anzeigen>(this.baseUrl + endpoint,Anzeigen );

 }
 update(_id: string, data: Anzeigen): Observable<Anzeigen> {
  return this.http.patch<Anzeigen>(this.baseUrl + '/' + _id, data);
}

 delete(id: string): Observable<any>{
 
return this.http.delete<string>(this.baseUrl + '/' + id, {observe: 'response'});
  }   
}

