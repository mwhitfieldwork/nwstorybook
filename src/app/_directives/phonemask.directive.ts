import { Directive, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[digit-mask]'
})
export class PhonemaskDirective {

  @HostBinding('style.border')
  //@HostBinding('class') calss= 'class1 class2 class3
  border:string

  @HostListener('input', ['$event']) // you can listend to a click or on change as well
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;

    let trimmed = input.value.replace(/\s+/g, '');
    if(trimmed.length > 16) {
      trimmed = trimmed.substr(0, 16);
    }
    let numbers = [];
    for(let i = 0; i < trimmed.length; i+=4) {
      numbers.push(trimmed.substr(i,4));
    }
    input.value = numbers.join(' ');

    this.border = '';
    if(/[^\d]+/.test(trimmed)) {
      this.border = '1px solid red';
    }
  }

  constructor(private element:ElementRef) {
      console.log(this.element);
   }
}
