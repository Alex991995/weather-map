import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreLocallyHistoryReqService {
  storeCity(city: string) {
    const [date, time] = new Date().toISOString().split('T');
    const pereTime = time.split('.')[0];

    const historyRequest = localStorage.getItem('history-request') || '[]';
    const arrayHistoryReq = JSON.parse(historyRequest) as {
      city: string;
      date: string;
    }[];
    const obj = { city: city, date: `${date} ${pereTime}` };
    if (arrayHistoryReq.length > 10) {
      arrayHistoryReq.shift();
    }
    arrayHistoryReq.push(obj);

    localStorage.setItem('history-request', JSON.stringify(arrayHistoryReq));
  }
  clearStorage() {
    localStorage.removeItem('history-request');
  }
}
