import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'checkbox-view',
  template: `
  <div style="text-align: center;">
  <nb-checkbox [(checked)]="checked" (checkedChange)="toggle($event)"></nb-checkbox>
  </div>
  `,
})
export class CheckBoxViewComponent implements ViewCell, OnInit {
    checked:boolean;

    @Input() value:string;
    @Input() rowData: any;

    @Output() checkEvent: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        this.checked=JSON.parse(this.value);
    }
    
    toggle(checked: boolean) {
        this.checked = checked;

        this.checkEvent.emit({rowData:this.rowData, checked:this.checked});
    }
}