import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Form } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { jwtDecode } from 'jwt-decode';
import {
  EUserRoleType,
  IDebugTokenModel,
  ILoginUserResponse,
} from '../model/user.model';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private router: Router, private _authservice: AuthService) {}
  // username='';
  // password='';
  fb = new FormBuilder();
  submitted = false;
  user!: IDebugTokenModel;
  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required]],
  });
  onSubmit() {
    this._authservice.login(this.form.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.user = jwtDecode(localStorage.getItem('token')!);
        if (this.user?.role === EUserRoleType.ADMIN) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
    // const formData=this.form.value;
    //      this.http.post<any>('http://localhost:8000/task/login',{
    //       username:formData.username,
    //       password:formData.password
    //      })
    //      .subscribe({
    //        next: (res)=>{this.login=res; this.router.navigate(['/dashboard'])},
    //        error: (err)=>{this.error=err}
    //      })
  }
}
