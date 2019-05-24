import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToDo } from '../../interface/todo';
import { EventPing } from '../../interface/eventping';

@Component({
  selector: 'app-template-todo-form',
  templateUrl: './template-todo-form.component.html',
  styleUrls: ['./template-todo-form.component.sass']
})
export class TemplateTodoFormComponent implements OnInit {

  public toDo: ToDo;
  @Output() ping: EventEmitter<ToDo> = new EventEmitter<ToDo>();

  constructor() {

    this.toDo = {
      id: undefined,
      label: undefined,
      status: false,
      position: undefined
    };
  }

  ngOnInit() {
  }

  public createToDo(event?: any): void {

    this.ping.emit(this.toDo);
  }

}
