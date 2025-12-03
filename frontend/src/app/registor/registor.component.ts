import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import {FormBuilder, FormsModule, Validators} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { RouterOutlet,RouterLinkActive,RouterLink } from '@angular/router';
import { error } from 'console';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registor',
  imports: [FormsModule,CommonModule,RouterLink,RouterLinkActive,ReactiveFormsModule],
  templateUrl: './registor.component.html',
  styleUrl: './registor.component.css'
})
export class RegistorComponent {
     constructor(private http:HttpClient){}
      user_name='';
      email='';
      password='';
      submitted=false;
      fb=new FormBuilder();
      form=this.fb.group({
        user_name:['',[Validators.required,Validators.minLength(3)]],
        email:['',[Validators.required]],
        password:['',[Validators.required]]
      })
      result:any=null
      error=''      
      reg_response='';
      onSubmit(){
        const formData=this.form.value;
        this.http.post<any>('http://localhost:8000/task/register',{
          user_name:formData.user_name,
          email:formData.email,
          password:formData.password
        })
        .subscribe({
          next: (res) => {this.result=res; this.reg_response="registration succesfull"},
          error:(err) => {this.error=err}
        })
      }
}
 
