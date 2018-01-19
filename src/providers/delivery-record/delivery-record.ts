import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { deliveryRecord } from '../../models/delivery-record.model';
import { apiUrl } from '../../globals';


/*
  Generated class for the DeliveryRecordProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DeliveryRecordProvider {
  
  constructor(public http: HttpClient) {
    console.log('Hello DeliveryRecordProvider Provider');
  }
  private getList(pageIndex){
    let paras=new HttpParams()
    .set("pageIndex",pageIndex);
    let seq= this.http.get<Array<deliveryRecord>>(apiUrl+"/DeliveryRecord/GetList",{ withCredentials:true,params:paras});
    return seq;
  }
  private searchList(pageIndex,key){
    let paras=new HttpParams()
    .set("pageIndex",pageIndex)
    .set("key",key);
    let seq= this.http.get<Array<deliveryRecord>>(apiUrl+"/DeliveryRecord/SearchList",{ withCredentials:true,params:paras});
    return seq;
  }
  loadList(pageIndex,key:string){

    if(key&&key.trim() != ''){
      return this.searchList(pageIndex,key.toUpperCase());
    }
    else{
      return this.getList(pageIndex);
    }
  }
}
