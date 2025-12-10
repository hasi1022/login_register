import { Component } from '@angular/core';
import {
  FormArray,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Invoice } from '../model/invoice.model';
import { Items } from '../model/invoice.model';
import { OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent implements OnDestroy {
  form!: FormGroup;
  result: Invoice | null = null;
  err: Object = {};
  mode: 'create' | 'update' = 'update';
  // total: number = 0
  routerId: string = '';
  invoiceToListed: Invoice | null = null;
  itemRequired: string = '';
  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      billTo: ['', Validators.required],
      invoiceDate: ['', Validators.required],
      grandTotal: ['', Validators.required],
      items: this.fb.array([]),
    });
  }
  ngOnInit(): void {
    this.routerId = this.route.snapshot.params['id'];
    if (this.routerId) {
      this.authservice
        .updateList(this.routerId)
        .subscribe((invoice: Invoice) => {
          this.invoiceToListed = invoice;
          this.loadComponent(this.invoiceToListed);
        });
    } else {
      this.items.push(this.createItem());
      this.mode = 'create';
    }
    this.items.valueChanges.subscribe(() => {
      this.setTotal();
    });
  }
  setTotal() {
    let total = 0;
    this.items.controls.forEach((ctrl: FormGroup) => {
      const qty = ctrl.get('itemQuantity')?.value || 0;
      const unit = ctrl.get('itemUnitPrice')?.value || 0;
      const gstper = ctrl.get('itemGstPer')?.value || 0;

      const subUnitTotal = qty * unit;
      const gstAmount = qty * unit * (gstper / 100);

      ctrl
        .get('itemSubUnitTotal')
        ?.setValue(subUnitTotal, { emitEvent: false });
      ctrl.get('itemGst')?.setValue(gstAmount, { emitEvent: false });
      total += subUnitTotal;
    });
    this.form.get('grandTotal')?.setValue(total, { emitEvent: false });
  }
  ngOnDestroy(): void {
    this.authservice.clearSelectedInvoice();
  }

  createItem() {
    return this.fb.group({
      uuid:[crypto.randomUUID()],
      itemId:[null],
      itemName: ['', Validators.required],
      itemQuantity: ['', Validators.required],
      itemUnitPrice: ['', Validators.required],
      itemGstPer: ['', Validators.required],
      itemGst: ['', Validators.required],
      itemSubUnitTotal: ['', Validators.required],
    });
  }
  get items(): FormArray<FormGroup> {
    return this.form.get('items') as FormArray<FormGroup>;
  }

  add() {
    this.items.push(this.createItem());
  }
  
  removeItem(index:number){
    console.log(index)
    this.items.removeAt(index)
  }
  onClick() {
    if (this.routerId) {
      this.onUpdate();
    } else {
      this.onSubmit();
    }
  }

  loadComponent(invoice: Invoice) {
    if (invoice) {
      const date = invoice.invoiceDate
        ? new Date(invoice.invoiceDate).toISOString().substring(0, 10)
        : '';
      this.form.patchValue({
        billTo: invoice.billTo,
        invoiceDate: date,
        grandTotal: invoice.grandTotal,
      });

      const itemarray = this.form.get('items') as FormArray;
      itemarray.clear();
      invoice.items.forEach((item: Items) => {
        itemarray.push(
          this.fb.group({
            uuid:[crypto.randomUUID()],
            itemId:[item.itemId],
            itemName: [item.itemName, Validators.required],
            itemQuantity: [item.itemQuantity, Validators.required],
            itemUnitPrice: [item.itemUnitPrice, Validators.required],
            itemGstPer: [item.itemGstPer, Validators.required],
            itemGst: [item.itemGst, Validators.required],
            itemSubUnitTotal: [item.itemSubUnitTotal, Validators.required],
          })
        );
      });

      this.setTotal();
    }
  }
  onSubmit() {
    if (this.form.valid) {
      if (this.items.length > 0) {
        this.authservice.create(this.form.value).subscribe({
          next: (res) => {
            this.result = res;
            this.form.reset();
            this.items.clear();
            this.items.push(this.createItem());

            // this.router.navigate(['/dashboard'])
          },
          error: (err) => (this.err = err),
        });
      } else {
        this.itemRequired = 'item is required';
      }
    }
  }
  onUpdate() {
    if (this.form.valid) {
      if (this.items.length > 0) {
        this.authservice
          .update(this.form.value, this.invoiceToListed!.invoiceId)
          .subscribe({
            next: (res) => {
              this.result = res;
              this.form.reset();
              this.items.clear();
              localStorage.removeItem('invoice');
              this.authservice.clearSelectedInvoice();
              this.mode = 'create';
              this.router.navigate(['/dashboard']);
            },
          });
      } else {
        this.itemRequired = 'item is required';
      }
    }
  }
}
