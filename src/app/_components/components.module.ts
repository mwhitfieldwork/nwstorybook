import { NgModule } from '@angular/core';
import { SelectorbyobjectComponent } from './selector/selectorbyobject/selectorbyobject.component';
import { SelectorbyindexComponent } from './selector/selectorbyindex/selectorbyindex.component';

@NgModule({
  declarations: [
    SelectorbyobjectComponent,
    SelectorbyindexComponent,
  ],
  imports: [],
  providers: [],
  exports:[SelectorbyobjectComponent,SelectorbyindexComponent]
})
export class SharedComponentsModule { }