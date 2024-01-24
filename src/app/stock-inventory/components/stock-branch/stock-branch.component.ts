import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stock-branch',
  templateUrl: './stock-branch.component.html',
  styleUrls: ['./stock-branch.component.css']
})
export class StockBranchComponent {
  @Input()
  parent:FormGroup; // parent form group
  
  constructor() { }

  get invalid(){ //creates a property on the class called invalid to be used as a flag 
    return (
      this.parent.get('store.branch').hasError('invalidBranch') &&
      this.parent.get('store.branch').dirty  && // dirty makes sure the user has entered something
      !this.required('branch') //if the branch passes the required validator
    ); //set the invalid property to true or false based on the custom validator 
  }
  

  required(name:string){
    return (
      this.parent.get(`store.${name}`).hasError('required') && 
      this.parent.get(`store.${name}`).touched
    )
  }

}
