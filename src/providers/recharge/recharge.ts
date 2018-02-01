import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnifiedOrderResul } from '../../models/unified-order-result.model';
import { apiUrl } from '../../globals';

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
    let seq= this.http.post<UnifiedOrderResul>(apiUrl+"/Recharge/Deposit",data,{ withCredentials:true});
    return seq;
  }
}
