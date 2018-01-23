import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubAccount } from '../../models/sub-account.model';
import { apiUrl } from '../../globals';

/*
  Generated class for the SubAccountProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SubAccountProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SubAccountProvider Provider');
  }
  getList(){
    let seq= this.http.get<Array<SubAccount>>(apiUrl+"/SubAccount/GetList",{ withCredentials:true});
    return seq;
  }
  detail(id){
    let paras=new HttpParams()
    .set("id",id);
    let seq= this.http.get<SubAccount>(apiUrl+"/SubAccount/Detail",{ withCredentials:true,params:paras});
    return seq;
  }
  edit(data:SubAccount){
   
    let seq= this.http.post(apiUrl+"/SubAccount/Edit",data,{ withCredentials:true});
    return seq;
  }
  create(data:SubAccount){
    let seq= this.http.post<SubAccount>(apiUrl+"/SubAccount/Create",data,{ withCredentials:true});
    return seq;
  }
  delete(id){
    let paras=new HttpParams()
    .set("id",id);
    let seq= this.http.get(apiUrl+"/SubAccount/Delete",{ withCredentials:true,params:paras});
    return seq;
  }
}
