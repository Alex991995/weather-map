import { Component, input, OnInit, signal } from '@angular/core';
import { ConvertTempPipe } from '../../pipes/convert-temp.pipe';
import {
  IForecastCityForCards,
  IResponseCityById,
} from 'app/shared/interfaces';

@Component({
  selector: 'app-cards',
  imports: [ConvertTempPipe],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  title = input.required();
  typeCard = input.required();
  weatherData = input<IForecastCityForCards[]>([]);
  arrayTypeCards = ['popular', 'default', 'favorite'];
}
