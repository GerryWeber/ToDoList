import { Component, OnInit } from '@angular/core';
import { ToDo } from '../interface/todo';
import { EventPing } from '../interface/eventping';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.sass']
})
export class PageListComponent implements OnInit {

  public toDoShow: boolean;
  public toDoDoneShow: boolean;
  public toDos: ToDo[];
  public toDosDone: ToDo[];

  constructor() { 

    this.toDoShow = true;
    this.toDoDoneShow = false;
    this.toDos = [];
    this.toDosDone = [];
  }

  ngOnInit() {
  }

  public createToDo(event: ToDo): void {

    event.position = this.toDos.length + 1;
    this.toDos.push(event);
  }

  public updateToDos(event: EventPing): void {

    if('check' === event.label){
      console.log(`%c"${event.label}-Event" wurde getriggert. `, `color: green;`);

      if(!event.object.status){
        this.toDosDone.splice(this.toDosDone.indexOf(event.object), 1);
        this.toDos.push(event.object);        
      }
      else {
        this.toDos.splice(this.toDos.indexOf(event.object), 1);
        this.toDosDone.push(event.object);  
      }
    }
    if('delete' === event.label){
      console.log(`%c"${event.label}-Event" wurde getriggert. `, `color: green;`);

      if(event.object.status){
        this.toDosDone.splice(this.toDosDone.indexOf(event.object), 1);    
      }
      else {
        this.toDos.splice(this.toDos.indexOf(event.object), 1);
      }
    }
  }
}