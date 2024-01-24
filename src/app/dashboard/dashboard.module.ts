import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../shared/material/material.module';
import { DashboardService } from './dashboard.service';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { ConversionPipe } from '../_pipes/conversion.pipe';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';

const routes:Routes =[
  {path: 'dashboard', component:DashboardComponent}
]

@NgModule({
  declarations: [
    DashboardComponent,
    NavComponent,
    ConversionPipe
  ],
  providers:[DashboardService],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule
  ],
  exports:[
    DashboardComponent,
    NavComponent
  ]
})
export class DashboardModule { }
