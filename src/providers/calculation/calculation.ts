
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../../globals';

/*
  Generated class for the CalculationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CalculationProvider {

  constructor(private http: HttpClient) {
    console.log('Hello CalculationProvider Provider');
  }
  getModeOfTransportList(){
    
    let seq=this.http.get(apiUrl + "/common/GetModeOfTransportList",{
      withCredentials:true,
      responseType:"json"
    })
    return seq;
  }
  calculate(form){
    let data=JSON.stringify(form);
    console.log(data);
    let seq=this.http.post(apiUrl + "/Calculation/Calculate",data,{
      headers:{
        "content-type":"application/json"
      },
      withCredentials:true,
      responseType:"json"
    });
    return seq;
  }
  getVolumetricDivisorList(){
    let seq= this.http.get(apiUrl + "/common/GetVolumetricDivisorList",{
      withCredentials:true,
      responseType:"json"
    })
    return seq;
  }
}
