import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@core/services/api.service';
import { IUserBody } from 'app/shared/interfaces';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private router = inject(Router);
  apiService = inject(ApiService);

  //  firstName: string;
  // lastName: string;
  // password: string;
  // email: string;
  // role?: boolean;

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
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('^[a-zA-Z0-9]+$'),
      ],
    ],
  });

  ngOnInit(): void {
    //   this.apiService.createUser().subscribe((res) => {
    //     console.log(res);
    //   });
  }

  submitEvent() {
    const isAdmin = this.form.value.email?.includes('admin');
    const valid = this.form.valid;
    if (valid) {
      const body: IUserBody = {
        firstName: this.form.value.firstName!,
        lastName: this.form.value.lastName!,
        password: this.form.value.password!,
        email: this.form.value.email!,
        is_admin: isAdmin,
      };

      this.apiService.createUser(body).subscribe((res) => {
        console.log(res.id);
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

  get isValidPassword() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
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
