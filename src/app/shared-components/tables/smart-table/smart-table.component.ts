import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent implements OnInit, OnChanges {
  @Input() data;
  @Input() columnSetting;
  @Input() title;
  @Input() hasActions;

  @Input() isRefresh;
  @Input() noHeader;

  /* @Input() page;
  @Input() perPage; */

  /* @Output() createConfirm = new EventEmitter<any>();
  @Output() editConfirm = new EventEmitter<any>();
  @Output() deleteConfirm = new EventEmitter<any>();
  @Output() sourceOnChanged = new EventEmitter<any>(); */

  settings:any = {
    actions: false,
    /* add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    }, */
  };

  source: LocalDataSource = new LocalDataSource();

  constructor() {}

  ngOnInit(){
    if(this.hasActions){
      this.settings.actions = true;
    };
    
    this.settings={...this.settings,...this.columnSetting};

    this.source.load(this.data);

    /* this.source.onChanged().subscribe(change => {
      this.sourceOnChanged.emit(change);
    }); */
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(this.isRefresh) { 
        this.source.load(this.data);
        this.source.refresh();
      }
  }

  /* onDeleteConfirm(event): void {
    this.deleteConfirm.emit(event);
  }

  onCreateConfirm(event){
    this.createConfirm.emit(event);
  }

  onEditConfirm(event){
    this.editConfirm.emit(event);
  } */
}
