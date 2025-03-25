import { Todo } from '../../shared/models/Todo';
import { TodoService } from '../../shared/services/todo/todo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todos',
  imports: [],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  isLoading: boolean = true;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    console.log('eiei on init.');
    this.todoService.getTodos().subscribe({
      next: (value) => {
        console.log('value', value);
        this.todos = value;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching todos:', err);
        this.isLoading = false;
      },
    });
  }
}
