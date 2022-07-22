import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { DatePipe } from '@angular/common';

import { DefaultFilter } from 'ng2-smart-table';

@Component({
  template: `
    <input
      nbInput
      placeholder="Date"
      format="yyyy-MM-dd"
      [nbDatepicker]="formcontrol"
      [formControl]="inputControl"
      (click)="setValidDate()"
    />
    <nb-datepicker #formcontrol></nb-datepicker>
  `,
})
export class SPTCustomDateFilterComponent
  extends DefaultFilter
  implements OnInit, OnChanges
{
  inputControl = new FormControl();

  constructor(private datePipe: DatePipe) {
    super();
  }

  ngOnInit() {
    this.inputControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(this.delay),
      )
      .subscribe((value: number) => {
        if(!value){ this.setValidDate()}
        
        this.query = value ? this.datePipe.transform(
          new Date(this.inputControl.value),
          'mediumDate'
        ) : '';
        this.setFilter();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.query) {
      this.query = changes.query.currentValue;
      this.inputControl.setValue(this.query);
    }
  }

  setValidDate(){
    this.inputControl.setValue(null);
  }
}
