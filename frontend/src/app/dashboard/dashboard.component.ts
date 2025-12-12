import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Invoice, Items } from '../model/invoice.model';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"
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
  grandTotal:'DESC'|'AESC'='AESC';
  searchInvoice:any;
  copyInvoices:any;
  
  
  constructor(private router:Router,private authservice:AuthService){
   this.loadInvoices(this.currentPage)
  }
    loadInvoices(page:number){
      this.authservice.dashboard(page,null).subscribe({
         next:(res)=>{this.result=res; this.currentPage=res.page;this.totalPage=res.totalPage;this.copyInvoices=res.invoices},
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
    downloadPdf(invoice:Invoice){
      const doc=new jsPDF('p','mm','a4');

      doc.setFontSize(22);
      doc.text(`Invoice ${invoice.invoiceId}`,14,15)
      
      doc.setFontSize(14);
      doc.text(`Bill to : ${invoice.billTo}`,14,25)
      doc.text(`Invoice Date : ${new Date(invoice.invoiceDate).toLocaleDateString()}`,14,32)
      doc.text(`Grand Total : ₹${invoice.grandTotal}`,14,39)

      const itemRows=invoice.items.map((item:Items)=>[
        
        item.itemName,
        item.itemQuantity,
        item.itemUnitPrice,
        item.itemGstPer+'%',
        item.itemGst,
        item.itemSubUnitTotal+'₹'
      ])
      autoTable(doc,{
        startY:50,
        head:[['Item','Qty','UnitPrice','Gst%','GstAmount','Total']],
        body:itemRows
      })
      doc.setFontSize(10);
  doc.text(
    `Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
    14,
    doc.internal.pageSize.height - 10
  );
doc.save(`Invoice_${invoice.invoiceId}.pdf`);
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
            this.authservice.dashboard(this.currentPage,null).subscribe({    
              next: (res) =>  this.result=res
                    })
          },
          error:(err)=>{this.err=err}
        })
    }
    grandTotalSort(){
      if(this.grandTotal==="AESC"){
         this.grandTotal="DESC"
      }
      else{
        this.grandTotal="AESC";
      }
      
      this.authservice.dashboard(this.currentPage,this.grandTotal).subscribe({
        next:(res)=>{this.result=res;this.perPage=res.perPage; this.totalPage=res.totalPage},
        error:(err)=>{this.err=err}
      }
      )
    }
    search(event:any){
        const text=event.target.value.toLowerCase();
        if(!text){
          this.loadInvoices(this.currentPage)
        }
        else{
          this.result.invoices=this.copyInvoices.filter((inv:any)=>
          inv.billTo.toLowerCase().startsWith(text)
        )
        }
                
    }
}
