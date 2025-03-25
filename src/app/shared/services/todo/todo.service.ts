import { Todo } from '../../models/Todo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  getTodo(id: number) {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);
  }

  getTodos() {
    return this.http.get<Todo[]>(this.apiUrl);
  }
}
