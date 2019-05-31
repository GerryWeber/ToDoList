import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToDo } from '../interface/todo';
import { EventPing } from '../interface/eventping';
import { DataService } from '../service/data.service';
import { Subscription } from 'rxjs';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.sass']
})

export class PageListComponent implements OnInit, OnDestroy {

  public toDoShow: boolean;
  public toDoDoneShow: boolean;
  public toDos: ToDo[];
  public toDosDone: ToDo[];
  public subs = new Subscription();

  constructor(public _dataService: DataService, private _dragulaService: DragulaService) { 

    this.toDoShow = true;
    this.toDoDoneShow = false;
    this.toDos = [];
    this.toDosDone = [];
    this.loadData();

    this._dragulaService.createGroup('todos', {
      removeOnSpill: false
    });

    this.subs.add(_dragulaService.drop('todos')
      .subscribe(({ el }) => {
        this.position();
      })
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public position(): void {

    let position = 0;
    this.toDos.forEach((toDoItem: ToDo) => {
        position += 1;
        toDoItem.position = position;
/*         this._dataService.updateToDo(toDoItem).subscribe((data: ToDo) => {
          console.log(`%cSUCCESS: ${data.label} wurde neu positioniert.`, `color: green; font-size: 12px;`);
        }, error => {
            console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
        }); */
    });
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
      this.toDos.sort((obj1, obj2) => {
        return obj1.position - obj2.position;
      });
    }, error => {
      console.log(`%cERROR: ${error.message}`, `color: red;`);
    });
  }

  public createToDo(event: ToDo): void {

    event.position = this.toDos.length + 1;

    this._dataService.postToDo(event).subscribe((data: ToDo) => {
      console.log(`%cSUCCESS: "${data.label}" wurde erfolgreich erstellt.`, `color: red; font-size: 12px;`);
      this.toDos.push(data);
      
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
      
      if(event.object.status){
        this.toDosDone.splice(this.toDosDone.indexOf(event.object), 1);    
      }
      else {
        this.toDos.splice(this.toDos.indexOf(event.object), 1);
      }
    }
  }
}