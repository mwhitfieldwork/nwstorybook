import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { InMemoryWebApiModule} from 'angular-in-memory-web-api';
import { ProductData } from './data/db';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

import { ProductsModule } from './products/products.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginModule } from './login/login.module';
import { SharedComponentsModule } from './_components/components.module';
import { StockInventoryModule } from './stock-inventory/stock-inventory.module';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

const routes : Routes =  [
  /*{path:'login',
  loadChildren: './login/login.module#LoginModule'},*/
  {path:'products',
  loadChildren: './products/products.module#ProductsModule'},
  {path:'dashboard',
  loadChildren: './dashboard/dashboard.module#DashboardModule'},
  {path:'', redirectTo:'/dashboard', pathMatch:'full'},
  {path:'restock',
  loadChildren: './stock-inventory/stock-inventory.module'}
]


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    //RouterModule.forRoot(routes, {enableTracing: true}), //prints out all of the routes to the console for debugging
    RouterModule.forRoot(routes),
    InMemoryWebApiModule.forRoot(ProductData,{ dataEncapsulation: false,
      passThruUnknownUrl: true }),
    ProductsModule,
    DashboardModule,
    LoginModule,
    SharedComponentsModule,
    StockInventoryModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule

  ],
  providers: [],
  exports: [SharedComponentsModule],
  bootstrap: [AppComponent],
})
export class AppModule { }
