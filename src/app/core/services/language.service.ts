import { inject, Injectable, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LOCALE_ID, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  router = inject(Router);
  language = signal('');

  constructor(@Inject(LOCALE_ID) public locale: string) {
    this.language.set(this.locale);
  }

  // setLang(format: 'en' | 'ru') {
  //   this.language.set(format);
  // }
}
