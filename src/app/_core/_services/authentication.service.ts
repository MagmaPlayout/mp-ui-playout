import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    headers : Headers;
    constructor(private http: Http) { 

        this.http = http;    
        

    }

    login(username: string, password: string) {
        
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        let options = new RequestOptions( {method: RequestMethod.Post, headers: headers });
        
        let body = new URLSearchParams();
        body.set('username', username);
        body.set('password', password);
        
        return this.http.post('http://localhost:8080/api/authenticate', body, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response               
                let user = response.json();
                
                if (user.token) {
                    
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', user.token);
                }
                else{
                    throw new Error("Authentication failed. Username or password is incorrect.");
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}