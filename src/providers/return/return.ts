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
  getList1(pageIndex,key){
    let paras=new HttpParams()
    .set("pageIndex",pageIndex)
    .set("key",key);
    let seq= this.http.get<Array<any>>(apiUrl+"/Return/GetList1",{ withCredentials:true,params:paras});
    return seq;
  }

}
