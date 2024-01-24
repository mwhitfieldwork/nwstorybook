import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stock-products',
  templateUrl: './stock-products.component.html',
  styleUrls: ['./stock-products.component.css']
})
export class StockProductsComponent implements OnInit {
  @Input()
  parent:FormGroup; // parent form group

  @Output()
  removed = new EventEmitter<any>();
  get stocks() {
    return (this.parent.get('stock') as FormArray).controls;
  }
  
  constructor() { }

  ngOnInit(): void {
  }
  remove(group, index){
    this.removed.emit({group, index});
  }
}
