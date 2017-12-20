
import { Injectable } from '@angular/core';
import { Api } from '../api/api';

/*
  Generated class for the RemoteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RemoteProvider {

  constructor(public api: Api) {
    console.log('Hello RemoteProvider Provider');
  }
  getModeOfTransportTypeList(){
    let seq= this.api.get("common/GetModeOfTransportTypeList", null);
    return seq;
  }
  Query(formValue){
    let data=JSON.stringify(formValue);
    let seq= this.api.post("Remote/Query", data);
    return seq;
  }
}
