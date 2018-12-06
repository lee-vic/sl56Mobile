import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../globals';
import { Problem } from '../../models/problem.model';

/*
  Generated class for the ProblemProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProblemProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ProblemProvider Provider');
  }
  getList(pageIndex,key){
    let paras=new HttpParams()
    .set("pageIndex",pageIndex)
    .set("key",key);
    let seq= this.http.get<Array<Problem>> (apiUrl+"/Problem/GetList",{ withCredentials:true,params:paras});
    return seq;
  }
  getProblemDetail(receiveGoodsDetailId,problemId){
    let paras=new HttpParams()
    .set("receiveGoodsDetailId",receiveGoodsDetailId)
    .set("problemId",problemId);
    let seq= this.http.get (apiUrl+"/Problem/GetProblemDetail",{ withCredentials:true,params:paras});
    return seq;
  }
  upload(form){
    console.log(form);
    let seq= this.http.post(apiUrl+"/DeliveryRecord/UploadAttachment",form,{ withCredentials:true});
    return seq;
  }
}
