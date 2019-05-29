import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToDo } from '../interface/todo';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private serverUrl = 'http://localhost:3000';

  constructor(private _http: HttpClient) {

  }

   // GET
   public getToDos(): Observable<ToDo[]> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.get<ToDo[]>(`${this.serverUrl}/toDos`, httpOptions);
  }

  // POST
  public postToDo(toDoObject: ToDo): Observable<ToDo> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.post<ToDo>(`${this.serverUrl}/toDos`,toDoObject, httpOptions);
  }

  // DELETE
  public deleteToDo(toDoObject: ToDo): Observable<ToDo> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.delete<ToDo>(`${this.serverUrl}/toDos/${toDoObject.id}`, httpOptions);
  }

  // PUT
  public updateToDo(toDoObject: ToDo): Observable<ToDo> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.put<ToDo>(`${this.serverUrl}/toDos/${toDoObject.id}`, toDoObject, httpOptions);
  }
}