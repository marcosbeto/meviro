import {Injectable, NgZone} from '@angular/core'; 
import {AuthHttp, tokenNotExpired} from 'angular2-jwt';
import { Headers, Http } from '@angular/http';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import { Router} from '@angular/router';

import { OpenProject } from '../../open-project/models/open-project.model';

declare var Auth0Lock: any;

@Injectable() //Pattern for services definition
export class AuthService {
  
  lock = new Auth0Lock('4QMLPQJSeLjkv51nitcN8rWjwTu9YgBK', 'meviro.auth0.com', {}); //Auth0 Setup
  private metaUserUrl = 'http://localhost:8000/meta-users/';  // Web API URL
  
  user: Object;
  zone: NgZone;
  router: Router;
  headers = new Headers();
  private subjectLogin: Subject<Object> = new Subject<Object>();
  private subjectLogout: Subject<Object> = new Subject<Object>();

  constructor(private authHttp: AuthHttp, zone: NgZone, router: Router, private http: Http) {
    this.zone = zone;
    this.user = JSON.parse(localStorage.getItem('profile'));
    this.router = router;
    
    if (localStorage.getItem('id_token')) {
      this.createAuthorizationData(localStorage.getItem('id_token'));
    }
  }

  public authenticated() {
    return tokenNotExpired(); // Check if there's an unexpired JWT. It searches for an item in localStorage with key == 'id_token'
  }

  public login() {
    // Show the Auth0 Lock widget  
    this.lock.show({user_metadata: {
        api_user_id: "12",
    }}, (err: string, profile: string, token: string) => {
    
      if (err)
        return false;
      
      this.user = profile; //Setting the user according to response
      this.createAuthorizationData(token);
      localStorage.setItem('profile', JSON.stringify(profile)); //Saving user profile to local storage

      this.zone.run(() =>  { // Force angular to execute the Change Detection:
         this.subjectLogin.next(this.user);// Event Trigger
      }); 
    });
  }

  public logout() {
        
    this.deleteAuthorizationData();
    localStorage.removeItem('profile');

    this.zone.run(() => {
        this.user = null;
        this.subjectLogout.next(null);
      }); //says to angular to execute the Change Detection
  }

  public isRegistered(user: any) {

    let body = {"email":user.email};

    return this.http.post(this.metaUserUrl, body, {
      headers: this.headers
    })
    .map((responseData) => {
      if (JSON.parse(responseData.json()).length > 0) 
          return true;
      return false;
    });    
  }

  public saveMetaUser(user: any) {
    
    let body = {"email":user.email, "auth0_id": user.user_id};

    return this.http.post(this.metaUserUrl + "add/" , body, {
      headers: this.headers
    })
    .map((responseData) => {
      let data = responseData.json();
      return data.id
    });  
  }

  public updataUserMetadata(api_user_id: number, user: any) {
    
    let headerMetadata = new Headers();
    let user_auth0_api_url = "https://meviro.auth0.com/api/v2/users/";
    let body = {
      "user_metadata": {
        "api_user_id": api_user_id        
      }
    }   

    headerMetadata.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ2aGFWV0ZRZmJJRVc5TWxiR1JVZUwxVWdrcTZLbHhRTSIsInNjb3BlcyI6eyJ1c2VycyI6eyJhY3Rpb25zIjpbInVwZGF0ZSJdfX0sImlhdCI6MTQ2ODQ1NjE1MSwianRpIjoiZDU0ZmVjOWQ5MTg1ZWRhMzUxYzk5NjE0NjY4NWRhMDEifQ.IiO1qZyAy4KqCmqaPyhoaWHiPBqwT3DcHrU2OMiQz4A');
    headerMetadata.append('Content-Type', 'application/json');

    return this.http.patch(
      user_auth0_api_url + user.user_id, 
      body, 
      {headers: headerMetadata}
    );
  }

  public createAuthorizationData(token: string) {

    if (!localStorage.getItem('id_token'))
      localStorage.setItem('id_token', token);
    
    this.headers.append('Authorization', 'JWT ' + token);
  }

  public deleteAuthorizationData() {
    localStorage.removeItem('id_token');
    this.headers.delete('Authorization');
  }

  getLogged(obs:Object): Observable<Object> {
    return this.subjectLogin.asObservable();
  }

  getLoggedOut(obs:Object): Observable<Object> {
    return this.subjectLogout.asObservable();
  }

}