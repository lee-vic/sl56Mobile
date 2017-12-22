import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../globals';

/*
  Generated class for the WechatPayListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WechatPayListProvider {

  constructor(public http: HttpClient) {
    console.log('Hello WechatPayListProvider Provider');
  }
  getList(startDate,endDate){
    let paras=new HttpParams()
    .set("startdate",startDate)
    .set("enddate",endDate)
    let seq= this.http.get(apiUrl+"/WeChatPay/History",{ withCredentials:true,params:paras});
    return seq;
  }
}
