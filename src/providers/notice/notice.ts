import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../globals';
import { Notice } from '../../models/notice.model';

/*
  Generated class for the NoticeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NoticeProvider {

  constructor(public http: HttpClient) {
    console.log('Hello NoticeProvider Provider');
  }

  getNewsList(categoryId,pageIndex){
    let paras=new HttpParams()
    .set("categoryId",categoryId)
    .set("pageIndex",pageIndex)
    let seq= this.http.get<Array<Notice>> (apiUrl+"/Notice/GetData",{ withCredentials:true,params:paras});
    return seq;
  }
  getNoticeList(pageIndex){
    let paras=new HttpParams()
    .set("pageIndex",pageIndex)
    let seq= this.http.get<Array<Notice>> (apiUrl+"/Notice/GetList",{ withCredentials:true,params:paras});
    return seq;
  }
  getDetail(id){
    let paras=new HttpParams()
    .set("id",id)
    let seq= this.http.get<Notice> (apiUrl+"/Notice/Detail",{ withCredentials:true,params:paras});
    return seq;
  }
}
