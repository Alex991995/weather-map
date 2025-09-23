import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertTemp',
})
export class ConvertTempPipe implements PipeTransform {
  transform(value: number | undefined, ...args: unknown[]) {
    if (!value) return null;
    return value - 273.15;
  }
}
