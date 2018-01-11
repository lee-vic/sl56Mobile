
import { Injectable } from '@angular/core';
import { apiUrl } from '../../globals';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ForgotPassword } from '../../models/forgot-password.model';
import { ResetPassword } from '../../models/reset-Password.model';

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
  forgotPassword(account:string){
    let paras=new HttpParams()
    .set("account",account)
    let seq = this.http.get<ForgotPassword>(apiUrl + "/Account/ForgotPassword", { withCredentials: true,params:paras});
    return seq;
  }
  getCode(form:ForgotPassword){
    let data = JSON.stringify(form);
    let seq = this.http.post<ForgotPassword>(apiUrl + "/account/SendCode", data, {
      headers: {
        "content-type": "application/json"
      },
      withCredentials: true
    })
    return seq;
  }
  forgotPassword1(form:ForgotPassword){
    let data = JSON.stringify(form);
    let seq = this.http.post<ForgotPassword>(apiUrl + "/account/ForgotPassword1", data, {
      headers: {
        "content-type": "application/json"
      },
      withCredentials: true
    })
    return seq;
  }
  forgotPassword2(form:ForgotPassword){
    let data = JSON.stringify(form);
    let seq = this.http.post<ForgotPassword>(apiUrl + "/account/ForgotPassword2", data, {
      headers: {
        "content-type": "application/json"
      },
      withCredentials: true
    })
    return seq;
  }
  resetPassword(form:ResetPassword){
    let data = JSON.stringify(form);
    let seq = this.http.post<ResetPassword>(apiUrl + "/account/ResetPassword", data, {
      headers: {
        "content-type": "application/json"
      },
      withCredentials: true
    })
    return seq;
  }
}
