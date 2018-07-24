import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../globals';
import { UnifiedOrderResult } from '../../models/unified-order-result.model';


/*
  Generated class for the WechatPayProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WechatPayProvider {

  constructor(public http: HttpClient) {
    console.log('Hello WechatPayProvider Provider');
  }
  getList(openid){
    let paras=new HttpParams()
    .set("openId",openid);
    let seq= this.http.get(apiUrl+"/WeChatPay/Query",{ withCredentials:true,params:paras});
    return seq;
  }
  pay(data){
    let seq= this.http.post<UnifiedOrderResult>(apiUrl+"/WeChatPay/Pay",data,{ withCredentials:true});
    return seq;
  }
}
