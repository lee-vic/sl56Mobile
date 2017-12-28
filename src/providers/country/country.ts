import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../../globals';

/*
  Generated class for the CountryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CountryProvider {

  constructor(private http: HttpClient) {
    console.log('Hello CountryProvider Provider');
  }
  getCoutryList(){
    let seq= this.http.get(apiUrl + "/common/GetCountryList",{
      withCredentials:true,
      responseType:"json"
    });
    return seq;
  }
}
