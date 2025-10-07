import { Component, inject, signal, DestroyRef, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '@core/services/api.service';
import { ErrorResponse, IUserLoginCredential } from 'app/shared/interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);
  private router = inject(Router);
  private apiService = inject(ApiService);
  protected errorMessage = signal('');

  ngOnInit(): void {
    this.apiService.getUser().subscribe((res) => {
      console.log(res);
    });
  }

  protected form = this._formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('^[a-zA-Z0-9]+$'),
      ],
    ],
  });

  submitEvent() {
    if (this.form.valid) {
      const body: IUserLoginCredential = {
        email: this.form.value.email!,
        password: this.form.value.password!,
      };
      this.apiService
        .loginUser(body)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          complete: () => {
            this.authService.setStatusAuthorization(true);
            this.router.navigateByUrl('/');
          },
          error: (err: ErrorResponse) => {
            console.log(err);
            this.form.setErrors({ message: err.error });
            this.errorMessage.set(err.error);
          },
          next: (value) => {
            console.log(value);
          },
        });
    }
  }

  get isValidEmail() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  get isDisable() {
    return this.form.invalid;
  }

  get isValidPassword() {
    const password = this.form.controls.password;
    return password.touched && password.dirty && password.invalid;
  }
}

// {
//     "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9sZWcuMTk5NUBnbWFpbC5jb20iLCJpYXQiOjE3NTg0NDM0OTIsImV4cCI6MTc1OTA0ODI5Mn0.fT6aJMp2iJTSBy6ZrwOqjBWoXuLDsvV8Bkt2Oa9A5hw"
// }
