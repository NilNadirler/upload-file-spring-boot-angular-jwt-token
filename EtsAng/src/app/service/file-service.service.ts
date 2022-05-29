import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileResponse } from '../models/fileResponse';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  apiUrl="http://localhost:8080/api/file"
  constructor(private httpClient:HttpClient) { }

  public getAll():Observable<FileResponse[]>{

    let tokenStr='Bearer '+ localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set("Authorization",tokenStr)

    return this.httpClient.get<FileResponse[]>(`${this.apiUrl}/getAll`, { headers: headers})
  }

  public upload(file:FormData):Observable<HttpEvent<FileResponse[]>>{
    let tokenStr='Bearer '+ localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set("Authorization",tokenStr)
    return this.httpClient.post<FileResponse[]>(`${this.apiUrl}/upload`,file,{
      headers: headers,
      reportProgress:true,
      observe:'events'
    });
 

  }

  public download(id:string) {

    let tokenStr='Bearer '+ localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set("Authorization",tokenStr)

    return this.httpClient.get(`${this.apiUrl}/download/${id}`,{
      headers: headers,
      reportProgress:true,
      observe:'events',
      responseType:'blob'
    })
  }

  public getById(id:number):Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrl}/getById/${id}`)
  }
  
  public delete(id:string):Observable<any>{
    let tokenStr='Bearer '+ localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set("Authorization",tokenStr)
    return this.httpClient.delete<any>(`${this.apiUrl}/delete/${id}`, { headers: headers})
  }


}

