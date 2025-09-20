import { AbstractControl } from '@angular/forms';

export function equalPasswords(control: AbstractControl) {
  const password = control.get('password')?.value;
  const repeatPassword = control.get('repeatPassword')?.value;

  if (password === repeatPassword) {
    return null;
  }
  return { passwordsNotEqual: true };
}
