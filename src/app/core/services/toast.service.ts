import { Injectable } from '@angular/core';
import { Toast } from 'bootstrap';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private container: HTMLElement;

  constructor() {
    this.container = document.querySelector('.toast-container')!;
  }

  showToast(message: string) {
    const toastEl = document.createElement('div');
    toastEl.classList.add('toast', 'bg-danger-subtle');
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    toastEl.innerHTML = ` <div class="toast-header">
    <strong class="me-auto">${message}</strong>

    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div class="toast-body">
    ${message}
  </div>`;

    this.container.appendChild(toastEl);
    const toast = Toast.getOrCreateInstance(toastEl);
    toast.show();
    setTimeout(() => {
      toast.hide();
    }, 2000);
  }
}
