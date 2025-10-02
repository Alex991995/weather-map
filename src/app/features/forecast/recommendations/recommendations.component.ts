import { Component, effect, input, OnInit, signal } from '@angular/core';
import { IWeatherInfo } from 'app/shared/interfaces';

@Component({
  selector: 'app-recommendations',
  imports: [],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.scss',
})
export class RecommendationsComponent {
  weatherInfo = input<IWeatherInfo | undefined>(undefined);
  recommendations = signal<{
    temp: string;
    condition: string;
    wind: string;
    humidity: string;
  }>({
    temp: '',
    condition: '',
    wind: '',
    humidity: '',
  });

  constructor() {
    effect(() => {
      const weatherInfo = this.weatherInfo();

      if (weatherInfo) {
        const tempInCelsius = weatherInfo.temp - 273.15;
        const condition = weatherInfo.weather[0].main;
        const wind = weatherInfo.wind.speed;
        const humidity = weatherInfo.humidity;

        const objNewRec = {
          temp: '',
          condition: '',
          wind: '',
          humidity: '',
        };
        if (tempInCelsius < 0) {
          objNewRec.temp = 'Dress warmly, frost is possible.';
        } else if (tempInCelsius > 0 && tempInCelsius < 10) {
          objNewRec.temp = 'A coat or jacket will be just right.';
        } else if (tempInCelsius > 10 && tempInCelsius < 20) {
          objNewRec.temp = 'Lightweight jacket or sweater';
        } else {
          objNewRec.temp = "It's hot, wear light clothes and drink more water.";
        }

        if (condition === 'Rain') {
          objNewRec.condition = 'Take an umbrella';
        } else if (condition === 'Snow') {
          objNewRec.condition = 'Dress warmly and wear winter shoes.';
        } else if (condition === 'Mist') {
          objNewRec.condition = 'Fog, be careful on the road';
        } else if (condition === 'Clouds') {
          objNewRec.condition = "It might be rain. Don't forget an umbrella";
        }
        if (wind > 10) {
          objNewRec.wind = 'Strong wind — be careful';
        } else {
          objNewRec.wind =
            'Good time for a walk, cycling, or outdoor activities.”';
        }
        if (humidity > 80) {
          objNewRec.humidity = "It's very humid, maybe stuffy.";
        } else {
          objNewRec.humidity = 'Comfortable air, good for being outside.';
        }
        this.recommendations.set(objNewRec);
      }
    });
  }
}
