import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
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
}