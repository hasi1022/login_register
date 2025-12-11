import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Invoice } from '../model/invoice.model';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  result:any;
  perPage=2;
  totalPage=1;
  currentPage=1
  err=''
  selectedInvoice:any=null;
  delInvoice:any;
  del='';
  rePage='';
  id:number|null=null;
  
  
  constructor(private router:Router,private authservice:AuthService){
   this.loadInvoices(this.currentPage)
  }
    loadInvoices(page:number){
      this.authservice.dashboard(page).subscribe({
         next:(res)=>{this.result=res; this.currentPage=res.page;this.totalPage=res.totalPage},
         error:(err)=>{this.err=err}
      })
    }
    nextPage(){
      if(this.currentPage < this.totalPage){
        this.loadInvoices(this.currentPage+1);
      }
    }
    prevPage(){
      if(this.currentPage >1){
        this.loadInvoices(this.currentPage-1)
      }
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
         this.id=this.authservice.getSelectedInvoice().invoiceId
         this.router.navigate([`/create/${this.id}`])
    }
    deleteBtn(invoice:any){
        this.authservice.delete(invoice).subscribe({
          next:(res)=>{this.del="delete succesfull";
            this.authservice.dashboard(this.currentPage).subscribe({    
              next: (res) =>  this.result=res
                    })
          },
          error:(err)=>{this.err=err}
        })



    }
}
