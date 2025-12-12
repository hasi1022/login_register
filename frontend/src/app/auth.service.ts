import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroment/enviroment';
import { jwtDecode } from 'jwt-decode';
import { Invoice, User } from './model/invoice.model';
import { map } from 'rxjs';
import { ILoginUserResponse } from './model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  private selectedInvoice: any = null;
  constructor(private http: HttpClient) {}
  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }
  login(data: any): Observable<ILoginUserResponse> {
    return this.http.post<ILoginUserResponse>(`${this.baseUrl}/login`, data);
  }
  dashboard(
    page: any,
    sort: string | null,
    search: any | null
  ): Observable<any> {
    const headers = this.getToken();
    if (sort) {
      return this.http.get(
        `${this.baseUrl}/getinvoice?page=${page}&sort=${sort}`,
        { headers }
      );
    }
    if (search) {
      return this.http.get(
        `${this.baseUrl}/getinvoice?page=${page}&search=${search}`,
        { headers }
      );
    } else {
      return this.http.get(`${this.baseUrl}/getinvoice?page=${page}`, {
        headers,
      });
    }
  }
  create(data: any): Observable<any> {
    const headers = this.getToken();
    return this.http.post(`${this.baseUrl}/createinvoice`, data, { headers });
  }
  updateList(id: string): Observable<Invoice> {
    const headers = this.getToken();
    return this.http
      .get<{ message: Invoice }>(`${this.baseUrl}/updates/${id}`, { headers })
      .pipe(map((res) => res.message));
  }

  // updateList(id:string):Observable<Invoice>{
  //     const headers=this.getToken();
  //     return this.http.get(`${this.baseUrl}/updates/${id}`,{headers})
  // }
  update(data: any, id: any): Observable<any> {
    const headers = this.getToken();
    return this.http.post(`${this.baseUrl}/update/${id}`, data, { headers });
  }
  delete(invoice: any): Observable<any> {
    const id = invoice.invoiceId;

    const headers = this.getToken();
    return this.http.get(`${this.baseUrl}/delete/${id}`, { headers });
  }
  admin(): Observable<any> {
    const headers = this.getToken();
    return this.http.get(`${this.baseUrl}/admin`, { headers });
  }
  userDelete(user: User): Observable<any> {
    const headers = this.getToken();
    return this.http.post(`${this.baseUrl}/userdelete`, user, { headers });
  }

  getUserId() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    const resultToken: any = jwtDecode(token);
    return resultToken.id;
  }
  setSelectedInvoice(invoice: any) {
    this.selectedInvoice = invoice;
  }
  getSelectedInvoice() {
    return this.selectedInvoice;
  }
  clearSelectedInvoice() {
    return (this.selectedInvoice = null);
  }
  getToken() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return headers;
  }
}
