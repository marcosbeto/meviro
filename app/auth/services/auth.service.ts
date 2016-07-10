import {Injectable, NgZone} from '@angular/core'; 
import {AuthHttp, tokenNotExpired} from 'angular2-jwt';
import { Headers, Http } from '@angular/http';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

declare var Auth0Lock: any;

@Injectable() //Pattern for services definition
export class AuthService {
  
  // Configure Auth0
  lock = new Auth0Lock('4QMLPQJSeLjkv51nitcN8rWjwTu9YgBK', 'meviro.auth0.com', {});
  
  user: Object;
  zone: NgZone;
  headers = new Headers();
  private subjectLogin: Subject<Object> = new Subject<Object>();
  private subjectLogout: Subject<Object> = new Subject<Object>();

  constructor(private authHttp: AuthHttp, zone: NgZone) {
    this.zone = zone;
    this.user = JSON.parse(localStorage.getItem('profile'));
    
    if (localStorage.getItem('id_token')) {
      this.createAuthorizationData(localStorage.getItem('id_token'));
    }

  }

  public authenticated() {
    return tokenNotExpired(); // Check if there's an unexpired JWT. It searches for an item in localStorage with key == 'id_token'
  };

  public login() {
    // Show the Auth0 Lock widget
    this.lock.show({}, (err: string, profile: string, token: string) => {
    
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