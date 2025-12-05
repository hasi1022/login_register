import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../enviroment/enviroment";
import { jwtDecode } from "jwt-decode";


@Injectable({
    providedIn:'root'
})
export class AuthService{

    private baseUrl = environment.baseUrl;
    private selectedInvoice:any=null;
    constructor(private http:HttpClient){}
    register(data:any): Observable<any>{
        return this.http.post(`${this.baseUrl}/register`,data)
    }
    login(data:any):Observable<any>{
        return this.http.post(`${this.baseUrl}/login`,data)
    }
    dashboard():Observable<any>{
        const userId=this.getUserId();
        return this.http.get(`${this.baseUrl}/getinvoice/${userId}`)

    }
    create(data:any):Observable<any>{
        const token=localStorage.getItem('token')
        const headers=new HttpHeaders({
            'Authorization':`Bearer ${token}`
        })
        return this.http.post(`${this.baseUrl}/createinvoice`,data,{headers})
    }
    update(data:any,id:any):Observable<any>{
        const token=localStorage.getItem('token')
        const headers=new HttpHeaders({
            'Authorization':`Bearer ${token}`
        })
         return this.http.post(`${this.baseUrl}/update/${id}`,data,{headers}) 
    }
    delete(invoice:any):Observable<any>{
       const id=invoice.invoiceId;
       return this.http.get(`${this.baseUrl}/`)
    }
    getUserId(){
         const token=localStorage.getItem('token');
         if(!token){
            return null
         }
        const resultToken:any=jwtDecode(token);
        return resultToken.id;
    }
    setSelectedInvoice(invoice:any){
        this.selectedInvoice=invoice
    }
    getSelectedInvoice(){
        return this.selectedInvoice
    }
}