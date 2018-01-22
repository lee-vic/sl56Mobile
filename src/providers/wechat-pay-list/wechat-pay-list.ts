import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../globals';
import { WechatPay } from '../../models/wechat-pay.model';

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
  getList(pageIndex){
    let paras=new HttpParams()
    .set("pageIndex",pageIndex)
    let seq= this.http.get<Array<WechatPay>>(apiUrl+"/WeChatPay/History",{ withCredentials:true,params:paras});
    return seq;
  }
}
