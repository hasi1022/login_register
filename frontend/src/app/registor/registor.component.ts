
import { Component } from '@angular/core';
import {FormBuilder, FormsModule, Validators} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { RouterLinkActive,RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registor',
  imports: [FormsModule,CommonModule,RouterLink,RouterLinkActive,ReactiveFormsModule],
  templateUrl: './registor.component.html',
  styleUrl: './registor.component.css'
})
export class RegistorComponent {
     
      
      submitted=false;
      
      fb=new FormBuilder();
      form=this.fb.group({
        user_name:['',[Validators.required,Validators.minLength(3)]],
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required]]
      })
      constructor(private authservice:AuthService,private router:Router){}
      
      result:any=null
      error=''      
      reg_response='';
      onSubmit(){
        this.authservice.register(this.form.value).subscribe({
          next: (res)=>{this.reg_response="registration succesfull"; this.form.reset() ;this.router.navigate(['/login'])},
          error:(err)=>{this.error="something went wrong"}
        })
        // const formData=this.form.value;
        // this.http.post<any>('http://localhost:8000/task/register',{
        //   user_name:formData.user_name,
        //   email:formData.email,
        //   password:formData.password
        // })
        // .subscribe({
        //   next: (res) => {this.result=res; this.reg_response="registration succesfull"},
        //   error:(err) => {this.error=err}
        // })
      }
}
 
