
import { Injectable } from '@angular/core';
import { Api } from '../api/api';

/*
  Generated class for the CalculationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CalculationProvider {

  constructor(public api: Api) {
    console.log('Hello CalculationProvider Provider');
  }
  getModeOfTransportList(){
    let seq= this.api.get("common/GetModeOfTransportList",null,{
      withCredentials:true,
      responseType:"json"
    });
    return seq;
  }
  calculate(form){
    let data=JSON.stringify(form);
    console.log(data);
    let seq=this.api.post("Calculation/Calculate",data,{
      headers:{
        "content-type":"application/json"
      },
      withCredentials:true,
      responseType:"json"
    });
    return seq;
  }
  getVolumetricDivisorList(){
    let seq= this.api.get("common/GetVolumetricDivisorList",null,{
    
      withCredentials:true,
      responseType:"json"
    })
    return seq;
  }
}
