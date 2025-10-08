import { Directive, ElementRef, Input, input, OnInit } from '@angular/core';

@Directive({
  selector: 'div[appTypeCard]',
})
export class TypeCardDirective implements OnInit {
  public appTypeCard = input.required<string>();
  constructor(private el: ElementRef<HTMLDivElement>) {}

  ngOnInit() {
    const typeCard = this.appTypeCard();
    if (typeCard === 'popular') {
      this.el.nativeElement.classList.add('text-bg-primary');
    } else if (typeCard === 'favorite') {
      this.el.nativeElement.classList.add('text-bg-info');
    } else {
      this.el.nativeElement.classList.add('text-bg-warning');
    }
  }
}
