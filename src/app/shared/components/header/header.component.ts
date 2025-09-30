import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private cookieService = inject(CookieService);
  private router = inject(Router);
  protected isAuthorized = this.authService.isAuthorized;
  protected readonly image = '/assets/rainy.png';

  logOut() {
    this.cookieService.delete('access_token');
    this.router.navigateByUrl('/login');
  }
}
