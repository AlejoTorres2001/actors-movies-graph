import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login() {
    const val = this.form.value;

    if (val.email && val.password) {
      this.authService.signin(val.email, val.password).subscribe(() => {
        this.router.navigateByUrl('/');
      });
    }
  }
  refresh() {
    this.authService.refresh().subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
