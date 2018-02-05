import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../globals';
import { registerInfo } from '../../models/registerinfo-model';
import { ActionResult } from '../../models/action-result.model';

/*
  Generated class for the RegisterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RegisterProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RegisterProvider Provider');
  }
  getCode(mobile:string){
    let paras=new HttpParams()
    .set("mobile",mobile)
    let seq = this.http.get<registerInfo>(apiUrl + "/Register/GetCode", { withCredentials: true,params:paras});
    return seq;
  }
  doRegister(mobile:string,code:string,openId:string,unionId:string){
    let paras=new HttpParams()
    .set("mobile",mobile)
    .set("code",code)
    .set("openId",openId)
    .set("unionId",unionId);
    let seq = this.http.get<registerInfo>(apiUrl + "/Register/DoRegister", { withCredentials: true,params:paras});
    return seq;
  }
  bindAccount(customerId,openId,unionId){
    let paras=new HttpParams()
    .set("customerId",customerId)
    .set("openId",openId)
    .set("unionId",unionId);
    let seq = this.http.get<ActionResult>(apiUrl + "/Register/BindAccount", { withCredentials: true,params:paras});
    return seq;
  }
}
