import { Injectable } from '@angular/core';
import { Alert } from '../../model/alert.class';

@Injectable()
export class AlertService {

  static response: Alert = new Alert();

  public setAlert(data: Alert) {
    AlertService.response.type = data.type;
    AlertService.response.title = data.title;
    AlertService.response.message = data.message;
    setTimeout(() => {
      this.resetAlert();
    }, 100);
    return AlertService.response;
  }
  public getAlert() {
    return AlertService.response;
  }
  public resetAlert() {
    AlertService.response = {};
    return AlertService.response;
  }

}
