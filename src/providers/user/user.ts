
import { Injectable } from '@angular/core';
import { Api } from '../api/api';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class User {

  constructor(public api: Api) {
    console.log('Hello UserProvider Provider');

  }
  auth(form: any) {
    let data=JSON.stringify(form);
    let seq= this.api.post("account/logon2", data,{
      headers:{
        "content-type":"application/json"
      },
      withCredentials:true,
      responseType:"text"
    }
  );
    
      return seq;

  }


}
