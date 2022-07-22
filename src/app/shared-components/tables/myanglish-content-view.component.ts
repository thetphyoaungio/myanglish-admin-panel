import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'myanglish-content-view',
  template: `
  <div>
    <ng-container *ngIf="myanglishWords">
        <label *ngFor="let item of myanglishWords; let idx=index;">
            {{item.wordmyanglish}}<span *ngIf="idx < (myanglishWords.length - 1)">,&nbsp;</span>
        </label>
        
    </ng-container>
  </div>
  `,
})
export class MyanglishContentViewComponent implements ViewCell, OnInit {
  myanglishWords:Array<any> | any;

  @Input() value:string|any;
  @Input() rowData: any;

  ngOnInit() {
    const {myanglishWords } = this.value;
    
    this.myanglishWords = myanglishWords;
  }
}