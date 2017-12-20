import { Injectable } from '@angular/core';
import { Api } from '../api/api';

/*
  Generated class for the CountryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CountryProvider {

  constructor(public api: Api) {
    console.log('Hello CountryProvider Provider');
  }
  getCoutryList(){
    let seq= this.api.get("common/GetCountryList", null,{
      withCredentials:true,
      responseType:"json"
    });
    return seq;
  }
}
