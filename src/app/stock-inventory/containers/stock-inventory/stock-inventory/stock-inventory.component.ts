import { Component, Input, OnInit } from '@angular/core';
//import {FormControl, FormGroup, FormArray} from '@angular/forms'; FormControl is a diffrent way of doing it
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms'; // Using Formbuilder is short hand
import { Product } from 'src/app/_models/product';
import { ProductStockService } from 'src/app/_services/product-stock.service';
import { StockValidators } from 'src/app/stock-inventory/containers/stock-inventory/stock-inventory/stock-inventory.validators';
@Component({
  selector: 'app-stock-inventory',
  templateUrl: './stock-inventory.component.html',
  styleUrls: ['./stock-inventory.component.css']
})
export class StockInventoryComponent implements OnInit {
  
  constructor(private _productsService2: ProductStockService , 
    private fb:FormBuilder) { }

  errorMessage:string;
  stockProducts: Product[];
  
   /*form = new FormGroup({
    store:new FormGroup({
      branch:new FormControl(''),
      code:new FormControl(''),
    }), Long hand */
    form = this.fb.group({
      store:this.fb.group ({
        //branch:new FormControl(''), long hand
        //code:new FormControl(''), long hand
        branch:['', [Validators.required,StockValidators.checkBranch]] ,//Form builder short hand
        code:['', Validators.required] , //Form builder short hand
      }),//form group validator, added at the end of the fb.group 
    selector: this.createStock({}),
    stock:this.fb.array([
      this.createStock({product_id:1,quantity:10, name:'test'}),
      this.createStock({product_id:2,quantity:20, name:'test'}),
    ])

  },{validators:StockValidators.checkStockExists})

  createStock(stock){
    return this.fb.group({
      product_id: parseInt(stock.product_id,10) || '',
      quantity: stock.quantity || 10,
      name: stock.name || ''
    });
  }

 

  ngOnInit(): void {
    this.getProducts();

    this.form.get('stock').valueChanges.subscribe(stock => {
      console.log(stock); //do this every time the stock field changes
    });
  }

  getProducts(){
    this._productsService2.getProducts()
    .subscribe(products => { 
      this.stockProducts = products    
  

    },
    error => this.errorMessage = <any>error)
  }
 
  addStock(value){
    const control = this.form.get('stock') as FormArray;
    let stock = {
      product_id:value.productId,
      quantity:this.form.get('selector').value.quantity,
      name:value.productName
    }
    control.push(this.createStock(stock));
  }

  /*
  validateBranch(control: AbstractControl){
    return this._productsService2
            .checkBranchId(control.value)
            .map((response:boolean) =>{
            return response ? null : {unknownBranch:true})
          }
  }
  */

  removeStock({group,index}:{group:FormGroup,index:number}){
    const control = this.form.get('stock') as FormArray;
    control.removeAt(index);
    console.log(group, index) 
  }

  onSubmit(){
    console.log("submit", this.form.value);
  }

  selectedItem(value)
  {
    console.log(value);
  }
}
