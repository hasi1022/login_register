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

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  form: FormGroup;
  result = '';
  err = '';
  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      billTo: ['', Validators.required],
      invoiceDate: ['', Validators.required],
      items: this.fb.array([this.createItem()]),
    });
  }
  createItem() {
    return this.fb.group({
      itemName: ['', Validators.required],
      itemQuantity: [0, Validators.required],
      itemUnitPrice: [0, Validators.required],
    });
  }
  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }
  add() {
    this.items.push(this.createItem());
  }
  onSubmit() {
    this.authservice.create(this.form.value).subscribe({
      next: (res) => {this.result = res; this.form.reset(); this.items.clear(); this.items.push(this.createItem())},
      error: (err) => (this.err = err),
    });
  }
}
