import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Api {

  url: string = 'http://api.sl56.com/api';
  
     constructor(public http: HttpClient) {
     }
    
     get(endpoint: string, params?: any, reqOpts?: any) {
      if (!reqOpts) {
        reqOpts = {
          params: new HttpParams()
        };
      }
  
      // Support easy query params for GET requests
      if (params) {
        reqOpts.params = new HttpParams();
        for (let k in params) {
          reqOpts.params.set(k, params[k]);
        }
      }
  
      return this.http.get(this.url + '/' + endpoint, reqOpts);
    }
  
    post(endpoint: string, body: any, reqOpts?: any) {
      return this.http.post(this.url + '/' + endpoint, body, reqOpts);
    }
  
    put(endpoint: string, body: any, reqOpts?: any) {
      return this.http.put(this.url + '/' + endpoint, body, reqOpts);
    }
  
    delete(endpoint: string, reqOpts?: any) {
      return this.http.delete(this.url + '/' + endpoint, reqOpts);
    }
  
    patch(endpoint: string, body: any, reqOpts?: any) {
      return this.http.put(this.url + '/' + endpoint, body, reqOpts);
    }

}
