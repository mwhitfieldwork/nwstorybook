import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const COUUNTER_CONTROL_ACCESSOR = { //this can also be set in the the providers as an object
                                    //but, we are extracting it into a constant for possible reuse
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StockCounterComponent),
  multi: true,//we are extending the control value acco  
}



@Component({
  selector: 'app-stock-counter',
  providers: [COUUNTER_CONTROL_ACCESSOR],
  templateUrl: './stock-counter.component.html',
  styleUrls: ['./stock-counter.component.css']
})
export class StockCounterComponent implements OnInit , ControlValueAccessor {
  private onTouch:Function;
  private onModelChange:Function;

  writeValue(obj: any): void { // inherits the value from the createStock function in stock inventory class
    this.value = obj || 0;
  }
  
  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  @Input()step: number = 10;
  @Input() min = 10;
  @Input() max = 1000;

  value: number = 10;
  focus:boolean;

  onKeyDown(event: KeyboardEvent){
    const handlers = {
      ArrowDown:() => this.decrement(),
      ArrowUp:() => this.increment(),
    };

    if(handlers[event.code]){
      handlers[event.code](); //calls the increment or decrement function based on the event code
      event.preventDefault();
      event.stopPropagation();
    }
    this.onTouch() // if the user presses a key that is not the up or down arrow
  }

  onBlur(event: FocusEvent){
    this.focus = false;
    event.preventDefault();
    event.stopPropagation();
    this.onTouch();
  }

  onFocus(event: FocusEvent){
    this.focus = true;
    event.preventDefault();
    event.stopPropagation();
    this.onTouch();
  }

  constructor() { }

  ngOnInit(): void {
  }

  increment(): void {
    if (this.value < this.max){
      this.value += this.step;
      this.onModelChange(this.value); //alllows to update the form model
    }
    this.onTouch();
  }
  decrement(): void {
    if (this.value > this.min){
     this.value -= this.step;
     this.onModelChange(this.value);
    }
    this.onTouch(); // allows us to set the form state ( pristine to dirty)
  }

}
