import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //template: `<router-outlet></router-outlet>`,
  //template: `<router-outlet>(activate)="activate($event)" (deactivate)="deactivate($event)"</router-outlet>`, //do something on activate and deactivate
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Nwapp';
}
