import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../enviroment/enviroment";


@Injectable({
    providedIn:'root'
})
export class AuthService{
    private baseUrl = environment.baseUrl;
    constructor(private http:HttpClient){}
    register(data:any): Observable<any>{
        return this.http.post(`${this.baseUrl}/register`,data)
    }
    login(data:any):Observable<any>{
        return this.http.post(`${this.baseUrl}/login`,data)
    }
    create(data:any):Observable<any>{
        const token=localStorage.getItem('token')
        const headers=new HttpHeaders({
            'Authorization':`Bearer ${token}`
        })
        return this.http.post(`${this.baseUrl}/createinvoice`,data,{headers})
    }
}