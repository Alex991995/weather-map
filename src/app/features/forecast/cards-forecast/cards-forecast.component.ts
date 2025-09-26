import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { IForecastForCard } from 'app/shared/interfaces';
import { ConvertTempPipe } from 'app/shared/pipes/convert-temp.pipe';

@Component({
  selector: 'app-cards-forecast',
  imports: [DatePipe, ConvertTempPipe, DecimalPipe],
  templateUrl: './cards-forecast.component.html',
  styleUrl: './cards-forecast.component.scss',
})
export class CardsForecastComponent {
  forecastFor5Days = input<IForecastForCard[] | undefined>(undefined);
}
