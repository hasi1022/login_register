import { Component } from '@angular/core';
import { User } from '../model/invoice.model';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
      users:User[]|null=null;
      error='';
      delResult:string='';
      constructor(private authservice:AuthService,private router:Router){
        this.authservice.admin().subscribe({
          next:(res)=>{this.users=res.users},
          error:(err)=>{this.error=err}
        })
      }  
      redirect(){
        this.router.navigate(['/dashboard'])
      }
      deleteUser(user:User){
        this.authservice.userDelete(user).subscribe({
          next:(res)=>{this.delResult="delete succesfull";
                this.authservice.admin().subscribe({
                  next:(res)=>{this.users=res.users},
                  error:(err)=>{this.error=err}
                })
          },
          error:(err)=>{this.error=err}
        })
      }
}
