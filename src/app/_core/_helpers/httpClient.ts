import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions, RequestMethod, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';

//TO-DO: buscar la forma de agregar un header con el token en CORS requests

@Injectable()
export class HttpClient {

  constructor(private http: Http) {}

  /**
   * Not working on CORS request
   */
  createAuthorizationHeader(headers: Headers) {
    
    if(headers == null)
        headers = new Headers();

    let token = localStorage.getItem('currentUser');
    headers.append('x-access-token', token);

  }



  /**
   * Por ahora el token de validación es enviado como parametro.( no esta tan mal)
   */
  get(url, params : URLSearchParams, headers) {
   
    if(params == null) 
        params = new URLSearchParams();

    params.set('token', localStorage.getItem('currentUser'));
   
    let options1 = new RequestOptions( {method: RequestMethod.Get, headers: headers, search: params });

  
    return this.http.get(url,options1);

  }
  
  /**
   * Por ahora el token de validación es enviado como parte del body.( no esta tan mal)
   */
  post(url, body, headers) {
    
    if(headers == null)
       headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    
    let options = new RequestOptions( {method: RequestMethod.Post, headers: headers });
    
    if(body == null)
        body = new URLSearchParams();
    body.set('token', localStorage.getItem('currentUser'));
  
    return this.http.post(url, body, options);

  }
}