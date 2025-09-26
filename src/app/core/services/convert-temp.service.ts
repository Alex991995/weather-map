import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConvertTempService {
  arrayTempMeasure = signal(['C', 'F']).asReadonly();
  selectedTemp = signal(this.arrayTempMeasure()[0]);

  changeTemp(unitTemp: string) {
    this.selectedTemp.set(unitTemp);
  }
}
