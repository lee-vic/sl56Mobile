import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../globals';

/*
  Generated class for the InstantMessageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InstantMessageProvider {

  constructor(public http: HttpClient) {
    console.log('Hello InstantMessageProvider Provider');
  }
  getUnReadMessage() {
    let seq = this.http.get<any>(apiUrl + "/InstantMessage/GetUnReadMessage", { withCredentials: true });
    return seq;
  }
}
