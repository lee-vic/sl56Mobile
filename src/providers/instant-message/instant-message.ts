import { HttpClient, HttpParams } from '@angular/common/http';
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
  /**
   * 单号消息
   */
  getMessages1() {
    let seq = this.http.get<any>(apiUrl + "/InstantMessage/GetMessages1", { withCredentials: true });
    return seq;
  }
  /**
   * 非单号消息
   */
  getMessages2() {
    let seq = this.http.get<any>(apiUrl + "/InstantMessage/GetMessages2", { withCredentials: true });
    return seq;
  }
  getMessages3(receiveGoodsDetailId) {
    let paras = new HttpParams()
      .set("receiveGoodsDetailId", receiveGoodsDetailId);
    let seq = this.http.get<any>(apiUrl + "/InstantMessage/GetMessages3", { withCredentials: true, params: paras });
    return seq;
  }
}
