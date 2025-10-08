import { Component, DestroyRef, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { ApiService } from '@core/services/api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private apiService = inject(ApiService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  protected isAuthorized = this.authService.isAuthorized;

  logOut() {
    this.apiService
      .logOut()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
    this.isAuthorized.set(false);
    this.router.navigateByUrl('/login');
  }
}
