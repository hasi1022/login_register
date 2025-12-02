import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { error } from 'console';

@Component({
  selector: 'app-registor',
  imports: [FormsModule,CommonModule],
  templateUrl: './registor.component.html',
  styleUrl: './registor.component.css'
})
export class RegistorComponent {
     constructor(private http:HttpClient){}
      user_name='';
      email='';
      password='';
      result:any=null
      error=''      
      reg_response='';
      onsubmit(){
        this.http.post<any>('http://localhost:8000/task/register',{
          user_name:this.user_name,
          email:this.email,
          password:this.password
        })
        .subscribe({
          next: (res) => {this.result=res; this.reg_response="registration succesfull"},
          error:(err) => {this.error=err}
        })
      }
}
 
