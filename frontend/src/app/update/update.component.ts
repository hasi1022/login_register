import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Invoice, Items } from '../model/invoice.model';

@Component({
  selector: 'app-update',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
      form!:FormGroup;
      selectedInvoice:any;
      result='';
      err='';
      mode:'create'|'update'='create';
      constructor(private authservices:AuthService,private fb:FormBuilder){}
      ngOnInit(){
        this.form=this.fb.group({
          billTo:['',Validators.required],
          invoiceDate:['',Validators.required],
          items:this.fb.array([])
        })

        this.selectedInvoice=this.authservices.getSelectedInvoice().subscribe({
          next:(res:Invoice)=>{this.selectedInvoice=res; this.mode='update'; this.loadComponent(res)},
        })
        
      }
      
      get items(): FormArray {
    return this.form.get('items') as FormArray;
  }
   

  add() {
    this.items.push(this.fb.group({
      itemName: ['', Validators.required],
      itemQuantity: ['', Validators.required],
      itemUnitPrice: ['', Validators.required]
    }));
  }

      
      loadComponent(invoice:Invoice){
           if(invoice){
          this.form.patchValue({
            billTo:invoice.billTo,
            invoiceDate:invoice.invoiceDate
          })
        }
        const itemArray=this.form.get("items") as FormArray;
        this.selectedInvoice.items.forEach((element:Items) => {
          itemArray.push(this.fb.group({
              itemName:[element.itemName,Validators.required],
              itemQuantity:[element.itemQuantity,Validators.required],
              itemUnitPrice:[element.itemUnitPrice,Validators.required]
          }))
         
        });
      }
      onSubmit(){
        this.authservices.update(this.form.value,this.selectedInvoice.invoiceId).subscribe({
          next:(res) =>{this.result=res; this.form.reset()},
          error:(err) =>{this.err=err}
        })
      }
      onUpdate(){
        this.authservices
      }
}
