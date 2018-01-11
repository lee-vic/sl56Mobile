import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../globals';
import { PriceInfoList } from '../../models/price.model';

/*
  Generated class for the PriceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PriceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PriceProvider Provider');
  }
  getList(pageIndex){
    let paras=new HttpParams()
    .set("pageIndex",pageIndex)
    let seq= this.http.get<PriceInfoList> (apiUrl+"/Price/GetList",{ withCredentials:true,params:paras});
    return seq;
  }
}
