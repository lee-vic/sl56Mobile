import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Template } from '../../models/template.model';
import { apiUrl } from '../../globals';

/*
  Generated class for the TemplateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TemplateProvider {

  constructor(public http: HttpClient) {
    console.log('Hello TemplateProvider Provider');
  }
  getList(pageIndex){
    let paras=new HttpParams()
    .set("pageIndex",pageIndex)
    let seq= this.http.get<Array<Template>> (apiUrl+"/Template/GetList",{ withCredentials:true,params:paras});
    return seq;
  }
}
