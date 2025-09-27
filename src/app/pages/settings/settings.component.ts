import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleThemeComponent } from '@components/toggle-theme/toggle-theme.component';
import { ApiService } from '@core/services/api.service';
import { ConvertTempService } from '@core/services/convert-temp.service';

@Component({
  selector: 'app-settings',
  imports: [ToggleThemeComponent, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  private convertTempService = inject(ConvertTempService);
  private apiService = inject(ApiService);
  private destroyRef = inject(DestroyRef);
  protected defaultCity = signal('');

  protected arrayTempMeasure = this.convertTempService.arrayTempMeasure;
  public selectedValue = this.convertTempService.selectedTemp();

  ngOnInit(): void {
    this.apiService.getUser().subscribe((res) => {
      console.log(res);
    });
  }

  changeEventSelector() {
    this.convertTempService.changeTemp(this.selectedValue);
  }

  clickEventInputDefaultCity() {
    const defaultCity = this.defaultCity();
    if (defaultCity) {
      this.apiService.setDefaultCity(defaultCity).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
