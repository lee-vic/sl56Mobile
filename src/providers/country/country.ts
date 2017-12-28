import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    let seq= this.http.get("common/GetCountryList",{
      withCredentials:true,
      responseType:"json"
    });
    return seq;
  }
}
