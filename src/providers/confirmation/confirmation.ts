
import { Injectable } from '@angular/core';
import { Api } from '../api/api';

/*
  Generated class for the ConfirmationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfirmationProvider {

  constructor(public api: Api) {
    console.log('Hello ConfirmationProvider Provider');
  }
  getReceiveGoodsDetailList(){
    let seq= this.api.get("Confirmation/GetReceiveGoodsDetailList",null,{
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
    let seq= this.api.post("Confirmation/Confirm",data,{
      headers:{
        "content-type":"application/json"
      },
      withCredentials:true,
      responseType:"json"
    });
    return seq;
  }
}
