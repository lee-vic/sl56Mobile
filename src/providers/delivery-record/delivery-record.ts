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
  getList(startDate,endDate){
    let paras=new HttpParams()
    .set("startdate",startDate)
    .set("enddate",endDate)
    let seq= this.http.get<Array<deliveryRecord>>(apiUrl+"/DeliveryRecord/Query",{ withCredentials:true,params:paras});
    return seq;
  }
}
