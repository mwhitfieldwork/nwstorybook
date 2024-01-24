import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, tap, map } from 'rxjs/operators';
import {User} from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  prodURL:string  = 'http://localhost:57709/Login'
  url: string = 'http://localhost:54133/Login';

  nwDataChanged:BehaviorSubject<any>;
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private _http:HttpClient) {
    this.nwDataChanged = new BehaviorSubject([]);
   }

   LoginFromAPI(user: User): Observable<any> {

    let response  = this._http.post(this.prodURL, JSON.stringify(user), this.httpOptions)
    .pipe(map(response => response),
    catchError(this.handleError), /*tap(response => console.dir(response))*/)
    return response;  
  
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }

}
