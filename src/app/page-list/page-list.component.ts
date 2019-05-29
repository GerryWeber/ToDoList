import { Component, OnInit } from '@angular/core';
import { ToDo } from '../interface/todo';
import { EventPing } from '../interface/eventping';
import { DataService } from '../service/data.service';
import { Subscription } from 'rxjs';

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

  constructor(public _dataService: DataService) { 

    this.toDoShow = true;
    this.toDoDoneShow = false;
    this.toDos = [];
    this.toDosDone = [];
    this.loadData();
  }

  ngOnInit() {
  }

  public loadData(): void {

    this._dataService.getToDos().subscribe((data: ToDo[]) => { 
      data.forEach((toDo: ToDo) => {
        if(toDo.status === true){
          this.toDosDone.push(toDo);
        } else {
          this.toDos.push(toDo);
        }
      });

    }, error => {
      console.log(`%cERROR: ${error.message}`, `color: red;`);
    });
  }

  public createToDo(event: ToDo): void {

    event.position = this.toDos.length + 1;

    this._dataService.postToDo(event).subscribe((data: ToDo) => {
      console.log(`%cSUCCESS: "${data.label}" wurde erfolgreich erstellt.`, `color: red; font-size: 12px;`);
      //this.toDos.push(data);
      this.loadData();
      
    }, error => {
        console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
    });
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
      this.loadData();
      //if(event.object.status){
      //  this.toDosDone.splice(this.toDosDone.indexOf(event.object), 1);    
      //}
      //else {
      //  this.toDos.splice(this.toDos.indexOf(event.object), 1);
      //}
    }
  }
}