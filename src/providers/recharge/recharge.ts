import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../globals';
import { UnifiedOrderResult } from '../../models/unified-order-result.model';
import { RechargeInfo } from '../../models/recharge.model';

/*
  Generated class for the RechargeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RechargeProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RechargeProvider Provider');
  }
  pay(data:any){
    let seq= this.http.post<UnifiedOrderResult>(apiUrl+"/Recharge/Deposit",data,{ withCredentials:true});
    return seq;
  }
  getList(){
    let seq= this.http.get<Array<RechargeInfo>>(apiUrl+"/Recharge/GetList",{ withCredentials:true});
    return seq;
  }
  // pay1(data:any){
  //   let seq= this.http.post<UnifiedOrderResul>(apiUrl+"/Recharge/Deposit1",data,{ withCredentials:true});
  //   return seq;
  // }
}
