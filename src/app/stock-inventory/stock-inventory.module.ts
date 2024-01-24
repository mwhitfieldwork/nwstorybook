import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StockBranchComponent } from './components/stock-branch/stock-branch.component';
import { StockProductsComponent } from './components/stock-products/stock-products.component';
import { StockSelectorComponent } from './components/stock-selector/stock-selector.component';
import { StockInventoryComponent } from './containers/stock-inventory/stock-inventory/stock-inventory.component';
import { ProductStockService  } from '../_services/product-stock.service';
import { StockCounterComponent } from './components/stock-counter/stock-counter.component';
import { SharedComponentsModule } from '../_components/components.module';

const routes:Routes =[
  {path: 'restock', component:StockInventoryComponent}
]

@NgModule({
  declarations: [StockBranchComponent,
     StockProductsComponent, 
     StockSelectorComponent,
     StockInventoryComponent,
     StockCounterComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedComponentsModule
  ],
  exports: [
    StockBranchComponent,
    StockProductsComponent,
    StockSelectorComponent,
    StockInventoryComponent
  ],
  providers:[ProductStockService ]
})
export class StockInventoryModule { }
