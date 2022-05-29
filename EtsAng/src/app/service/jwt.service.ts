import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequest } from '../models/jwtRequest';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private http:HttpClient) { }

  public generateToken(jwtRequest:any){

    return this.http.post<string>("http://localhost:8080/api/auth/authenticate",jwtRequest,
    {responseType: 'text' as 'json'})
  }

   public upload(token:any){
    
    let tokenStr='Bearer '+token
    const headers = new HttpHeaders().set("Authorization",tokenStr)
    return this.http.get("http://localhost:8080/api/file/upload",{headers, responseType: 'text' as 'json'})
   }

}
