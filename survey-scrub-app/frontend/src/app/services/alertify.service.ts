import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  confirm(message: string, okCallbacky: () => any) {
    alertify.confirm(message, (e: any) => {
      if (e) {
        okCallbacky();
      } else {}
    });
  }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  message(message: string) {
    alertify.message(message);
  }

  alert( dialogName: string, myMessage: string) {
    alertify.alert(dialogName, myMessage).set({transitionOff: true});
  }

}