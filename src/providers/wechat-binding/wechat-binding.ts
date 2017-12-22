import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../globals';

/*
  Generated class for the WechatBindingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WechatBindingProvider {

  constructor(public http: HttpClient) {
    console.log('Hello WechatBindingProvider Provider');
  }
  getList(){
    let seq= this.http.get(apiUrl+"/WeChatBind/GetData",{ withCredentials:true});
    return seq;
  }
  delete(id){
    let paras=new HttpParams()
    .set("id",id);
    let seq= this.http.get(apiUrl+"/WeChatBind/Delete",{ withCredentials:true,params:paras});
    return seq;
  }

}
