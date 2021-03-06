
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../../globals';
import { deliveryRecord } from '../../models/delivery-record.model';
/*
  Generated class for the ConfirmationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfirmationProvider {

  constructor(private http: HttpClient) {
    console.log('Hello ConfirmationProvider Provider');
  }
  getReceiveGoodsDetailList(){
    let seq= this.http.get<Array<deliveryRecord>>(apiUrl + "/Confirmation/GetReceiveGoodsDetailList",{
      headers:{
        "content-type":"application/json"
      },
      withCredentials:true,
      responseType:"json"
    });
    return seq;
  }
  confirm(selectIdList:string){
   
   let data={"SelectIdList":selectIdList};
    let seq= this.http.post<Array<deliveryRecord>>(apiUrl + "/Confirmation/Confirm",data,{
      headers:{
        "content-type":"application/json"
      },
      withCredentials:true,
      responseType:"json"
    });
    return seq;
  }
}
