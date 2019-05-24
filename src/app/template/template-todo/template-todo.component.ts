import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToDo } from '../../interface/todo';
import { EventPing } from '../../interface/eventping';

@Component({
  selector: 'app-template-todo',
  templateUrl: './template-todo.component.html',
  styleUrls: ['./template-todo.component.sass']
})
export class TemplateTodoComponent implements OnInit {

  @Input() toDo: ToDo;
  @Output() ping: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  public changeCheck(event?: any): void {

    this.toDo.status = !this.toDo.status;

    const eventObject: EventPing = {
      label: 'check',
      object: this.toDo
    };
    this.ping.emit(eventObject);
  }

  public changeLabel(value: string): void {

    this.toDo.label = value;
  }

  public deleteToDo(event?: any): void {
   
    const eventObject: EventPing = {
      label: 'delete',
      object: this.toDo
    };
    this.ping.emit(eventObject);
  }

}
