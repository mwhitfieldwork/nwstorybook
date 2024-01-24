import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-selectorbyindex',
  templateUrl: './selectorbyindex.component.html',
  styleUrls: ['./selectorbyindex.component.css']
})
export class SelectorbyindexComponent implements OnInit {

@Input() collection;
@Output() selectedObject = new EventEmitter<any>();
@Input() parent:FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.parent
  }


  selectedItem($event){
    let item = this.collection[parseInt($event)];
    this.selectedObject.emit(item);
  }


}
