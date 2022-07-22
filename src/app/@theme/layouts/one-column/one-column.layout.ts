import { Component } from '@angular/core';

import { SpinnerService } from '../../../@core/utils';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode [nbSpinner]="isloading" nbSpinnerSize="giant" nbSpinnerStatus="primary">
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent {
  isloading:any=false;

  constructor(private spinnerService: SpinnerService){
    this.spinnerService.loading.subscribe(res => {
      this.isloading = res;
    });
  }
}
