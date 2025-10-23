import { Component } from '@angular/core';

@Component({
  selector: 'app-history',
  imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent {
  private historyRequest = localStorage.getItem('history-request') || '[]';
  protected data = JSON.parse(this.historyRequest);
}
