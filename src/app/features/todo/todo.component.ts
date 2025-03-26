import { Todo } from '../../shared/models/Todo';
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../shared/services/todo/todo.service';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-todo',
  imports: [MatProgressSpinnerModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  todo: Todo | undefined;
  isLoading: boolean = true;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];

      this.todoService.getTodo(id).subscribe({
        next: (todo) => {
          console.log(todo);
          this.todo = todo;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching todo:', err);
          this.isLoading = false;
        },
      });
    });
  }
}
