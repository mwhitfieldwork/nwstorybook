import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../_models/product';
import { catchError, tap, map } from 'rxjs/operators'
import { ProductModel } from '../_models/product-model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductStockService {

  url: string = 'https://localhost:7216/Product/';

  nwDataChanged: BehaviorSubject<any>;

  constructor(private _http: HttpClient) {
    this.nwDataChanged = new BehaviorSubject([]);
  }

  getProducts(): Observable<Product[]> {
    var response = this._http.get<Product[]>(this.url)
      .pipe(
        tap(items => {
          this.nwDataChanged.next(items);
          console.log(items)
        }),
        catchError(this.handleError),
      )

    return response
  }

  getProduct(productId: string): Observable<Product> {
    let url = `${this.url}${productId}`;
    var response = this._http.get<Product>(url)
      .pipe(
        tap(item => {
          this.nwDataChanged.next(item);
          console.log(item)
        }),
        catchError(this.handleError),
      )

    return response
  }


  createProduct(product: ProductModel): Observable<Product> {
    let url = `${this.url}AddProduct`;
    let newProduct = JSON.stringify(product)
    var response = this._http.post<Product>(url, newProduct, httpOptions);
      // .pipe(
      //   tap(item => {
      //     this.nwDataChanged.next(item);
      //     console.log(item)
      //   }),
      //   catchError(this.handleError),
      // )
    return response;
  }

  
 //check to see if  a Branch exists - 
 // there is no branches in the database - I might have to create it

 /*
  checkProductId(id:string):Observable<boolean>{
    
    let search = new URLSearchParams();
    //search.set('id',id);
    return this._http
    .get(this.url +id)
    .pipe().map((response : Response) => response.json())
    .map((response : any[]) => !!response.length)
    .catch((error:any) => Observable.throw(error.json))
    
   return 
  }
  */

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }
}
