import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../globals';

/*
  Generated class for the DeliveryRecordDetailProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DeliveryRecordDetailProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DeliveryRecordDetailProvider Provider');
  }
  getDetail(isLink:boolean, id){
    if(isLink)
      return this.getDetail2(id);
    else
      return this.getDetail1(id);
  }
  private getDetail1(id){
    let paras=new HttpParams()
    .set("id",id);
    let seq= this.http.get(apiUrl+"/DeliveryRecord/Detail",{ withCredentials:true,params:paras});
    return seq;
  }
  private getDetail2(id){
    let paras=new HttpParams()
    .set("id",id);
    let seq= this.http.get(apiUrl+"/DeliveryRecord/Detail1",{ withCredentials:true,params:paras});
    return seq;
  }
}
