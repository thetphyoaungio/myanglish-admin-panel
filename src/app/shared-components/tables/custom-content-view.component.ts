import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'content-view',
  template: `
  <div>
    <ng-container *ngIf="myanmarWords">
      <div *ngFor="let item of myanmarWords">
        <div class="d-flex align-items-center">
          <div class="p-2 p-2-1" style="width: 64px;"><span>Unicode</span></div>
          <div class="p-2 p-2-2"> : </div>
          <div class="p-2 p-2-3">{{item.wordunicode}}</div>
        </div> 
        <div class="d-flex align-items-center">
          <div class="p-2 p-2-1" style="width: 64px;"><span>Zawgyi</span></div>
          <div class="p-2 p-2-2"> : </div>
          <div class="p-2 p-2-3">{{item.wordzawgyi}}</div>
        </div>
      </div>
    </ng-container>
  </div>
  `,
  styles:[
    '.p-2-1, .p-2-2, .p-2-3 {margin: 0;}',
  ],
})
export class ContentViewComponent implements ViewCell, OnInit {
  myanmarWords:Array<any> | any;

  @Input() value:string|any;
  @Input() rowData: any;

  ngOnInit() {
    const { myanmarWords } = this.value;
    
    this.myanmarWords = myanmarWords;
  }
}