import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '@core/services/api.service';

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
  protected isAuthorized = this.authService.isAuthorized;

  logOut() {
    this.apiService.logOut().subscribe();
    this.router.navigateByUrl('/login');
  }
}
