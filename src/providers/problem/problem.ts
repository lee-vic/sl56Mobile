import { HttpClient } from '@angular/common/http';
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
  getList(){
   
    let seq= this.http.get<Array<Problem>> (apiUrl+"/Problem/GetList",{ withCredentials:true});
    return seq;
  }

}
