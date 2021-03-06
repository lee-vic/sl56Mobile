import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../globals';

/*
  Generated class for the ReturnProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReturnProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ReturnProvider Provider');
  }
  getList1(pageIndex, key) {
    let paras = new HttpParams()
      .set("pageIndex", pageIndex)
      .set("key", key);
    let seq = this.http.get<Array<any>>(apiUrl + "/Return/GetList1", { withCredentials: true, params: paras });
    return seq;
  }
  getList2() {
    let seq = this.http.get<Array<any>>(apiUrl + "/Return/GetList2", { withCredentials: true });
    return seq;
  }
  getList3() {
    let seq = this.http.get<Array<any>>(apiUrl + "/Return/GetList3", { withCredentials: true });
    return seq;
  }
  apply(idList) {
    let paras = new HttpParams()
      .set("idList", idList);
    let seq = this.http.get<any>(apiUrl + "/Return/Apply", { withCredentials: true, params: paras });
    return seq;
  }
  apply1(data) {
    let seq = this.http.post<any>(apiUrl + "/Return/Apply", data, { withCredentials: true });
    return seq;
  }
  terminate(id) {
    let paras = new HttpParams()
      .set("id", id);
    let seq = this.http.get<any>(apiUrl + "/Return/Terminate", { withCredentials: true, params: paras });
    return seq;
  }
  fill(id) {
    let paras = new HttpParams()
      .set("id", id);
    let seq = this.http.get<any>(apiUrl + "/Return/Fill", { withCredentials: true, params: paras });
    return seq;
  }
  fill1(data) {
    let seq = this.http.post<any>(apiUrl + "/Return/Fill", data, { withCredentials: true });
    return seq;
  }
  applyHistory(){
    let seq = this.http.get<Array<string>>(apiUrl + "/Return/ApplyHistory", { withCredentials: true });
    return seq;
  }
}
