import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from 'src/app/_models/product';

@Component({
  selector: 'app-stock-selector',
  templateUrl: './stock-selector.component.html',
  styleUrls: ['./stock-selector.component.css']
})
export class StockSelectorComponent implements OnInit {
  @Input()
  parent: FormGroup;

  @Input()
  stockProducts: Product[];
   // parent form group

   @Output()
   added = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onAdd(){
    this.added.emit(this.parent.get('selector').value.product_id);
    this.parent.get('selector').reset({// reset changes the dom back to pristine, where set and patch value wont
      product_id:'',
      quantity:10,
      name:''
    });
    /*
    this.parent.get('selector').setValue({ //updates mulitple controls at once, must have the keyand the value
      product_id:'',
      quantity:10
    });
    this.parent.get('selector').patchValue({//used to update a single control
      product_id:''
    });
    */
  }
  get stockExists(){ //creates a property on the class called invalid to be used as a flag 
    return (
      this.parent.hasError('stockExists') &&
      this.parent.get("selector.product_id").dirty
      ); // dirty makes sure the user has entered something
  }

  get notSelected(){
    return (
      !this.parent.get('selector.product_id').value
      );
  }
  selectedItem($event){
    console.log($event);
  }
}
