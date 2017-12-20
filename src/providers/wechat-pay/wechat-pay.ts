import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../globals';
import { deliveryRecord } from '../../models/delivery-record.model';

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
  getList(){
   
    let seq= this.http.get(apiUrl+"/WeChatPay/Query",{ withCredentials:true});
    return seq;
  }
}
