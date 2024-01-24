import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url: string = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid={6058e284fb07aade3f087f4be91df085}';
  constructor(private _http:HttpClient) { }

  getweatherData():Observable<any> {
    var response = this._http.get<any>(this.url)
    .pipe(
      tap(items => {
        console.log(items)
      }),
      catchError(this.handleError),
    )
    return response
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }
}
