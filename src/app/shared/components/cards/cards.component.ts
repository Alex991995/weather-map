import { Component, input, OnInit, signal } from '@angular/core';
import { ConvertTempPipe } from '../../pipes/convert-temp.pipe';
import { IForecastCityForCards } from 'app/shared/interfaces';
import { TypeCardDirective } from 'app/shared/directive/type-card.directive';

@Component({
  selector: 'app-cards',
  imports: [ConvertTempPipe, TypeCardDirective],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  public title = input.required();
  public typeCard = input.required<string>();
  public weatherData = input<IForecastCityForCards[]>([]);
  protected arrayTypeCards = ['popular', 'default', 'favorite'];
}
