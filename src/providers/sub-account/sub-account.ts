import { HttpClient } from '@angular/common/http';
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
}
