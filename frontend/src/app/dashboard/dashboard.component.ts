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
  result=signal<any[]>([])
  page=signal(1);
  perPage=signal(2);
  totalPage=signal(1);
  loading=signal(false)
  err=''
  selectedInvoice:any=null;
  delInvoice:any;
  del='';
  rePage='';
  id:number|null=null;
  currentPage=1
  
  constructor(private router:Router,private authservice:AuthService){
   this.loadInvoices()
  }
    // loadInvoices(){
    //   this.authservice.dashboard(this.page).subscribe({
    //      next:(res)=>{this.result.set(res.invoices); this.totalPage.set(res.totalPage); this.loading.set(false)},
    //      error:(err)=>{this.err=err}
    //   })
    // }
    // nextPage(){
    //   if(this.page() < this.totalPage()){
    //     this.page.update(v=> v+1)
    //     this.loadInvoices();
    //   }
    // }
    // prevPage(){
    //   if(this.currentPage >1){
    //     this.page.update(v=> v-1)
    //     this.loadInvoices()
    //   }
    // }
  
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
