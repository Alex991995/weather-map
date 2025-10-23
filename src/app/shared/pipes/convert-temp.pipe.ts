import { inject, Pipe, PipeTransform } from '@angular/core';
import { SelectTempService } from '@core/services/select-temp.service';
import {
  KELVIN_OFFSET,
  FAHRENHEIT_MULTIPLIER,
  FAHRENHEIT_OFFSET,
} from '../constants';

@Pipe({
  name: 'convertTemp',
})
export class ConvertTempPipe implements PipeTransform {
  private selectTempService = inject(SelectTempService);
  private unitTemp = this.selectTempService.selectedTemp;

  transform(kelvin: number | undefined, ...args: unknown[]) {
    if (!kelvin) return null;

    if (this.unitTemp() === 'C') {
      const celsius = kelvin - KELVIN_OFFSET;
      return `${Math.floor(celsius)}°C`;
    } else {
      const celsius = kelvin - KELVIN_OFFSET;
      const fahrenheit = celsius * FAHRENHEIT_MULTIPLIER + FAHRENHEIT_OFFSET;
      return `${Math.floor(fahrenheit)}°F`;
    }
  }
}
