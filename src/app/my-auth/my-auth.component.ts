import { Component } from '@angular/core';

import { SpinnerService } from '../@core/utils/spinner.service';

@Component({
  selector: 'app-my-auth',
  styleUrls: ['my-auth.component.scss'],
  template: `
    <nb-layout windowMode>
        <nb-layout-column [nbSpinner]="isloading" nbSpinnerSize="giant" nbSpinnerStatus="primary">
          <div class="auth-container">
            <router-outlet></router-outlet>
          </div>
        </nb-layout-column>
    </nb-layout>
  `,
})
export class MyAuthComponent {
  isloading:any=false;

  constructor(private spinnerService: SpinnerService){
    this.spinnerService.loading.subscribe(res => this.isloading=res);
  }
}