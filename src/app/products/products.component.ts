import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ProductsService }from './products.service';
import {Product} from '../_models/product';

//dialog 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog'
import {FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray} from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

//import 'rxjs/add/operator/filter';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = [
    'displayName',
    'quantity',
    'price',
    'discontinued',
    'rating',
    'edit',
    'delete'
  ];


  products$: Observable<Product[]>;
  dataSource: MatTableDataSource<Product> = new MatTableDataSource();
  errorMessage:any;
  productID:number;
  stars:string[] = [];
  index:number
  starList:any[]  = [];

  constructor(private _productsService: ProductsService, public dialog: MatDialog, private router:Router) { }

  ngOnInit(): void {
    this.products$ = this.getProducts();
    /*
    this.getProducts();
    this.router.events
    //.filter(event => event instanceof NavigationEnd) // this subscribe only gets called when it is a navigtion end event
    .subscribe(
      (event) => {
        console.log('events', event);       // tracks the router events
       // if(event instanceof NavigationEnd){
          //console.log(event);
        //}
      }
    )
    */
  }

  /*
  this is an example of the nature of the observer/observable pattern
  the observer ahs 3 callbacks which can be called on the subscriber menthod 
  of the observable as well

  const observer = {
    next: value => console.log('next', value),
    error: error => console.log('error', error),
    complete: () => console.log('complete!')
  };

  const observable = new Observable(subscriber => {
      subscriber.next('Hello');
      subscriber.next('World');
      subscriber.complete();
  });
  */
  ngAfterViewInit() {
    this.products$.subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  /*
  getProducts(){
    this._productsService.getProducts().pipe(
      map(products => {
        return products.filter(product => product.isDeleted == false)
      })
    ).subscribe(products => { // this is the next callback 
      let ratedProducts = this.addRating(products)    
      this.product = ratedProducts;
      this.dataSource = new MatTableDataSource<Product>(ratedProducts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    },
    error => this.errorMessage = <any>error) //this is the error callback
  }
  */

  getProducts(): Observable<Product[]> {
    return this._productsService.getProducts().pipe(
      map(products => this.addRating(products))
    );
  }

  deleteProduct(product:Product){
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '450px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
          this.getProducts();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: this.products$
    });

    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = 500;
    dialogConfig.maxHeight = 500;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed test');
    });
  }

  addRating(products:Product[]){
    products.forEach(x => x.rating = this.getRandomInt(1,100))
    console.log(products)
    return products;
  }

  getRandomInt(min, max):number {
    return parseFloat((Math.random() * (max - min)) + min);
  }

  getStars(score:number){
    let percent = Math.round(score);
    let remainder = 0;
    let LimitOf100PercentRatings = 5;
    let evenDivisorLimit = 4;
    let ratingFullCapacityNumb = 100
    this.stars = [];
    let temp = percent/20;
    let evenDivisors = temp > LimitOf100PercentRatings ? LimitOf100PercentRatings : temp ;
    let moduloRemainder = (((percent % 20) / 20) *100).toString() +'%';
    let modulo = (((percent % 20) / 20) *100);
    
    if(modulo != 0){
      remainder = 5 - evenDivisors;
    }
    
    for(let s=0; s<evenDivisors; s++){
    this.index = s;
      if(s <= evenDivisorLimit){
        this.stars.push('100%');
      }else{
        return this.stars;
      }
    }
    
    
    if(this.index < evenDivisorLimit ){
      this.stars.push(moduloRemainder);
    }
    
    if(modulo < ratingFullCapacityNumb && this.stars.length < 5){
    let otherstars = LimitOf100PercentRatings - this.stars.length;
      for(let m=0; m<otherstars; m++){
      this.stars.push('0%')
      }
    }
    this.starList.push(this.stars);
    return this.stars;
    }
    
    getFill(i){
    return 'url(#F1g' + i + ')';
    }

    selectedItem(value){
      console.log(value);
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.html',
})
export class DialogOverviewExampleDialog implements OnInit{
  customerForm: FormGroup;
  errorMessage:any;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private _productsService: ProductsService,
    @Inject(MAT_DIALOG_DATA) public data:any, private fb:FormBuilder) {}

    ngOnInit(){}

    exit(){
      this.dialogRef.close();
    }

    deleteProduct(){
      this._productsService.deleteProduct(this.data.productId)
      this.dialogRef.close(); 
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
