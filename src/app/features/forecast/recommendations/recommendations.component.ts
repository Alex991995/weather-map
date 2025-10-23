import { Component, effect, input, OnInit, signal } from '@angular/core';
import { IResponseCity } from 'app/shared/interfaces';
import { IRecommendations } from './model/recommendations';

@Component({
  selector: 'app-recommendations',
  imports: [],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.scss',
})
export class RecommendationsComponent {
  public weatherCity = input<IResponseCity | undefined>(undefined);
  protected recommendations = signal<IRecommendations>({
    temp: '',
    condition: '',
    wind: '',
    humidity: '',
  });
  constructor() {
    effect(() => {
      const weatherCity = this.weatherCity();
      if (weatherCity) {
        const tempInCelsius = weatherCity.main.temp - 273.15;
        const condition = weatherCity.weather[0].main;
        const wind = weatherCity.wind.speed;
        const humidity = weatherCity.main.humidity;
        const objNewRec: IRecommendations = {
          temp: '',
          condition: '',
          wind: '',
          humidity: '',
        };
        if (tempInCelsius < 0) {
          objNewRec.temp = $localize`Dress warmly, frost is possible.`;
        } else if (tempInCelsius > 0 && tempInCelsius < 10) {
          objNewRec.temp = $localize`A coat or jacket will be just right.`;
        } else if (tempInCelsius > 10 && tempInCelsius < 20) {
          objNewRec.temp = $localize`Lightweight jacket or sweater`;
        } else {
          objNewRec.temp = $localize`It's hot, wear light clothes and drink more water.`;
        }
        if (condition === 'Rain') {
          objNewRec.condition = $localize`Take an umbrella`;
        } else if (condition === 'Snow') {
          objNewRec.condition = $localize`Dress warmly and wear winter shoes.`;
        } else if (condition === 'Mist') {
          objNewRec.condition = $localize`Fog, be careful on the road`;
        } else if (condition === 'Clouds') {
          objNewRec.condition = $localize`It might be rain. Don't forget an umbrella`;
        }
        if (wind > 10) {
          objNewRec.wind = $localize`Strong wind — be careful`;
        } else {
          objNewRec.wind = $localize`Good time for a walk, cycling, or outdoor activities.”`;
        }
        if (humidity > 80) {
          objNewRec.humidity = $localize`It's very humid, maybe stuffy.`;
        } else {
          objNewRec.humidity = $localize`Comfortable air, good for being outside.`;
        }
        this.recommendations.set(objNewRec);
      }
    });
  }
}
