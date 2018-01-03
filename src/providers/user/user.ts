
import { Injectable } from '@angular/core';
import { apiUrl } from '../../globals';
import { HttpClient } from '@angular/common/http';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class User {

  constructor(private http: HttpClient) {
    console.log('Hello UserProvider Provider');

  }
  auth(form: any) {
    let data = JSON.stringify(form);
    let seq = this.http.post(apiUrl + "/account/logon", data, {
      headers: {
        "content-type": "application/json"
      },
      withCredentials: true,
      responseType: "text"
    })
    return seq;
  }
  isAuthenticated() {
    let seq = this.http.get(apiUrl + "/Account/IsAuthenticated", { withCredentials: true });
    return seq;
  }
  logOff(){
    let seq = this.http.get(apiUrl + "/Account/LogOff", { withCredentials: true, responseType: "text" });
    return seq;
  }
}
