import { Component, inject, signal, DestroyRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@core/services/api.service';
import { ErrorResponse, IUserBody } from 'app/shared/interfaces';
import { equalPasswords } from './helpers/equal-passwords';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private _formBuilder = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private apiService = inject(ApiService);
  protected errorMessage = signal('');

  protected form = this._formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('^[a-zA-Z0-9]+$'),
      ],
    ],
    lastName: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('^[a-zA-Z0-9]+$'),
      ],
    ],
    passwords: this._formBuilder.nonNullable.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.pattern('^[a-zA-Z0-9]+$'),
          ],
        ],
        repeatPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.pattern('^[a-zA-Z0-9]+$'),
          ],
        ],
      },
      { validators: [equalPasswords] }
    ),
  });

  submitEvent() {
    const isAdmin = this.form.value.email?.includes('admin') ? true : false;
    const valid = this.form.valid;
    if (valid) {
      const body: IUserBody = {
        firstName: this.form.value.firstName!,
        lastName: this.form.value.lastName!,
        password: this.form.value.passwords?.password!,
        email: this.form.value.email!,
        is_admin: isAdmin,
      };
      console.log(body);
      this.apiService
        .createUser(body)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          complete: () => {
            this.router.navigateByUrl('/login');
          },
          error: (err: ErrorResponse) => {
            this.form.setErrors({ message: err.error });
            this.errorMessage.set(err.error);
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
    const password = this.form.controls.passwords.controls.password;
    return password.touched && password.dirty && password.invalid;
  }
  get isValidRepeatPassword() {
    const repeatPassword = this.form.controls.passwords.controls.repeatPassword;
    return (
      repeatPassword.touched && repeatPassword.dirty && repeatPassword.invalid
    );
  }

  get isValidFirstName() {
    return (
      this.form.controls.firstName.touched &&
      this.form.controls.firstName.dirty &&
      this.form.controls.firstName.invalid
    );
  }
  get isValidLastName() {
    return (
      this.form.controls.lastName.touched &&
      this.form.controls.lastName.dirty &&
      this.form.controls.lastName.invalid
    );
  }
}
