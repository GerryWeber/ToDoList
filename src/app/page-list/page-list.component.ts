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
    this.toDos = [
      {
        id: 0,
        label: 'test',
        status: false,
        position: 1
      },
      {
        id: 1,
        label: 'Angular lernen',
        status: false,
        position: 2
      }
    ];
  }

  ngOnInit() {
  }

  public updateToDos(event: EventPing): void {

    console.log(event);
  }
}