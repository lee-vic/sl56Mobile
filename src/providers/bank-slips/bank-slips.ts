import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../globals';
import { BankSlips } from '../../models/bank-slips.model';
import { ActionResult } from '../../models/action-result.model';

/*
  Generated class for the BankSlipsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BankSlipsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello BankSlipsProvider Provider');
  }

  upload(form){
    let data=JSON.stringify(form);
    let seq=this.http.post<ActionResult>(apiUrl + "/UploadBankSlips/Upload",data,{
      headers:{
        "content-type":"application/json"
      },
      withCredentials:true,
      responseType:"json"
    });
    return seq;
  }
  getList(pageIndex){
    let paras=new HttpParams()
    .set("pageIndex",pageIndex)
    let seq= this.http.get<Array<BankSlips>> (apiUrl+"/UploadBankSlips/GetList",{ withCredentials:true,params:paras});
    return seq;
  }
  delete(id){
    let paras=new HttpParams()
    .set("id",id);
    let seq= this.http.get<ActionResult> (apiUrl+"/UploadBankSlips/Delete",{ withCredentials:true,params:paras});
    return seq;
  }
}
