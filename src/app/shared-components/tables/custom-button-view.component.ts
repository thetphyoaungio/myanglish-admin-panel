import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'button-view',
  template: `
  <div style="display:inline-flex;">

    <button *ngIf="title1" nbButton status="info" (click)="onClick1()" style="margin:5px;">{{title1}}</button>

    <button *ngIf="title2" nbButton status="primary" (click)="onClick2()" style="margin:5px;">{{title2}}</button>

    <button *ngIf="title3" nbButton status="danger" (click)="onClick3()" style="margin:5px;">{{title3}}</button>

  </div>
  `,
})
export class ButtonViewComponent implements ViewCell, OnInit {
  title1:string;
  title2:string;
  title3:string;

  @Input() value:string;
  @Input() rowData: any;

  @Output() action1: EventEmitter<any> = new EventEmitter();
  @Output() action2: EventEmitter<any> = new EventEmitter();
  @Output() action3: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    if(this.value.includes('-')){
      const tmp = this.value.split(/[-]/g);
      if(tmp[0]) this.title1=tmp[0].toUpperCase();
      if(tmp[1]) this.title2=tmp[1].toUpperCase();
      if(tmp[2]) this.title3=tmp[2].toUpperCase();
    }else{
      this.title1=this.value.toUpperCase();
    }
  }

  onClick1(){
    this.action1.emit(this.rowData);
  }
  onClick2(){
    this.action2.emit(this.rowData);
  }
  onClick3(){
    this.action3.emit(this.rowData);
  }
}