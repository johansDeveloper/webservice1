import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../../environments/environment';

@Injectable()
export class DataService {

  static langs: [any];

  constructor(
    private http: Http,
  ) { }


  getLang(): Promise<any> {

    return new Promise((resolve, reject) => {
      if (DataService.langs) {
        return resolve(DataService.langs);
      }
      this.http
        .get(`/assets/data/lang.${environment.lang}.json`)
        .map((response) => response.json())
        .subscribe((langs) => {
          DataService.langs = langs;
          resolve(langs);
        });
    });
  }

  getStates(): Observable<any> {
    return this.http
      .get('/assets/data/states.json')
      .map((response) => response.json());
  }

}
