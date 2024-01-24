import { AbstractControl } from "@angular/forms";

export class StockValidators{
    static checkBranch(control:AbstractControl){// each control inherits from AbstractControl
        const regex = /^[a-z]\d{3}$/i; //checks letter followed by 3 numbers
        const valid = regex.test(control.value);// if contorl.value is valid
        return valid ? null : {invalidBranch:true}; //if its valid ruturn null if not add a property to the vlaidation object
    }

    static checkStockExists(control:AbstractControl){
        const stockItem = control.get('stock');
        const selector = control.get('selector');

        if(!(stockItem && selector))  return null;
           
        const exists = stockItem.value.some(stock => {
            return stock.product_id === parseInt(selector.value.product_id, 10)});
        return exists ? {stockExists:true} : null;
        
    }
}