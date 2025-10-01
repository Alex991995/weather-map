import { inject, Pipe, PipeTransform } from '@angular/core';
import { SelectTempService } from '@core/services/select-temp.service';

@Pipe({
  name: 'convertTemp',
})
export class ConvertTempPipe implements PipeTransform {
  private selectTempService = inject(SelectTempService);
  private unitTemp = this.selectTempService.selectedTemp;
  transform(value: number | undefined, ...args: unknown[]) {
    if (!value) return null;

    if (this.unitTemp() === 'C') {
      const res = value - 273.15;
      return `${Math.floor(res)}°C`;
    } else {
      let a = value - 273.15;
      let res = a * 1.8 + 32;
      return `${Math.floor(res)}°F`;
    }
  }
}
