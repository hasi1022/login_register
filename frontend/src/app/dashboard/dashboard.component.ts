import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  result:any=null
  err=''
  selectedInvoice:any=null;
  delInvoice:any;
  constructor(private router:Router,private authservice:AuthService){
    this.authservice.dashboard().subscribe({
      next:(res)=>{this.result=res},
      error:(err)=>{this.err=err}
    })
  }
  
    onLogout(){
      localStorage.removeItem('token');
      this.router.navigate(['/login'])
    }
    create(){
      this.router.navigate(['/create'])
    }
    populateForm(invoice:any){
         this.authservice.setSelectedInvoice(invoice)
         this.router.navigate(['/update'])
    }
    deleteBtn(invoice:any){
        


    }
}
