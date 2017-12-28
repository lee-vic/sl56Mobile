
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


/*
  Generated class for the RemoteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RemoteProvider {

  constructor(private http: HttpClient) {
    console.log('Hello RemoteProvider Provider');
  }
  getModeOfTransportTypeList(){
    let seq= this.http.get("common/GetModeOfTransportTypeList",{ withCredentials:true});
    return seq;
  }
  Query(formValue){
    let seq= this.http.post("Remote/Query", formValue,{ withCredentials:true});
    return seq;
  }
}
