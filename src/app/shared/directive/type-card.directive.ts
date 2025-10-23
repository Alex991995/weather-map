import { Directive, ElementRef, Input, input, OnInit } from '@angular/core';

@Directive({
  selector: 'div[appTypeCard]',
})
export class TypeCardDirective implements OnInit {
  public typeCard = input.required<string>();
  public currentWeather = input<string>();
  constructor(private el: ElementRef<HTMLDivElement>) {}

  ngOnInit() {
    const typeCard = this.typeCard();
    if (typeCard === 'popular') {
      this.el.nativeElement.classList.add('text-bg-primary');
    } else if (typeCard === 'favorite') {
      this.el.nativeElement.classList.add('text-bg-info');
    } else {
      const currentWether = this.currentWeather();
      if (currentWether) {
        const weatherClass = this.getWeatherClass(currentWether);
        this.el.nativeElement.classList.add(weatherClass);
      }
    }
  }

  private getWeatherClass(weather: string): string {
    switch (weather) {
      case 'Rain':
        return 'weather-rain';
      case 'Clear':
        return 'weather-clear';
      case 'Snow':
        return 'weather-snow';
      case 'Clouds':
        return 'weather-clouds';
      default:
        return 'weather-clear';
    }
  }
}
