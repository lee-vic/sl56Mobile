
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    let seq= this.http.get("Confirmation/GetReceiveGoodsDetailList",{
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
    let seq= this.http.post("Confirmation/Confirm",data,{
      headers:{
        "content-type":"application/json"
      },
      withCredentials:true,
      responseType:"json"
    });
    return seq;
  }
}
