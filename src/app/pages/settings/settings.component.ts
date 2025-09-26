import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleThemeComponent } from '@components/toggle-theme/toggle-theme.component';
import { ConvertTempService } from '@core/services/convert-temp.service';

@Component({
  selector: 'app-settings',
  imports: [ToggleThemeComponent, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  private convertTempService = inject(ConvertTempService);
  protected arrayTempMeasure = this.convertTempService.arrayTempMeasure;
  public selectedValue = this.convertTempService.selectedTemp();

  changeEventSelector() {
    this.convertTempService.changeTemp(this.selectedValue);
  }
}
